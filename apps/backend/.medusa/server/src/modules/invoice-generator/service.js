"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const invoice_config_1 = require("./models/invoice-config");
const invoice_1 = require("./models/invoice");
const pdfmake_1 = __importDefault(require("pdfmake"));
const axios_1 = __importDefault(require("axios"));
const fonts = {
    Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
    },
};
pdfmake_1.default.addFonts(fonts);
class InvoiceGeneratorService extends (0, utils_1.MedusaService)({
    InvoiceConfig: invoice_config_1.InvoiceConfig,
    Invoice: invoice_1.Invoice,
}) {
    async formatAmount(amount, currency) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
        }).format(amount);
    }
    async imageUrlToBase64(url) {
        const response = await axios_1.default.get(url, { responseType: "arraybuffer" });
        const base64 = Buffer.from(response.data).toString("base64");
        const mimeType = response.headers["content-type"] || "image/png";
        return `data:${mimeType};base64,${base64}`;
    }
    async createInvoiceContent(params, invoice) {
        // Get invoice configuration
        const invoiceConfigs = await this.listInvoiceConfigs();
        const config = invoiceConfigs[0] || {};
        // Create table for order items
        const itemsTable = [
            [
                { text: "Item", style: "tableHeader" },
                { text: "Quantity", style: "tableHeader" },
                { text: "Unit Price", style: "tableHeader" },
                { text: "Total", style: "tableHeader" },
            ],
            ...(await Promise.all(params.items.map(async (item) => [
                { text: item.title || "Unknown Item", style: "tableRow" },
                { text: item.quantity.toString(), style: "tableRow" },
                {
                    text: await this.formatAmount(item.unit_price, params.order.currency_code),
                    style: "tableRow",
                },
                {
                    text: await this.formatAmount(Number(item.total), params.order.currency_code),
                    style: "tableRow",
                },
            ]))),
        ];
        const invoiceId = `INV-${invoice.display_id.toString().padStart(6, "0")}`;
        const invoiceDate = new Date(invoice.created_at).toLocaleDateString();
        // return the PDF content structure
        return {
            pageSize: "A4",
            pageMargins: [40, 60, 40, 60],
            header: {
                margin: [40, 20, 40, 0],
                columns: [
                    /** Company Logo */
                    {
                        width: "*",
                        stack: [
                            ...(config.company_logo
                                ? [
                                    {
                                        image: await this.imageUrlToBase64(config.company_logo),
                                        width: 80,
                                        height: 40,
                                        fit: [80, 40],
                                        margin: [0, 0, 0, 10],
                                    },
                                ]
                                : []),
                            {
                                text: config.company_name || "Your Company Name",
                                style: "companyName",
                                margin: [0, 0, 0, 0],
                            },
                        ],
                    },
                    /** Invoice Title */
                    {
                        width: "auto",
                        stack: [
                            {
                                text: "INVOICE",
                                style: "invoiceTitle",
                                alignment: "right",
                                margin: [0, 0, 0, 0],
                            },
                        ],
                    },
                ],
            },
            content: [
                {
                    margin: [0, 20, 0, 0],
                    columns: [
                        /** Company Details */
                        {
                            width: "*",
                            stack: [
                                {
                                    text: "COMPANY DETAILS",
                                    style: "sectionHeader",
                                    margin: [0, 0, 0, 8],
                                },
                                config.company_address && {
                                    text: config.company_address,
                                    style: "companyAddress",
                                    margin: [0, 0, 0, 4],
                                },
                                config.company_phone && {
                                    text: config.company_phone,
                                    style: "companyContact",
                                    margin: [0, 0, 0, 4],
                                },
                                config.company_email && {
                                    text: config.company_email,
                                    style: "companyContact",
                                    margin: [0, 0, 0, 0],
                                },
                            ],
                        },
                        /** Invoice Details */
                        {
                            width: "auto",
                            table: {
                                widths: [80, 120],
                                body: [
                                    [
                                        { text: "Invoice ID:", style: "label" },
                                        { text: invoiceId, style: "value" },
                                    ],
                                    [
                                        { text: "Invoice Date:", style: "label" },
                                        { text: invoiceDate, style: "value" },
                                    ],
                                    [
                                        { text: "Order ID:", style: "label" },
                                        {
                                            text: params.order.display_id.toString().padStart(6, "0"),
                                            style: "value",
                                        },
                                    ],
                                    [
                                        { text: "Order Date:", style: "label" },
                                        {
                                            text: new Date(params.order.created_at).toLocaleDateString(),
                                            style: "value",
                                        },
                                    ],
                                ],
                            },
                            layout: "noBorders",
                            margin: [0, 0, 0, 20],
                        },
                    ],
                },
                {
                    text: "\n",
                },
                /** Billing and Shipping Addresses */
                {
                    columns: [
                        {
                            width: "*",
                            stack: [
                                {
                                    text: "BILL TO",
                                    style: "sectionHeader",
                                    margin: [0, 0, 0, 8],
                                },
                                {
                                    text: params.order.billing_address
                                        ? `${params.order.billing_address.first_name || ""} ${params.order.billing_address.last_name || ""}
                    ${params.order.billing_address.address_1 || ""}${params.order.billing_address.address_2 ? `\n${params.order.billing_address.address_2}` : ""}
                    ${params.order.billing_address.city || ""}, ${params.order.billing_address.province || ""} ${params.order.billing_address.postal_code || ""}
                    ${params.order.billing_address.country_code || ""}${params.order.billing_address.phone ? `\n${params.order.billing_address.phone}` : ""}`
                                        : "No billing address provided",
                                    style: "addressText",
                                },
                            ],
                        },
                        {
                            width: "*",
                            stack: [
                                {
                                    text: "SHIP TO",
                                    style: "sectionHeader",
                                    margin: [0, 0, 0, 8],
                                },
                                {
                                    text: params.order.shipping_address
                                        ? `${params.order.shipping_address.first_name || ""} ${params.order.shipping_address.last_name || ""}
                    ${params.order.shipping_address.address_1 || ""} ${params.order.shipping_address.address_2 ? `\n${params.order.shipping_address.address_2}` : ""}
                    ${params.order.shipping_address.city || ""}, ${params.order.shipping_address.province || ""} ${params.order.shipping_address.postal_code || ""}
                    ${params.order.shipping_address.country_code || ""}${params.order.shipping_address.phone ? `\n${params.order.shipping_address.phone}` : ""}`
                                        : "No shipping address provided",
                                    style: "addressText",
                                },
                            ],
                        },
                    ],
                },
                {
                    text: "\n\n",
                },
                /** Items Table */
                {
                    table: {
                        headerRows: 1,
                        widths: ["*", "auto", "auto", "auto"],
                        body: itemsTable,
                    },
                    layout: {
                        fillColor: function (rowIndex) {
                            return rowIndex === 0 ? "#f8f9fa" : null;
                        },
                        hLineWidth: function (i, node) {
                            return i === 0 || i === node.table.body.length ? 0.8 : 0.3;
                        },
                        vLineWidth: function (i, node) {
                            return 0.3;
                        },
                        hLineColor: function (i, node) {
                            return i === 0 || i === node.table.body.length
                                ? "#cbd5e0"
                                : "#e2e8f0";
                        },
                        vLineColor: function () {
                            return "#e2e8f0";
                        },
                        paddingLeft: function () {
                            return 8;
                        },
                        paddingRight: function () {
                            return 8;
                        },
                        paddingTop: function () {
                            return 6;
                        },
                        paddingBottom: function () {
                            return 6;
                        },
                    },
                },
                {
                    text: "\n",
                },
                /** Totals Section */
                {
                    columns: [
                        { width: "*", text: "" },
                        {
                            width: "auto",
                            table: {
                                widths: ["auto", "auto"],
                                body: [
                                    [
                                        { text: "Subtotal:", style: "totalLabel" },
                                        {
                                            text: await this.formatAmount(Number(params.order.subtotal), params.order.currency_code),
                                            style: "totalValue",
                                        },
                                    ],
                                    [
                                        { text: "Tax:", style: "totalLabel" },
                                        {
                                            text: await this.formatAmount(Number(params.order.tax_total), params.order.currency_code),
                                            style: "totalValue",
                                        },
                                    ],
                                    [
                                        { text: "Shipping:", style: "totalLabel" },
                                        {
                                            text: await this.formatAmount(Number(params.order.shipping_methods?.[0]?.total || 0), params.order.currency_code),
                                            style: "totalValue",
                                        },
                                    ],
                                    [
                                        { text: "Discount:", style: "totalLabel" },
                                        {
                                            text: await this.formatAmount(Number(params.order.discount_total), params.order.currency_code),
                                            style: "totalValue",
                                        },
                                    ],
                                    [
                                        { text: "Total:", style: "totalLabel" },
                                        {
                                            text: await this.formatAmount(Number(params.order.total), params.order.currency_code),
                                            style: "totalValue",
                                        },
                                    ],
                                ],
                            },
                            layout: {
                                fillColor: function (rowIndex) {
                                    return rowIndex === 3 ? "#f8f9fa" : null;
                                },
                                hLineWidth: function (i, node) {
                                    return i === 0 || i === node.table.body.length ? 0.8 : 0.3;
                                },
                                vLineWidth: function () {
                                    return 0.3;
                                },
                                hLineColor: function (i, node) {
                                    return i === 0 || i === node.table.body.length
                                        ? "#cbd5e0"
                                        : "#e2e8f0";
                                },
                                vLineColor: function () {
                                    return "#e2e8f0";
                                },
                                paddingLeft: function () {
                                    return 8;
                                },
                                paddingRight: function () {
                                    return 8;
                                },
                                paddingTop: function () {
                                    return 6;
                                },
                                paddingBottom: function () {
                                    return 6;
                                },
                            },
                        },
                    ],
                },
                {
                    text: "\n\n",
                },
                /** Notes Section */
                ...(config.notes
                    ? [
                        {
                            text: "Notes",
                            style: "sectionHeader",
                            margin: [0, 20, 0, 10],
                        },
                        {
                            text: config.notes,
                            style: "notesText",
                            margin: [0, 0, 0, 20],
                        },
                    ]
                    : []),
                {
                    text: "Thank you for your business!",
                    style: "thankYouText",
                    alignment: "center",
                    margin: [0, 30, 0, 0],
                },
            ],
            styles: {
                companyName: {
                    fontSize: 22,
                    bold: true,
                    color: "#1a365d",
                    margin: [0, 0, 0, 5],
                },
                companyAddress: {
                    fontSize: 11,
                    color: "#4a5568",
                    lineHeight: 1.3,
                },
                companyContact: {
                    fontSize: 10,
                    color: "#4a5568",
                },
                invoiceTitle: {
                    fontSize: 24,
                    bold: true,
                    color: "#2c3e50",
                },
                label: {
                    fontSize: 10,
                    color: "#6c757d",
                    margin: [0, 0, 8, 0],
                },
                value: {
                    fontSize: 10,
                    bold: true,
                    color: "#2c3e50",
                },
                sectionHeader: {
                    fontSize: 12,
                    bold: true,
                    color: "#2c3e50",
                    backgroundColor: "#f8f9fa",
                    padding: [8, 12],
                },
                addressText: {
                    fontSize: 10,
                    color: "#495057",
                    lineHeight: 1.3,
                },
                tableHeader: {
                    fontSize: 10,
                    bold: true,
                    color: "#ffffff",
                    fillColor: "#495057",
                },
                tableRow: {
                    fontSize: 9,
                    color: "#495057",
                },
                totalLabel: {
                    fontSize: 10,
                    bold: true,
                    color: "#495057",
                },
                totalValue: {
                    fontSize: 10,
                    bold: true,
                    color: "#2c3e50",
                },
                notesText: {
                    fontSize: 10,
                    color: "#6c757d",
                    italics: true,
                    lineHeight: 1.4,
                },
                thankYouText: {
                    fontSize: 12,
                    color: "#28a745",
                    italics: true,
                },
            },
            defaultStyle: {
                font: "Helvetica",
            },
        };
    }
    async generatePdf(params) {
        const invoice = await this.retrieveInvoice(params.invoice_id);
        // Generate new content
        const pdfContent = Object.keys(invoice.pdfContent).length
            ? invoice.pdfContent
            : await this.createInvoiceContent(params, invoice);
        await this.updateInvoices({
            id: invoice.id,
            pdfContent,
        });
        // get PDF as a Buffer
        return new Promise((resolve, reject) => {
            const chunks = [];
            pdfmake_1.default
                .createPdf(pdfContent)
                .getBuffer()
                .then((buffer) => {
                resolve(Buffer.from(buffer));
            })
                .catch(reject);
            // const pdfDoc = printer.createPdfKitDocument(pdfContent as any)
            // pdfDoc.on("data", (chunk) => chunks.push(chunk))
            // pdfDoc.on("end", () => {
            //   const result = Buffer.concat(chunks)
            //   resolve(result)
            // })
            // pdfDoc.on("error", (err) => reject(err))
            // pdfDoc.end() // Finalize PDF stream
        });
    }
}
exports.default = InvoiceGeneratorService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2ludm9pY2UtZ2VuZXJhdG9yL3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxREFBMEQ7QUFDMUQsNERBQXdEO0FBQ3hELDhDQUEwRDtBQUMxRCxzREFBOEI7QUFNOUIsa0RBQTBCO0FBRTFCLE1BQU0sS0FBSyxHQUFHO0lBQ1osU0FBUyxFQUFFO1FBQ1QsTUFBTSxFQUFFLFdBQVc7UUFDbkIsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLFdBQVcsRUFBRSx1QkFBdUI7S0FDckM7Q0FDRixDQUFDO0FBRUYsaUJBQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFPeEIsTUFBTSx1QkFBd0IsU0FBUSxJQUFBLHFCQUFhLEVBQUM7SUFDbEQsYUFBYSxFQUFiLDhCQUFhO0lBQ2IsT0FBTyxFQUFQLGlCQUFPO0NBQ1IsQ0FBQztJQUNRLEtBQUssQ0FBQyxZQUFZLENBQ3hCLE1BQWMsRUFDZCxRQUFnQjtRQUVoQixPQUFPLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7WUFDcEMsS0FBSyxFQUFFLFVBQVU7WUFDakIsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRU8sS0FBSyxDQUFDLGdCQUFnQixDQUFDLEdBQVc7UUFDeEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3RCxNQUFNLFFBQVEsR0FB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
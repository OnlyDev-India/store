"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderInvoiceStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const invoice_generator_1 = require("../../modules/invoice-generator");
const invoice_1 = require("../../modules/invoice-generator/models/invoice");
exports.getOrderInvoiceStep = (0, workflows_sdk_1.createStep)("get-order-invoice", async ({ order_id }, { container }) => {
    const invoiceGeneratorService = container.resolve(invoice_generator_1.INVOICE_MODULE);
    let [invoice] = await invoiceGeneratorService.listInvoices({
        order_id,
        status: invoice_1.InvoiceStatus.LATEST,
    });
    let createdInvoice = false;
    if (!invoice) {
        // Store new invoice in database
        invoice = await invoiceGeneratorService.createInvoices({
            order_id,
            status: invoice_1.InvoiceStatus.LATEST,
            pdfContent: {},
        });
        createdInvoice = true;
    }
    return new workflows_sdk_1.StepResponse(invoice, {
        created_invoice: createdInvoice,
        invoice_id: invoice.id,
    });
}, async (data, { container }) => {
    const { created_invoice, invoice_id } = data || {};
    if (!created_invoice || !invoice_id) {
        return;
    }
    const invoiceGeneratorService = container.resolve(invoice_generator_1.INVOICE_MODULE);
    invoiceGeneratorService.deleteInvoices(invoice_id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW9yZGVyLWludm9pY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3N0ZXBzL2dldC1vcmRlci1pbnZvaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUM1RSx1RUFBZ0U7QUFDaEUsNEVBQThFO0FBTWpFLFFBQUEsbUJBQW1CLEdBQUcsSUFBQSwwQkFBVSxFQUMzQyxtQkFBbUIsRUFDbkIsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQy9DLE1BQU0sdUJBQXVCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxrQ0FBYyxDQUFDLENBQUE7SUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sdUJBQXVCLENBQUMsWUFBWSxDQUFDO1FBQ3pELFFBQVE7UUFDUixNQUFNLEVBQUUsdUJBQWEsQ0FBQyxNQUFNO0tBQzdCLENBQUMsQ0FBQTtJQUNGLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQTtJQUUxQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDYixnQ0FBZ0M7UUFDaEMsT0FBTyxHQUFHLE1BQU0sdUJBQXVCLENBQUMsY0FBYyxDQUFDO1lBQ3JELFFBQVE7WUFDUixNQUFNLEVBQUUsdUJBQWEsQ0FBQyxNQUFNO1lBQzVCLFVBQVUsRUFBRSxFQUFFO1NBQ2YsQ0FBQyxDQUFBO1FBQ0YsY0FBYyxHQUFHLElBQUksQ0FBQTtJQUN2QixDQUFDO0lBRUQsT0FBTyxJQUFJLDRCQUFZLENBQUMsT0FBTyxFQUFFO1FBQy9CLGVBQWUsRUFBRSxjQUFjO1FBQy9CLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRTtLQUN2QixDQUFDLENBQUE7QUFDSixDQUFDLEVBQ0QsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDNUIsTUFBTSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0lBQ2xELElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQyxPQUFNO0lBQ1IsQ0FBQztJQUNELE1BQU0sdUJBQXVCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxrQ0FBYyxDQUFDLENBQUE7SUFFakUsdUJBQXVCLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ3BELENBQUMsQ0FDRixDQUFBIn0=
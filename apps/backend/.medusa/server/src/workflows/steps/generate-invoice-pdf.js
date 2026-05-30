"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoicePdfStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const invoice_generator_1 = require("../../modules/invoice-generator");
exports.generateInvoicePdfStep = (0, workflows_sdk_1.createStep)("generate-invoice-pdf", async (input, { container }) => {
    const invoiceGeneratorService = container.resolve(invoice_generator_1.INVOICE_MODULE);
    const previousInv = await invoiceGeneratorService.retrieveInvoice(input.invoice_id);
    const pdfBuffer = await invoiceGeneratorService.generatePdf({
        order: input.order,
        items: input.items,
        invoice_id: input.invoice_id,
    });
    return new workflows_sdk_1.StepResponse({
        pdf_buffer: pdfBuffer,
    }, previousInv);
}, async (previousInv, { container }) => {
    if (!previousInv) {
        return;
    }
    const invoiceGeneratorService = container.resolve(invoice_generator_1.INVOICE_MODULE);
    await invoiceGeneratorService.updateInvoices({
        id: previousInv.id,
        pdfContent: previousInv.pdfContent,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtaW52b2ljZS1wZGYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3N0ZXBzL2dlbmVyYXRlLWludm9pY2UtcGRmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUE0RTtBQUM1RSx1RUFBZ0U7QUFTbkQsUUFBQSxzQkFBc0IsR0FBRyxJQUFBLDBCQUFVLEVBQzlDLHNCQUFzQixFQUN0QixLQUFLLEVBQUUsS0FBa0MsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDMUQsTUFBTSx1QkFBdUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGtDQUFjLENBQUMsQ0FBQTtJQUVqRSxNQUFNLFdBQVcsR0FBRyxNQUFNLHVCQUF1QixDQUFDLGVBQWUsQ0FDL0QsS0FBSyxDQUFDLFVBQVUsQ0FDakIsQ0FBQTtJQUVELE1BQU0sU0FBUyxHQUFHLE1BQU0sdUJBQXVCLENBQUMsV0FBVyxDQUFDO1FBQzFELEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztRQUNsQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7UUFDbEIsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO0tBQzdCLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSw0QkFBWSxDQUFDO1FBQ3RCLFVBQVUsRUFBRSxTQUFTO0tBQ3RCLEVBQUUsV0FBVyxDQUFDLENBQUE7QUFDakIsQ0FBQyxFQUNELEtBQUssRUFBRSxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ25DLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQixPQUFNO0lBQ1IsQ0FBQztJQUVELE1BQU0sdUJBQXVCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxrQ0FBYyxDQUFDLENBQUE7SUFFakUsTUFBTSx1QkFBdUIsQ0FBQyxjQUFjLENBQUM7UUFDM0MsRUFBRSxFQUFFLFdBQVcsQ0FBQyxFQUFFO1FBQ2xCLFVBQVUsRUFBRSxXQUFXLENBQUMsVUFBVTtLQUNuQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQ0YsQ0FBQSJ9
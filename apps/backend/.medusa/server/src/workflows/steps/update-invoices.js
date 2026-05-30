"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvoicesStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const invoice_generator_1 = require("../../modules/invoice-generator");
exports.updateInvoicesStep = (0, workflows_sdk_1.createStep)("update-invoices", async ({ selector, data }, { container }) => {
    const invoiceGeneratorService = container.resolve(invoice_generator_1.INVOICE_MODULE);
    const prevData = await invoiceGeneratorService.listInvoices(selector);
    const updatedInvoices = await invoiceGeneratorService.updateInvoices({
        selector,
        data,
    });
    return new workflows_sdk_1.StepResponse(updatedInvoices, prevData);
}, async (prevData, { container }) => {
    if (!prevData) {
        return;
    }
    const invoiceGeneratorService = container.resolve(invoice_generator_1.INVOICE_MODULE);
    await invoiceGeneratorService.updateInvoices(prevData.map((i) => ({
        id: i.id,
        status: i.status,
    })));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWludm9pY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zdGVwcy91cGRhdGUtaW52b2ljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBRTVFLHVFQUFnRTtBQVduRCxRQUFBLGtCQUFrQixHQUFHLElBQUEsMEJBQVUsRUFDMUMsaUJBQWlCLEVBQ2pCLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQWEsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDckQsTUFBTSx1QkFBdUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGtDQUFjLENBQUMsQ0FBQTtJQUVqRSxNQUFNLFFBQVEsR0FBRyxNQUFNLHVCQUF1QixDQUFDLFlBQVksQ0FDekQsUUFBUSxDQUNULENBQUE7SUFFRCxNQUFNLGVBQWUsR0FBRyxNQUFNLHVCQUF1QixDQUFDLGNBQWMsQ0FBQztRQUNuRSxRQUFRO1FBQ1IsSUFBSTtLQUNMLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSw0QkFBWSxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUNwRCxDQUFDLEVBQ0QsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDaEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2QsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLHVCQUF1QixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsa0NBQWMsQ0FBQyxDQUFBO0lBRWpFLE1BQU0sdUJBQXVCLENBQUMsY0FBYyxDQUMxQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtRQUNSLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTTtLQUNqQixDQUFDLENBQUMsQ0FDSixDQUFBO0FBQ0gsQ0FBQyxDQUNGLENBQUEifQ==
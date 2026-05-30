"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvoiceConfigStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const invoice_generator_1 = require("../../modules/invoice-generator");
exports.updateInvoiceConfigStep = (0, workflows_sdk_1.createStep)("update-invoice-config", async ({ id, ...updateData }, { container }) => {
    const invoiceGeneratorService = container.resolve(invoice_generator_1.INVOICE_MODULE);
    const prevData = id ?
        await invoiceGeneratorService.retrieveInvoiceConfig(id) :
        (await invoiceGeneratorService.listInvoiceConfigs())[0];
    const updatedData = await invoiceGeneratorService.updateInvoiceConfigs({
        id: prevData.id,
        ...updateData,
    });
    return new workflows_sdk_1.StepResponse(updatedData, prevData);
}, async (prevInvoiceConfig, { container }) => {
    if (!prevInvoiceConfig) {
        return;
    }
    const invoiceGeneratorService = container.resolve(invoice_generator_1.INVOICE_MODULE);
    await invoiceGeneratorService.updateInvoiceConfigs({
        id: prevInvoiceConfig.id,
        company_name: prevInvoiceConfig.company_name,
        company_address: prevInvoiceConfig.company_address,
        company_phone: prevInvoiceConfig.company_phone,
        company_email: prevInvoiceConfig.company_email,
        company_logo: prevInvoiceConfig.company_logo,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWludm9pY2UtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zdGVwcy91cGRhdGUtaW52b2ljZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTRFO0FBQzVFLHVFQUFnRTtBQVluRCxRQUFBLHVCQUF1QixHQUFHLElBQUEsMEJBQVUsRUFDL0MsdUJBQXVCLEVBQ3ZCLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLFVBQVUsRUFBYSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUN4RCxNQUFNLHVCQUF1QixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsa0NBQWMsQ0FBQyxDQUFBO0lBRWpFLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sdUJBQXVCLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDLE1BQU0sdUJBQXVCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRXpELE1BQU0sV0FBVyxHQUFHLE1BQU0sdUJBQXVCLENBQUMsb0JBQW9CLENBQUM7UUFDckUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1FBQ2YsR0FBRyxVQUFVO0tBQ2QsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLDRCQUFZLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0FBQ2hELENBQUMsRUFDRCxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZCLE9BQU07SUFDUixDQUFDO0lBRUQsTUFBTSx1QkFBdUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGtDQUFjLENBQUMsQ0FBQTtJQUVqRSxNQUFNLHVCQUF1QixDQUFDLG9CQUFvQixDQUFDO1FBQ2pELEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFO1FBQ3hCLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxZQUFZO1FBQzVDLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQyxlQUFlO1FBQ2xELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxhQUFhO1FBQzlDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxhQUFhO1FBQzlDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxZQUFZO0tBQzdDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBIn0=
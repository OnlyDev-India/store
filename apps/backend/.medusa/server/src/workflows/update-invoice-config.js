"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvoiceConfigWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const update_invoice_config_1 = require("./steps/update-invoice-config");
exports.updateInvoiceConfigWorkflow = (0, workflows_sdk_1.createWorkflow)("update-invoice-config", (input) => {
    const invoiceConfig = (0, update_invoice_config_1.updateInvoiceConfigStep)(input);
    return new workflows_sdk_1.WorkflowResponse({
        invoice_config: invoiceConfig,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWludm9pY2UtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy91cGRhdGUtaW52b2ljZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQW9GO0FBQ3BGLHlFQUF1RTtBQVkxRCxRQUFBLDJCQUEyQixHQUFHLElBQUEsOEJBQWMsRUFDdkQsdUJBQXVCLEVBQ3ZCLENBQUMsS0FBb0IsRUFBRSxFQUFFO0lBQ3ZCLE1BQU0sYUFBYSxHQUFHLElBQUEsK0NBQXVCLEVBQUMsS0FBSyxDQUFDLENBQUE7SUFFcEQsT0FBTyxJQUFJLGdDQUFnQixDQUFDO1FBQzFCLGNBQWMsRUFBRSxhQUFhO0tBQzlCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBIn0=
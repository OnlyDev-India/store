"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markInvoicesStaleWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const update_invoices_1 = require("./steps/update-invoices");
const invoice_1 = require("../modules/invoice-generator/models/invoice");
exports.markInvoicesStaleWorkflow = (0, workflows_sdk_1.createWorkflow)("mark-invoices-stale", (input) => {
    const updatedInvoices = (0, update_invoices_1.updateInvoicesStep)({
        selector: {
            order_id: input.order_id,
        },
        data: {
            status: invoice_1.InvoiceStatus.STALE,
        },
    });
    return new workflows_sdk_1.WorkflowResponse({
        invoices: updatedInvoices,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyay1pbnZvaWNlcy1zdGFsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvbWFyay1pbnZvaWNlcy1zdGFsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBb0Y7QUFFcEYsNkRBQTREO0FBQzVELHlFQUEyRTtBQU05RCxRQUFBLHlCQUF5QixHQUFHLElBQUEsOEJBQWMsRUFDckQscUJBQXFCLEVBQ3JCLENBQUMsS0FBb0IsRUFBRSxFQUFFO0lBQ3ZCLE1BQU0sZUFBZSxHQUFHLElBQUEsb0NBQWtCLEVBQUM7UUFDekMsUUFBUSxFQUFFO1lBQ1IsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1NBQ3pCO1FBQ0QsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLHVCQUFhLENBQUMsS0FBSztTQUM1QjtLQUNGLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQztRQUMxQixRQUFRLEVBQUUsZUFBZTtLQUMxQixDQUFDLENBQUE7QUFDSixDQUFDLENBQ0YsQ0FBQSJ9
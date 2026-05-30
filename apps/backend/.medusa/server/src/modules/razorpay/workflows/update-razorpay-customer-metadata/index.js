"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRazorpayCustomerMetadataWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const update_customer_1 = require("./steps/update-customer");
exports.updateRazorpayCustomerMetadataWorkflow = (0, workflows_sdk_1.createWorkflow)("update-razorpay-customer-metadata", (input) => {
    const { customer, registerResponse } = (0, update_customer_1.updateCustomerMetadataStep)(input);
    return new workflows_sdk_1.WorkflowResponse({
        customer,
        registerResponse
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yYXpvcnBheS93b3JrZmxvd3MvdXBkYXRlLXJhem9ycGF5LWN1c3RvbWVyLW1ldGFkYXRhL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUcyQztBQUUzQyw2REFBcUU7QUFNeEQsUUFBQSxzQ0FBc0MsR0FBRyxJQUFBLDhCQUFjLEVBQ2hFLG1DQUFtQyxFQUNuQyxDQUFDLEtBQTBDLEVBQUUsRUFBRTtJQUMzQyxNQUFNLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEdBQ2hDLElBQUEsNENBQTBCLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFFdEMsT0FBTyxJQUFJLGdDQUFnQixDQUFDO1FBQ3hCLFFBQVE7UUFDUixnQkFBZ0I7S0FDbkIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUNKLENBQUMifQ==
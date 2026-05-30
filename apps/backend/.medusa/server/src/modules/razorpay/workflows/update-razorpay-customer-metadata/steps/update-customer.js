"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerMetadataStep = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
exports.updateCustomerMetadataStep = (0, workflows_sdk_1.createStep)("create-customer-step", async (input, { container }) => {
    const customerService = container.resolve(utils_1.Modules.CUSTOMER);
    // 1. create customer
    const customer = await customerService.retrieveCustomer(input.medusa_customer_id);
    // 2. create auth identity
    const { medusa_customer_id, ...rest } = input;
    const { razorpay } = rest;
    const registerResponse = await customerService.updateCustomers(medusa_customer_id, {
        metadata: {
            ...customer.metadata,
            razorpay: {
                ...razorpay
            }
        }
    });
    // 4. do we want to authenticate immediately?
    //
    // const authenticationResponse = await authService.authenticate("emailpass", {
    //   body: {
    //     email: input.email,
    //     password: input.password,
    //   },
    // } as AuthenticationInput);
    return new workflows_sdk_1.StepResponse({ customer: customer, registerResponse }, customer.id);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWN1c3RvbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcmF6b3JwYXkvd29ya2Zsb3dzL3VwZGF0ZS1yYXpvcnBheS1jdXN0b21lci1tZXRhZGF0YS9zdGVwcy91cGRhdGUtY3VzdG9tZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQTZFO0FBRTdFLHFEQUFvRDtBQUd2QyxRQUFBLDBCQUEwQixHQUFHLElBQUEsMEJBQVUsRUFDaEQsc0JBQXNCLEVBQ3RCLEtBQUssRUFBRSxLQUEwQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNoRSxNQUFNLGVBQWUsR0FBMkIsU0FBUyxDQUFDLE9BQU8sQ0FDN0QsZUFBTyxDQUFDLFFBQVEsQ0FDbkIsQ0FBQztJQUVGLHFCQUFxQjtJQUNyQixNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FDbkQsS0FBSyxDQUFDLGtCQUFrQixDQUMzQixDQUFDO0lBRUYsMEJBQTBCO0lBQzFCLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxHQUFHLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQztJQUM5QyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBOEIsQ0FBQztJQUNwRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sZUFBZSxDQUFDLGVBQWUsQ0FDMUQsa0JBQWtCLEVBQ2xCO1FBQ0ksUUFBUSxFQUFFO1lBQ04sR0FBRyxRQUFRLENBQUMsUUFBUTtZQUNwQixRQUFRLEVBQUU7Z0JBQ04sR0FBSSxRQUE4QzthQUNyRDtTQUNKO0tBQ0osQ0FDSixDQUFDO0lBRUYsNkNBQTZDO0lBQzdDLEVBQUU7SUFDRiwrRUFBK0U7SUFDL0UsWUFBWTtJQUNaLDBCQUEwQjtJQUMxQixnQ0FBZ0M7SUFDaEMsT0FBTztJQUNQLDZCQUE2QjtJQUU3QixPQUFPLElBQUksNEJBQVksQ0FDbkIsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEVBQ3hDLFFBQVEsQ0FBQyxFQUFFLENBQ2QsQ0FBQztBQUNOLENBQUMsQ0FDSixDQUFDIn0=
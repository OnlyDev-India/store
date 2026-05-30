"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentDataWithoutAmountDataNoNotes = exports.updatePaymentDataWithoutAmountData = exports.updatePaymentDataWithAmountData = exports.updatePaymentContextFailWithDifferentAmount = exports.updatePaymentContextWithDifferentAmount = exports.updatePaymentContextWithWrongEmail = exports.updatePaymentContextWithExistingCustomerRazorpayId = exports.updatePaymentContextWithExistingCustomer = exports.retrievePaymentFailData = exports.retrievePaymentSuccessData = exports.refundPaymentFailData = exports.refundPaymentSuccessData = exports.deletePaymentPartiallyFailData = exports.deletePaymentFailData = exports.deletePaymentSuccessData = exports.capturePaymentContextPartiallyFailData = exports.capturePaymentContextFailData = exports.capturePaymentContextSuccessData = exports.cancelPaymentPartiallyFailData = exports.cancelPaymentFailData = exports.cancelPaymentSuccessData = exports.authorizePaymentSuccessData = exports.initiatePaymentContextWithFailIntentCreation = exports.initiatePaymentContextWithWrongEmail = exports.initiatePaymentContextWithExistingCustomerRazorpayId = exports.initiatePaymentContextWithExistingCustomer = exports.PaymentIntentDataByStatus = void 0;
const razorpay_1 = require("../__mocks__/razorpay");
// import { PaymentIntentDataByStatus } from "../__fixtures__/data";
exports.PaymentIntentDataByStatus = {
    ATTEMPTED: {
        id: "test-user-1234"
    },
    SUCCEEDED: {
        id: "test-user-1234"
    },
    CANCELED: {
        id: "test-user-1234"
    },
    FAILED: {
        id: "test-user-1234"
    },
    UNKNOWN: {
        id: "test-user-1234"
    },
    CREATED: {
        id: "test-user-1234"
    }
};
// INITIATE PAYMENT DATA
exports.initiatePaymentContextWithExistingCustomer = {
    email: razorpay_1.EXISTING_CUSTOMER_EMAIL,
    phone: "9876542321",
    currency_code: "inr",
    amount: 1000,
    resource_id: "test",
    customer: {
        last_name: "test",
        first_name: "customer",
        phone: "9876542321"
    },
    context: {},
    paymentSessionData: {},
    metadata: {}
};
exports.initiatePaymentContextWithExistingCustomerRazorpayId = {
    email: razorpay_1.EXISTING_CUSTOMER_EMAIL,
    currency_code: "inr",
    amount: 1000,
    resource_id: "test",
    customer: {
        phone: "9876542321",
        last_name: "test",
        first_name: "customer",
        metadata: {
            razorpay_id: (0, razorpay_1.isMocksEnabled)() ? "test" : undefined
        }
    },
    context: {},
    paymentSessionData: {
        notes: {
            customer_id: "TEST-CUSTOMER"
        }
    }
};
exports.initiatePaymentContextWithWrongEmail = {
    email: razorpay_1.WRONG_CUSTOMER_EMAIL,
    currency_code: "inr",
    amount: 1000,
    resource_id: "test",
    customer: { last_name: "test", first_name: "customer" },
    context: {},
    paymentSessionData: {}
};
exports.initiatePaymentContextWithFailIntentCreation = {
    email: razorpay_1.EXISTING_CUSTOMER_EMAIL,
    currency_code: "inr",
    amount: 1000,
    resource_id: "test",
    customer: { last_name: "test", first_name: "customer" },
    context: {
        payment_description: "fail"
    },
    paymentSessionData: {}
};
// AUTHORIZE PAYMENT DATA
exports.authorizePaymentSuccessData = {
    id: exports.PaymentIntentDataByStatus.ATTEMPTED.id
};
// CANCEL PAYMENT DATA
exports.cancelPaymentSuccessData = {
    id: exports.PaymentIntentDataByStatus.ATTEMPTED.id
};
exports.cancelPaymentFailData = {
    id: razorpay_1.FAIL_INTENT_ID
};
exports.cancelPaymentPartiallyFailData = {
    id: razorpay_1.PARTIALLY_FAIL_INTENT_ID
};
// CAPTURE PAYMENT DATA
exports.capturePaymentContextSuccessData = {
    paymentSessionData: {
        id: exports.PaymentIntentDataByStatus.ATTEMPTED.id
    }
};
exports.capturePaymentContextFailData = {
    paymentSessionData: {
        id: razorpay_1.FAIL_INTENT_ID
    }
};
exports.capturePaymentContextPartiallyFailData = {
    paymentSessionData: {
        id: razorpay_1.PARTIALLY_FAIL_INTENT_ID
    }
};
// DELETE PAYMENT DATA
exports.deletePaymentSuccessData = {
    id: exports.PaymentIntentDataByStatus.ATTEMPTED.id
};
exports.deletePaymentFailData = {
    id: razorpay_1.FAIL_INTENT_ID
};
exports.deletePaymentPartiallyFailData = {
    id: razorpay_1.PARTIALLY_FAIL_INTENT_ID
};
// REFUND PAYMENT DATA
exports.refundPaymentSuccessData = {
    sessionid: exports.PaymentIntentDataByStatus.ATTEMPTED.id
};
exports.refundPaymentFailData = {
    id: razorpay_1.FAIL_INTENT_ID
};
// RETRIEVE PAYMENT DATA
exports.retrievePaymentSuccessData = {
    id: exports.PaymentIntentDataByStatus.ATTEMPTED.id
};
exports.retrievePaymentFailData = {
    id: razorpay_1.FAIL_INTENT_ID
};
// UPDATE PAYMENT DATA
exports.updatePaymentContextWithExistingCustomer = {
    email: razorpay_1.EXISTING_CUSTOMER_EMAIL,
    currency_code: "inr",
    amount: 1000,
    resource_id: "test",
    customer: {},
    context: {},
    paymentSessionData: {
        customer: "test",
        amount: 1000
    }
};
exports.updatePaymentContextWithExistingCustomerRazorpayId = {
    email: razorpay_1.EXISTING_CUSTOMER_EMAIL,
    currency_code: "inr",
    amount: 1000,
    resource_id: "test",
    customer: {
        metadata: {
            razorpay_id: "test"
        }
    },
    context: {},
    paymentSessionData: {
        customer: "test",
        amount: 1000
    }
};
exports.updatePaymentContextWithWrongEmail = {
    email: razorpay_1.WRONG_CUSTOMER_EMAIL,
    currency_code: "inr",
    amount: 1000,
    resource_id: "test",
    customer: {},
    context: {},
    paymentSessionData: {
        customer: "test",
        amount: 1000
    }
};
exports.updatePaymentContextWithDifferentAmount = {
    email: razorpay_1.WRONG_CUSTOMER_EMAIL,
    currency_code: "inr",
    amount: 2000,
    resource_id: "test",
    customer: {
        metadata: {
            razorpay_id: "test"
        }
    },
    context: {},
    paymentSessionData: {
        id: exports.PaymentIntentDataByStatus.ATTEMPTED.id,
        customer: "test",
        amount: 1000
    }
};
exports.updatePaymentContextFailWithDifferentAmount = {
    email: razorpay_1.WRONG_CUSTOMER_EMAIL,
    currency_code: "inr",
    amount: 2000,
    resource_id: "test",
    customer: {
        metadata: {
            razorpay_id: "test"
        }
    },
    context: {
        metadata: {
            razorpay_id: "test"
        }
    },
    paymentSessionData: {
        id: razorpay_1.FAIL_INTENT_ID,
        customer: "test",
        amount: 1000
    }
};
exports.updatePaymentDataWithAmountData = {
    sessionId: razorpay_1.RAZORPAY_ID ?? "test",
    amount: 2000
};
exports.updatePaymentDataWithoutAmountData = {
    sessionId: razorpay_1.RAZORPAY_ID ?? "test",
    id: razorpay_1.RAZORPAY_ID ?? "test", // /duplication needs to be fixed
    /** only notes can be updated */
    notes: {
        customProp: "test",
        test: "test-string"
    }
};
exports.updatePaymentDataWithoutAmountDataNoNotes = {
    sessionId: razorpay_1.RAZORPAY_ID ?? "test",
    id: razorpay_1.RAZORPAY_ID ?? "test" // /duplication needs to be fixed
    /** only notes can be updated */
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3Jhem9ycGF5L2NvcmUvX19maXh0dXJlc19fL2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0RBTytCO0FBQy9CLG9FQUFvRTtBQUV2RCxRQUFBLHlCQUF5QixHQUFHO0lBQ3JDLFNBQVMsRUFBRTtRQUNQLEVBQUUsRUFBRSxnQkFBZ0I7S0FDdkI7SUFDRCxTQUFTLEVBQUU7UUFDUCxFQUFFLEVBQUUsZ0JBQWdCO0tBQ3ZCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sRUFBRSxFQUFFLGdCQUFnQjtLQUN2QjtJQUNELE1BQU0sRUFBRTtRQUNKLEVBQUUsRUFBRSxnQkFBZ0I7S0FDdkI7SUFDRCxPQUFPLEVBQUU7UUFDTCxFQUFFLEVBQUUsZ0JBQWdCO0tBQ3ZCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsRUFBRSxFQUFFLGdCQUFnQjtLQUN2QjtDQUNKLENBQUM7QUFDRix3QkFBd0I7QUFFWCxRQUFBLDBDQUEwQyxHQUFHO0lBQ3RELEtBQUssRUFBRSxrQ0FBdUI7SUFDOUIsS0FBSyxFQUFFLFlBQVk7SUFDbkIsYUFBYSxFQUFFLEtBQUs7SUFDcEIsTUFBTSxFQUFFLElBQUk7SUFDWixXQUFXLEVBQUUsTUFBTTtJQUNuQixRQUFRLEVBQUU7UUFDTixTQUFTLEVBQUUsTUFBTTtRQUNqQixVQUFVLEVBQUUsVUFBVTtRQUN0QixLQUFLLEVBQUUsWUFBWTtLQUN0QjtJQUNELE9BQU8sRUFBRSxFQUFFO0lBQ1gsa0JBQWtCLEVBQUUsRUFBRTtJQUN0QixRQUFRLEVBQUUsRUFBRTtDQUNmLENBQUM7QUFFVyxRQUFBLG9EQUFvRCxHQUFHO0lBQ2hFLEtBQUssRUFBRSxrQ0FBdUI7SUFFOUIsYUFBYSxFQUFFLEtBQUs7SUFDcEIsTUFBTSxFQUFFLElBQUk7SUFDWixXQUFXLEVBQUUsTUFBTTtJQUNuQixRQUFRLEVBQUU7UUFDTixLQUFL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
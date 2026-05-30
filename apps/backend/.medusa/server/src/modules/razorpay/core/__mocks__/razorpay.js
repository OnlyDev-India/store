"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorpayMock = exports.FAIL_INTENT_ID = exports.PARTIALLY_FAIL_INTENT_ID = exports.RAZORPAY_ID = exports.EXISTING_CUSTOMER_EMAIL = exports.WRONG_CUSTOMER_EMAIL = void 0;
exports.isMocksEnabled = isMocksEnabled;
const data_1 = require("../__fixtures__/data");
const razorpay_1 = __importDefault(require("razorpay"));
const types_1 = require("../../types");
const globals_1 = require("@jest/globals");
exports.WRONG_CUSTOMER_EMAIL = "wrong@test.fr";
exports.EXISTING_CUSTOMER_EMAIL = "right@test.fr";
exports.RAZORPAY_ID = isMocksEnabled() ? "test" : process.env.RAZORPAY_ID;
exports.PARTIALLY_FAIL_INTENT_ID = "partially_unknown";
exports.FAIL_INTENT_ID = "unknown";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mockEnabled = process.env.DISABLE_MOCKS == "true" ? false : true;
function isMocksEnabled() {
    if (mockEnabled) {
        console.log("using mocks");
    }
    return mockEnabled;
}
exports.RazorpayMock = {
    orders: {
        fetch: globals_1.jest.fn().mockImplementation(async (orderId) => {
            if (orderId === exports.FAIL_INTENT_ID) {
                throw new Error("Error");
            }
            return (Object.values(data_1.PaymentIntentDataByStatus).find((value) => {
                return value.id === orderId;
            }) ?? {});
        }),
        fetchPayments: globals_1.jest.fn().mockImplementation(async (orderId) => {
            if (orderId === exports.FAIL_INTENT_ID) {
                throw new Error("Error");
            }
            return (Object.values(data_1.PaymentIntentDataByStatus).find((value) => {
                return value.id === orderId;
            }) ?? {});
        }),
        edit: globals_1.jest.fn().mockImplementation(async (orderId, updateData) => {
            if (orderId === exports.FAIL_INTENT_ID) {
                throw new Error("Error");
            }
            const data = Object.values(data_1.PaymentIntentDataByStatus).find((value) => {
                return value.id === orderId;
            }) ?? {};
            return { ...data, ...updateData };
        }),
        create: globals_1.jest.fn().mockImplementation(async (data) => {
            if (data.description === "fail") {
                throw new Error("Error");
            }
            return data;
        })
    },
    payments: {
        fetch: globals_1.jest.fn().mockImplementation(async (paymentId) => {
            if (paymentId === exports.FAIL_INTENT_ID) {
                throw new Error("Error");
            }
            return (Object.values(data_1.PaymentIntentDataByStatus).find((value) => {
                return value.id === paymentId;
            }) ?? {});
        }),
        edit: globals_1.jest
            .fn()
            .mockImplementation(async (paymentId, updateData) => {
            if (paymentId === exports.FAIL_INTENT_ID) {
                throw new Error("Error");
            }
            const data = Object.values(data_1.PaymentIntentDataByStatus).find((value) => {
                return value.id === paymentId;
            }) ?? {};
            return { ...data, ...updateData };
        }),
        create: globals_1.jest.fn().mockImplementation(async (data) => {
            if (data.description === "fail") {
                throw new Error("Error");
            }
            return data;
        }),
        cancel: globals_1.jest.fn().mockImplementation(async (paymentId) => {
            if (paymentId === exports.FAIL_INTENT_ID) {
                throw new Error("Error");
            }
            if (paymentId === exports.PARTIALLY_FAIL_INTENT_ID) {
                throw new Error(JSON.stringify({
                    code: types_1.ErrorCodes.PAYMENT_INTENT_UNEXPECTED_STATE,
                    payment_intent: {
                        id: paymentId,
                        status: types_1.ErrorIntentStatus.CANCELED
                    },
                    type: "invalid_request_error"
                }));
            }
            return { id: paymentId };
        }),
        capture: globals_1.jest.fn().mockImplementation(async (paymentId) => {
            if (paymentId === exports.FAIL_INTENT_ID) {
                throw new Error("Error");
            }
            if (paymentId === exports.PARTIALLY_FAIL_INTENT_ID) {
                throw new Error(JSON.stringify({
                    code: types_1.ErrorCodes.PAYMENT_INTENT_UNEXPECTED_STATE,
                    payment_intent: {
                        id: paymentId,
                        status: types_1.ErrorIntentStatus.SUCCEEDED
                    },
                    type: "invalid_request_error"
                }));
            }
            return { id: paymentId };
        }),
        refund: globals_1.jest
            .fn()
            .mockImplementation(async ({ payment_intent: paymentId }) => {
            if (paymentId === exports.FAIL_INTENT_ID) {
                throw new Error("Error");
            }
            return { id: paymentId };
        })
    },
    refunds: {
        fetch: globals_1.jest.fn().mockImplementation(async (paymentId) => {
            if (paymentId === exports.FAIL_INTENT_ID) {
                throw new Error("Error");
            }
            return (Object.values(data_1.PaymentIntentDataByStatus).find((value) => {
                return value.id === paymentId;
            }) ?? {});
        })
    },
    customers: {
        create: globals_1.jest.fn().mockImplementation(async (data) => {
            if (data.email === exports.EXISTING_CUSTOMER_EMAIL) {
                return { id: exports.RAZORPAY_ID, ...data };
            }
            throw new Error("Error");
        }),
        fetch: globals_1.jest.fn().mockImplementation(async (data) => {
            const customer = {
                id: "TEST-CUSTOMER",
                entity: "customer",
                created_at: 0,
                name: "test customer",
                email: exports.EXISTING_CUSTOMER_EMAIL,
                contact: "9876543210"
            };
            return Promise.resolve(customer);
        }),
        edit: globals_1.jest.fn().mockImplementation(async (id, data) => {
            const customer = {
                id: id,
                entity: "customer",
                created_at: 0,
                name: "test customer",
                email: exports.EXISTING_CUSTOMER_EMAIL,
                contact: "9876543210"
            };
            return Promise.resolve(customer);
        })
    }
};
const razorpay = isMocksEnabled() ? globals_1.jest.fn(() => exports.RazorpayMock) : razorpay_1.default;
exports.default = razorpay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF6b3JwYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yYXpvcnBheS9jb3JlL19fbW9ja3NfXy9yYXpvcnBheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFnQkEsd0NBS0M7QUFyQkQsK0NBQWlFO0FBQ2pFLHdEQUFnQztBQUNoQyx1Q0FBNEQ7QUFDNUQsMkNBQXFDO0FBQ3hCLFFBQUEsb0JBQW9CLEdBQUcsZUFBZSxDQUFDO0FBQ3ZDLFFBQUEsdUJBQXVCLEdBQUcsZUFBZSxDQUFDO0FBQzFDLFFBQUEsV0FBVyxHQUFHLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO0FBQ2xFLFFBQUEsd0JBQXdCLEdBQUcsbUJBQW1CLENBQUM7QUFDL0MsUUFBQSxjQUFjLEdBQUcsU0FBUyxDQUFDO0FBRXhDLG9EQUE0QjtBQUU1QixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFFdkUsU0FBZ0IsY0FBYztJQUMxQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQUVZLFFBQUEsWUFBWSxHQUFHO0lBQ3hCLE1BQU0sRUFBRTtRQUNKLEtBQUssRUFBRSxjQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ2xELElBQUksT0FBTyxLQUFLLHNCQUFjLEVBQUUsQ0FBQztnQkFDN0IsTUFBTSxJQUFJLEtBQUssQ0FB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
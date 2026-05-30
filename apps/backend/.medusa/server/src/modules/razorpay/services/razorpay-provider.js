"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const razorpay_base_1 = __importDefault(require("../core/razorpay-base"));
const types_1 = require("../types");
class RazorpayProviderService extends razorpay_base_1.default {
    constructor(_, options) {
        super(_, options);
    }
    get paymentIntentOptions() {
        return {};
    }
}
RazorpayProviderService.identifier = types_1.PaymentProviderKeys.RAZORPAY;
exports.default = RazorpayProviderService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF6b3JwYXktcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yYXpvcnBheS9zZXJ2aWNlcy9yYXpvcnBheS1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBFQUFpRDtBQUNqRCxvQ0FBcUU7QUFFckUsTUFBTSx1QkFBd0IsU0FBUSx1QkFBWTtJQUc5QyxZQUFZLENBQUMsRUFBRSxPQUFPO1FBQ2xCLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksb0JBQW9CO1FBQ3BCLE9BQU8sRUFBUyxDQUFDO0lBQ3JCLENBQUM7O0FBUk0sa0NBQVUsR0FBRywyQkFBbUIsQ0FBQyxRQUFRLENBQUM7QUFXckQsa0JBQWUsdUJBQXVCLENBQUMifQ==
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVOICE_MODULE = void 0;
const create_default_config_1 = __importDefault(require("./loaders/create-default-config"));
const service_1 = __importDefault(require("./service"));
const utils_1 = require("@medusajs/framework/utils");
exports.INVOICE_MODULE = "invoiceGenerator";
exports.default = (0, utils_1.Module)(exports.INVOICE_MODULE, {
    service: service_1.default,
    loaders: [create_default_config_1.default],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9pbnZvaWNlLWdlbmVyYXRvci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RkFBdUU7QUFDdkUsd0RBQTRDO0FBQzVDLHFEQUFrRDtBQUVyQyxRQUFBLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQTtBQUVoRCxrQkFBZSxJQUFBLGNBQU0sRUFBQyxzQkFBYyxFQUFFO0lBQ3BDLE9BQU8sRUFBRSxpQkFBb0I7SUFDN0IsT0FBTyxFQUFFLENBQUMsK0JBQXlCLENBQUM7Q0FDckMsQ0FBQyxDQUFBIn0=
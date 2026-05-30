"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = exports.InvoiceStatus = void 0;
const utils_1 = require("@medusajs/framework/utils");
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["LATEST"] = "latest";
    InvoiceStatus["STALE"] = "stale";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
exports.Invoice = utils_1.model.define("invoice", {
    id: utils_1.model.id().primaryKey(),
    display_id: utils_1.model.autoincrement(),
    order_id: utils_1.model.text(),
    status: utils_1.model.enum(InvoiceStatus).default(InvoiceStatus.LATEST),
    pdfContent: utils_1.model.json(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2ludm9pY2UtZ2VuZXJhdG9yL21vZGVscy9pbnZvaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVqRCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDdkIsa0NBQWlCLENBQUE7SUFDakIsZ0NBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSFcsYUFBYSw2QkFBYixhQUFhLFFBR3hCO0FBRVksUUFBQSxPQUFPLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7SUFDN0MsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDM0IsVUFBVSxFQUFFLGFBQUssQ0FBQyxhQUFhLEVBQUU7SUFDakMsUUFBUSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDdEIsTUFBTSxFQUFFLGFBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDL0QsVUFBVSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7Q0FDekIsQ0FBQyxDQUFBIn0=
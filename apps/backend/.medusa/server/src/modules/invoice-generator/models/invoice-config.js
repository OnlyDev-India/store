"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceConfig = void 0;
const utils_1 = require("@medusajs/framework/utils");
exports.InvoiceConfig = utils_1.model.define("invoice_config", {
    id: utils_1.model.id().primaryKey(),
    company_name: utils_1.model.text(),
    company_address: utils_1.model.text(),
    company_phone: utils_1.model.text(),
    company_email: utils_1.model.text(),
    company_logo: utils_1.model.text().nullable(),
    notes: utils_1.model.text().nullable(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9pbnZvaWNlLWdlbmVyYXRvci9tb2RlbHMvaW52b2ljZS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWlEO0FBRXBDLFFBQUEsYUFBYSxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7SUFDMUQsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDM0IsWUFBWSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDMUIsZUFBZSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDN0IsYUFBYSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDM0IsYUFBYSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDM0IsWUFBWSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDckMsS0FBSyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Q0FDL0IsQ0FBQyxDQUFBIn0=
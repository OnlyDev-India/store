"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostInvoiceConfigSchema = void 0;
exports.GET = GET;
exports.POST = POST;
const zod_1 = require("@medusajs/framework/zod");
const update_invoice_config_1 = require("../../../workflows/update-invoice-config");
async function GET(req, res) {
    const query = req.scope.resolve("query");
    const { data: [invoiceConfig] } = await query.graph({
        entity: "invoice_config",
        fields: ["*"],
    });
    res.json({
        invoice_config: invoiceConfig,
    });
}
exports.PostInvoiceConfigSchema = zod_1.z.object({
    company_name: zod_1.z.string().optional(),
    company_address: zod_1.z.string().optional(),
    company_phone: zod_1.z.string().optional(),
    company_email: zod_1.z.string().optional(),
    company_logo: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
async function POST(req, res) {
    const { result: { invoice_config } } = await (0, update_invoice_config_1.updateInvoiceConfigWorkflow)(req.scope).run({
        input: req.validatedBody,
    });
    res.json({
        invoice_config,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2ludm9pY2UtY29uZmlnL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLGtCQWNDO0FBYUMsb0JBYUM7QUEzQ0gsaURBQTJDO0FBQzNDLG9GQUFzRjtBQUUvRSxLQUFLLFVBQVUsR0FBRyxDQUN2QixHQUFrQixFQUNsQixHQUFtQjtJQUVuQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUV4QyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDbEQsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUM7S0FDZCxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ1AsY0FBYyxFQUFFLGFBQWE7S0FDOUIsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVZLFFBQUEsdUJBQXVCLEdBQUcsT0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM1QyxZQUFZLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNuQyxlQUFlLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUN0QyxhQUFhLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNwQyxhQUFhLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNwQyxZQUFZLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNuQyxLQUFLLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtDQUM3QixDQUFDLENBQUE7QUFJSyxLQUFLLFVBQVUsSUFBSSxDQUN4QixHQUFxQyxFQUNyQyxHQUFtQjtJQUVuQixNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsY0FBYyxFQUFFLEVBQUUsR0FBRyxNQUFNLElBQUEsbURBQTJCLEVBQ3RFLEdBQUcsQ0FBQyxLQUFLLENBQ1YsQ0FBQyxHQUFHLENBQUM7UUFDSixLQUFLLEVBQUUsR0FBRyxDQUFDLGFBQWE7S0FDekIsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNQLGNBQWM7S0FDZixDQUFDLENBQUE7QUFDSixDQUFDIn0=
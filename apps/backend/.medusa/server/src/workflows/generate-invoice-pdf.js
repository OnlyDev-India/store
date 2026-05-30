"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoicePdfWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const generate_invoice_pdf_1 = require("./steps/generate-invoice-pdf");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const get_order_invoice_1 = require("./steps/get-order-invoice");
exports.generateInvoicePdfWorkflow = (0, workflows_sdk_1.createWorkflow)("generate-invoice-pdf", (input) => {
    const { data: orders } = (0, core_flows_1.useQueryGraphStep)({
        entity: "order",
        fields: [
            "id",
            "display_id",
            "created_at",
            "currency_code",
            "total",
            "items.*",
            "items.variant.*",
            "items.variant.product.*",
            "shipping_address.*",
            "billing_address.*",
            "shipping_methods.*",
            "tax_total",
            "subtotal",
            "discount_total",
        ],
        filters: {
            id: input.order_id,
        },
        options: {
            throwIfKeyNotFound: true,
        },
    });
    const countryFilters = (0, workflows_sdk_1.transform)({
        orders,
    }, (data) => {
        const country_codes = [];
        if (data.orders[0].billing_address?.country_code) {
            country_codes.push(data.orders[0].billing_address.country_code);
        }
        if (data.orders[0].shipping_address?.country_code) {
            country_codes.push(data.orders[0].shipping_address.country_code);
        }
        return country_codes;
    });
    const { data: countries } = (0, core_flows_1.useQueryGraphStep)({
        entity: "country",
        fields: ["display_name", "iso_2"],
        filters: {
            iso_2: countryFilters,
        },
    }).config({ name: "retrieve-countries" });
    const transformedOrder = (0, workflows_sdk_1.transform)({
        orders,
        countries,
    }, (data) => {
        const order = data.orders[0];
        if (order.billing_address?.country_code) {
            order.billing_address.country_code = data.countries.find((country) => country.iso_2 === order.billing_address.country_code)?.display_name || order.billing_address.country_code;
        }
        if (order.shipping_address?.country_code) {
            order.shipping_address.country_code = data.countries.find((country) => country.iso_2 === order.shipping_address.country_code)?.display_name || order.shipping_address.country_code;
        }
        return order;
    });
    const invoice = (0, get_order_invoice_1.getOrderInvoiceStep)({
        order_id: transformedOrder.id,
    });
    const { pdf_buffer } = (0, generate_invoice_pdf_1.generateInvoicePdfStep)({
        order: transformedOrder,
        items: transformedOrder.items,
        invoice_id: invoice.id,
    });
    return new workflows_sdk_1.WorkflowResponse({
        pdf_buffer,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtaW52b2ljZS1wZGYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2dlbmVyYXRlLWludm9pY2UtcGRmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUErRjtBQUMvRix1RUFBa0c7QUFDbEcsNERBQStEO0FBQy9ELGlFQUErRDtBQU1sRCxRQUFBLDBCQUEwQixHQUFHLElBQUEsOEJBQWMsRUFDdEQsc0JBQXNCLEVBQ3RCLENBQUMsS0FBb0IsRUFBRSxFQUFFO0lBQ3ZCLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBQSw4QkFBaUIsRUFBQztRQUN6QyxNQUFNLEVBQUUsT0FBTztRQUNmLE1BQU0sRUFBRTtZQUNOLElBQUk7WUFDSixZQUFZO1lBQ1osWUFBWTtZQUNaLGVBQWU7WUFDZixPQUFPO1lBQ1AsU0FBUztZQUNULGlCQUFpQjtZQUNqQix5QkFBeUI7WUFDekIsb0JBQW9CO1lBQ3BCLG1CQUFtQjtZQUNuQixvQkFBb0I7WUFDcEIsV0FBVztZQUNYLFVBQVU7WUFDVixnQkFBZ0I7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsS0FBSyxDQUFDLFFBQVE7U0FDbkI7UUFDRCxPQUFPLEVBQUU7WUFDUCxrQkFBa0IsRUFBRSxJQUFJO1NBQ3pCO0tBQ0YsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxjQUFjLEdBQUcsSUFBQSx5QkFBUyxFQUFDO1FBQy9CLE1BQU07S0FDUCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixNQUFNLGFBQWEsR0FBYSxFQUFFLENBQUE7UUFDbEMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsQ0FBQztZQUNqRCxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ2pFLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLENBQUM7WUFDbEQsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ2xFLENBQUM7UUFDRCxPQUFPLGFBQWEsQ0FBQTtJQUN0QixDQUFDLENBQUMsQ0FBQTtJQUNGLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBQSw4QkFBaUIsRUFBQztRQUM1QyxNQUFNLEVBQUUsU0FBUztRQUNqQixNQUFNLEVBQUUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDO1FBQ2pDLE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxjQUFjO1NBQ3RCO0tBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7SUFFekMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLHlCQUFTLEVBQUM7UUFDakMsTUFBTTtRQUNOLFNBQVM7S0FDVixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDVixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRTVCLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsQ0FBQztZQUN4QyxLQUFLLENBQUMsZUFBZSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDdEQsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLGVBQWdCLENBQUMsWUFBWSxDQUNuRSxFQUFFLFlBQVksSUFBSSxLQUFLLENBQUMsZUFBZ0IsQ0FBQyxZQUFZLENBQUE7UUFDeEQsQ0FBQztRQUVELElBQUksS0FBSyxDQUFDLGdCQUFnQixFQUFFLFlBQVksRUFBRSxDQUFDO1lBQ3pDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ3ZELENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxnQkFBaUIsQ0FBQyxZQUFZLENBQ3BFLEVBQUUsWUFBWSxJQUFJLEtBQUssQ0FBQyxnQkFBaUIsQ0FBQyxZQUFZLENBQUE7UUFDekQsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLE9BQU8sR0FBRyxJQUFBLHVDQUFtQixFQUFDO1FBQ2xDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFO0tBQzlCLENBQUMsQ0FBQTtJQUVGLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxJQUFBLDZDQUFzQixFQUFDO1FBQzVDLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEtBQUs7UUFDN0IsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFO0tBQ21CLENBQUMsQ0FBQTtJQUU1QyxPQUFPLElBQUksZ0NBQWdCLENBQUM7UUFDMUIsVUFBVTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBIn0=
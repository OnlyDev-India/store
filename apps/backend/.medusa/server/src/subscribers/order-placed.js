"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderPlacedHandler;
const generate_invoice_pdf_1 = require("../workflows/generate-invoice-pdf");
async function orderPlacedHandler({ event: { data }, container, }) {
    const query = container.resolve("query");
    const notificationModuleService = container.resolve("notification");
    const { data: [order] } = await query.graph({
        entity: "order",
        fields: [
            "id",
            "display_id",
            "created_at",
            "currency_code",
            "total",
            "email",
            "items.*",
            "items.variant.*",
            "items.variant.product.*",
            "shipping_address.*",
            "billing_address.*",
            "shipping_methods.*",
            "tax_total",
            "subtotal",
            "discount_total",
            // add any other fields you need for the email template...
        ],
        filters: {
            id: data.id,
        },
    });
    const { result: { pdf_buffer, } } = await (0, generate_invoice_pdf_1.generateInvoicePdfWorkflow)(container)
        .run({
        input: {
            order_id: data.id,
        },
    });
    const buffer = Buffer.from(pdf_buffer);
    // Convert to binary string to pass as attachment
    const binaryString = [...buffer]
        .map((byte) => byte.toString(2).padStart(8, "0"))
        .join("");
    await notificationModuleService.createNotifications({
        to: order.email || "",
        template: "order-placed",
        channel: "email",
        data: order,
        attachments: [
            {
                content: binaryString,
                filename: `invoice-${order.id}.pdf`,
                content_type: "application/pdf",
                disposition: "attachment",
            },
        ],
    });
}
exports.config = {
    event: "order.placed",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcGxhY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL29yZGVyLXBsYWNlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxxQ0FnRUM7QUFsRUQsNEVBQThFO0FBRS9ELEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxFQUMvQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFDZixTQUFTLEdBR1Q7SUFDQSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3hDLE1BQU0seUJBQXlCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUVuRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDMUMsTUFBTSxFQUFFLE9BQU87UUFDZixNQUFNLEVBQUU7WUFDTixJQUFJO1lBQ0osWUFBWTtZQUNaLFlBQVk7WUFDWixlQUFlO1lBQ2YsT0FBTztZQUNQLE9BQU87WUFDUCxTQUFTO1lBQ1QsaUJBQWlCO1lBQ2pCLHlCQUF5QjtZQUN6QixvQkFBb0I7WUFDcEIsbUJBQW1CO1lBQ25CLG9CQUFvQjtZQUNwQixXQUFXO1lBQ1gsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQiwwREFBMEQ7U0FDM0Q7UUFDRCxPQUFPLEVBQUU7WUFDUCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7U0FDWjtLQUNGLENBQUMsQ0FBQTtJQUVGLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFDZCxVQUFVLEdBQ1gsRUFBRSxHQUFHLE1BQU0sSUFBQSxpREFBMEIsRUFBQyxTQUFTLENBQUM7U0FDOUMsR0FBRyxDQUFDO1FBQ0gsS0FBSyxFQUFFO1lBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ2xCO0tBQ0YsQ0FBQyxDQUFBO0lBRUosTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUV0QyxpREFBaUQ7SUFDakQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUM3QixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNoRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFWCxNQUFNLHlCQUF5QixDQUFDLG1CQUFtQixDQUFDO1FBQ2xELEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDckIsUUFBUSxFQUFFLGNBQWM7UUFDeEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsSUFBSSxFQUFFLEtBQUs7UUFDWCxXQUFXLEVBQUU7WUFDWDtnQkFDRSxPQUFPLEVBQUUsWUFBWTtnQkFDckIsUUFBUSxFQUFFLFdBQVcsS0FBSyxDQUFDLEVBQUUsTUFBTTtnQkFDbkMsWUFBWSxFQUFFLGlCQUFpQjtnQkFDL0IsV0FBVyxFQUFFLFlBQVk7YUFDMUI7U0FDRjtLQUNGLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLGNBQWM7Q0FDdEIsQ0FBQSJ9
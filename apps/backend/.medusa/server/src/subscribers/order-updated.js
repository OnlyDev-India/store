"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderUpdatedHandler;
const mark_invoices_stale_1 = require("../workflows/mark-invoices-stale");
async function orderUpdatedHandler({ event: { data }, container, }) {
    const orderId = "id" in data ? data.id : data.order_id;
    await (0, mark_invoices_stale_1.markInvoicesStaleWorkflow)(container)
        .run({
        input: {
            order_id: orderId,
        },
    });
}
exports.config = {
    event: [
        "order.updated",
        "order-edit.confirmed",
        "order.exchange_created",
        "order.claim_created",
        "order.return_received",
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItdXBkYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9vcmRlci11cGRhdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVNBLHNDQVlDO0FBcEJELDBFQUE0RTtBQVE3RCxLQUFLLFVBQVUsbUJBQW1CLENBQUMsRUFDaEQsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQ2YsU0FBUyxHQUNvQjtJQUM3QixNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBRXRELE1BQU0sSUFBQSwrQ0FBeUIsRUFBQyxTQUFTLENBQUM7U0FDdkMsR0FBRyxDQUFDO1FBQ0gsS0FBSyxFQUFFO1lBQ0wsUUFBUSxFQUFFLE9BQU87U0FDbEI7S0FDRixDQUFDLENBQUE7QUFDTixDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRTtRQUNMLGVBQWU7UUFDZixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLHFCQUFxQjtRQUNyQix1QkFBdUI7S0FDeEI7Q0FDRixDQUFBIn0=
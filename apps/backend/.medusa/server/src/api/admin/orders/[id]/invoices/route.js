"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const generate_invoice_pdf_1 = require("../../../../../workflows/generate-invoice-pdf");
async function GET(req, res) {
    const { id } = req.params;
    const { result: { pdf_buffer, } } = await (0, generate_invoice_pdf_1.generateInvoicePdfWorkflow)(req.scope)
        .run({
        input: {
            order_id: id,
        },
    });
    const buffer = Buffer.from(pdf_buffer);
    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${id}.pdf"`,
        "Content-Length": buffer.length,
    });
    res.send(buffer);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL29yZGVycy9baWRdL2ludm9pY2VzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0Esa0JBd0JDO0FBMUJELHdGQUEwRjtBQUVuRixLQUFLLFVBQVUsR0FBRyxDQUN2QixHQUFrQixFQUNsQixHQUFtQjtJQUVuQixNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUV6QixNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQ2QsVUFBVSxHQUNYLEVBQUUsR0FBRyxNQUFNLElBQUEsaURBQTBCLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztTQUM5QyxHQUFHLENBQUM7UUFDSCxLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUUsRUFBRTtTQUNiO0tBQ0YsQ0FBQyxDQUFBO0lBRUosTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUV0QyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ04sY0FBYyxFQUFFLGlCQUFpQjtRQUNqQyxxQkFBcUIsRUFBRSxpQ0FBaUMsRUFBRSxPQUFPO1FBQ2pFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxNQUFNO0tBQ2hDLENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDbEIsQ0FBQyJ9
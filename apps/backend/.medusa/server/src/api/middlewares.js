"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@medusajs/framework/http");
const route_1 = require("./admin/invoice-config/route");
exports.default = (0, http_1.defineMiddlewares)({
    routes: [
        {
            matcher: "/admin/invoice-config",
            methods: ["POST"],
            middlewares: [
                (0, http_1.validateAndTransformBody)(route_1.PostInvoiceConfigSchema),
            ],
        },
    ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXNGO0FBQ3RGLHdEQUFzRTtBQUV0RSxrQkFBZSxJQUFBLHdCQUFpQixFQUFDO0lBQy9CLE1BQU0sRUFBRTtRQUNOO1lBQ0UsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDakIsV0FBVyxFQUFFO2dCQUNYLElBQUEsK0JBQXdCLEVBQUMsK0JBQXVCLENBQUM7YUFDbEQ7U0FDRjtLQUNGO0NBQ0YsQ0FBQyxDQUFBIn0=
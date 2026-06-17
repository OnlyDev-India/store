"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
(0, utils_1.loadEnv)(process.env.NODE_ENV || "development", process.cwd());
module.exports = (0, utils_1.defineConfig)({
    projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
        cookieOptions: {
            secure: false,
            sameSite: "lax",
        },
        http: {
            storeCors: process.env.STORE_CORS,
            adminCors: process.env.ADMIN_CORS,
            authCors: process.env.AUTH_CORS,
            jwtSecret: process.env.JWT_SECRET || "supersecret",
            cookieSecret: process.env.COOKIE_SECRET || "supersecret",
        },
    },
    modules: [
        {
            resolve: "@medusajs/medusa/payment",
            options: {
                providers: [
                    {
                        resolve: "./src/modules/razorpay",
                        id: "razorpay",
                        options: {
                            key_id: process?.env?.RAZORPAY_TEST_KEY_ID ?? process?.env?.RAZORPAY_ID,
                            key_secret: process?.env?.RAZORPAY_TEST_KEY_SECRET ??
                                process?.env?.RAZORPAY_SECRET,
                            razorpay_account: process?.env?.RAZORPAY_TEST_ACCOUNT ??
                                process?.env?.RAZORPAY_ACCOUNT,
                            automatic_expiry_period: 30 /* any value between 12minuts and 30 days expressed in minutes*/,
                            manual_expiry_period: 20,
                            refund_speed: "normal",
                            webhook_secret: process?.env?.RAZORPAY_TEST_WEBHOOK_SECRET ??
                                process?.env?.RAZORPAY_WEBHOOK_SECRET,
                        },
                    },
                ],
            },
        },
        {
            resolve: "./src/modules/invoice-generator",
        },
    ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBa0U7QUFFbEUsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBRTlELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBQSxvQkFBWSxFQUFDO0lBQzVCLGFBQWEsRUFBRTtRQUNiLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7UUFDckMsYUFBYSxFQUFFO1lBQ2IsTUFBTSxFQUFFLEtBQUs7WUFDYixRQUFRLEVBQUUsS0FBSztTQUNoQjtRQUNELElBQUksRUFBRTtZQUNKLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVc7WUFDbEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVztZQUNsQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFVO1lBQ2hDLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxhQUFhO1lBQ2xELFlBQVksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSxhQUFhO1NBQ3pEO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUDtZQUNFLE9BQU8sRUFBRSwwQkFBMEI7WUFDbkMsT0FBTyxFQUFFO2dCQUNQLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsd0JBQXdCO3dCQUNqQyxFQUFFLEVBQUUsVUFBVTt3QkFDZCxPQUFPLEVBQUU7NEJBQ1AsTUFBTSxFQUNKLE9BQU8sRUFBRSxHQUFHLEVBQUUsb0JBQW9CLElBQUksT0FBTyxFQUFFLEdBQUcsRUFBRSxXQUFXOzRCQUNqRSxVQUFVLEVBQ1IsT0FBTyxFQUFFLEdBQUcsRUFBRSx3QkFBd0I7Z0NBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsZUFBZTs0QkFDL0IsZ0JBQWdCLEVBQ2QsT0FBTyxFQUFFLEdBQUcsRUFBRSxxQkFBcUI7Z0NBQ25DLE9BQU8sRUFBRSxHQUFHLEVBQUUsZ0JBQWdCOzRCQUNoQyx1QkFBdUIsRUFBRSxFQUFFLENBQUMsZ0VBQWdFOzRCQUM1RixvQkFBb0IsRUFBRSxFQUFFOzRCQUN4QixZQUFZLEVBQUUsUUFBUTs0QkFDdEIsY0FBYyxFQUNaLE9BQU8sRUFBRSxHQUFHLEVBQUUsNEJBQTRCO2dDQUMxQyxPQUFPLEVBQUUsR0FBRyxFQUFFLHVCQUF1Qjt5QkFDeEM7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsaUNBQWlDO1NBQzNDO0tBQ0Y7Q0FDRixDQUFDLENBQUMifQ==
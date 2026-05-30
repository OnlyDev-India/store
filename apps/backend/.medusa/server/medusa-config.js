"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
(0, utils_1.loadEnv)(process.env.NODE_ENV || "development", process.cwd());
module.exports = (0, utils_1.defineConfig)({
    projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBa0U7QUFFbEUsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBRTlELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBQSxvQkFBWSxFQUFDO0lBQzVCLGFBQWEsRUFBRTtRQUNiLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7UUFDckMsSUFBSSxFQUFFO1lBQ0osU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVztZQUNsQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFXO1lBQ2xDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVU7WUFDaEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLGFBQWE7WUFDbEQsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLGFBQWE7U0FDekQ7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQO1lBQ0UsT0FBTyxFQUFFLDBCQUEwQjtZQUNuQyxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSx3QkFBd0I7d0JBQ2pDLEVBQUUsRUFBRSxVQUFVO3dCQUNkLE9BQU8sRUFBRTs0QkFDUCxNQUFNLEVBQ0osT0FBTyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsSUFBSSxPQUFPLEVBQUUsR0FBRyxFQUFFLFdBQVc7NEJBQ2pFLFVBQVUsRUFDUixPQUFPLEVBQUUsR0FBRyxFQUFFLHdCQUF3QjtnQ0FDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxlQUFlOzRCQUMvQixnQkFBZ0IsRUFDZCxPQUFPLEVBQUUsR0FBRyxFQUFFLHFCQUFxQjtnQ0FDbkMsT0FBTyxFQUFFLEdBQUcsRUFBRSxnQkFBZ0I7NEJBQ2hDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxnRUFBZ0U7NEJBQzVGLG9CQUFvQixFQUFFLEVBQUU7NEJBQ3hCLFlBQVksRUFBRSxRQUFROzRCQUN0QixjQUFjLEVBQ1osT0FBTyxFQUFFLEdBQUcsRUFBRSw0QkFBNEI7Z0NBQzFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsdUJBQXVCO3lCQUN4QztxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7UUFDRDtZQUNFLE9BQU8sRUFBRSxpQ0FBaUM7U0FDM0M7S0FDRjtDQUNGLENBQUMsQ0FBQyJ9
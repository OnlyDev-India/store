"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createDefaultConfigLoader;
async function createDefaultConfigLoader({ container, }) {
    const service = container.resolve("invoiceConfigService");
    const [_, count] = await service.listAndCount();
    if (count > 0) {
        return;
    }
    await service.create({
        company_name: "Acme",
        company_address: "123 Acme St, Springfield, USA",
        company_phone: "+1 234 567 8900",
        company_email: "admin@example.com",
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWRlZmF1bHQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvaW52b2ljZS1nZW5lcmF0b3IvbG9hZGVycy9jcmVhdGUtZGVmYXVsdC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNRSw0Q0FtQkM7QUFuQmMsS0FBSyxVQUFVLHlCQUF5QixDQUFDLEVBQ3RELFNBQVMsR0FDSztJQUNkLE1BQU0sT0FBTyxHQUVULFNBQVMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUU3QyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFBO0lBRS9DLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ2QsT0FBTTtJQUNSLENBQUM7SUFFRCxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDbkIsWUFBWSxFQUFFLE1BQU07UUFDcEIsZUFBZSxFQUFFLCtCQUErQjtRQUNoRCxhQUFhLEVBQUUsaUJBQWlCO1FBQ2hDLGFBQWEsRUFBRSxtQkFBbUI7S0FDbkMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyJ9
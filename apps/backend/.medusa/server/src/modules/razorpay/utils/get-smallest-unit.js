"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSmallestUnit = getSmallestUnit;
exports.getAmountFromSmallestUnit = getAmountFromSmallestUnit;
const utils_1 = require("@medusajs/framework/utils");
function getCurrencyMultiplier(currency) {
    const currencyMultipliers = {
        0: [
            "BIF",
            "CLP",
            "DJF",
            "GNF",
            "JPY",
            "KMF",
            "KRW",
            "MGA",
            "PYG",
            "RWF",
            "UGX",
            "VND",
            "VUV",
            "XAF",
            "XOF",
            "XPF"
        ],
        3: ["BHD", "IQD", "JOD", "KWD", "OMR", "TND"]
    };
    currency = currency.toUpperCase();
    let power = 2;
    for (const [key, value] of Object.entries(currencyMultipliers)) {
        if (value.includes(currency)) {
            power = parseInt(key, 10);
            break;
        }
    }
    return Math.pow(10, power);
}
/**
 * Converts an amount to the format required by Stripe based on currency.
 * https://docs.stripe.com/currencies
 * @param {BigNumberInput} amount - The amount to be converted.
 * @param {string} currency - The currency code (e.g., 'USD', 'JOD').
 * @returns {number} - The converted amount in the smallest currency unit.
 */
function getSmallestUnit(amount, currency) {
    const multiplier = getCurrencyMultiplier(currency);
    const amount_ = Math.round(new utils_1.BigNumber(utils_1.MathBN.mult(amount, multiplier)).numeric) /
        multiplier;
    const smallestAmount = new utils_1.BigNumber(utils_1.MathBN.mult(amount_, multiplier));
    let numeric = smallestAmount.numeric;
    // Check if the currency requires rounding to the nearest ten
    if (multiplier === 1e3) {
        numeric = Math.ceil(numeric / 10) * 10;
    }
    return parseInt(numeric.toString().split(".").shift(), 10);
}
/**
 * Converts an amount from the smallest currency unit to the standard unit based on currency.
 * @param {BigNumberInput} amount - The amount in the smallest currency unit.
 * @param {string} currency - The currency code (e.g., 'USD', 'JOD').
 * @returns {number} - The converted amount in the standard currency unit.
 */
function getAmountFromSmallestUnit(amount, currency) {
    const multiplier = getCurrencyMultiplier(currency);
    const standardAmount = new utils_1.BigNumber(utils_1.MathBN.div(amount, multiplier));
    return standardAmount.numeric;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXNtYWxsZXN0LXVuaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yYXpvcnBheS91dGlscy9nZXQtc21hbGxlc3QtdW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTRDQSwwQ0FtQkM7QUFRRCw4REFPQztBQTdFRCxxREFBOEQ7QUFFOUQsU0FBUyxxQkFBcUIsQ0FBQyxRQUFRO0lBQ25DLE1BQU0sbUJBQW1CLEdBQUc7UUFDeEIsQ0FBQyxFQUFFO1lBQ0MsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztTQUNSO1FBQ0QsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7S0FDaEQsQ0FBQztJQUVGLFFBQVEsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDO1FBQzdELElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzNCLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLE1BQU07UUFDVixDQUFDO0lBQ0wsQ0FBQztJQUNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQWdCLGVBQWUsQ0FDM0IsTUFBc0IsRUFDdEIsUUFBZ0I7SUFFaEIsTUFBTSxVQUFVLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFbkQsTUFBTSxPQUFPLEdBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLGlCQUFTLENBQUMsY0FBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDbEUsVUFBVSxDQUFDO0lBRWYsTUFBTSxjQUFjLEdBQUcsSUFBSSxpQkFBUyxDQUFDLGNBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFFdkUsSUFBSSxPQUFPLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQztJQUNyQyw2REFBNkQ7SUFDN0QsSUFBSSxVQUFVLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDckIsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQix5QkFBeUIsQ0FDckMsTUFBc0IsRUFDdEIsUUFBZ0I7SUFFaEIsTUFBTSxVQUFVLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsTUFBTSxjQUFjLEdBQUcsSUFBSSxpQkFBUyxDQUFDLGNBQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDckUsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDO0FBQ2xDLENBQUMifQ==
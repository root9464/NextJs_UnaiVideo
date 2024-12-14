const result = '124029587160525356443295'; // Ваше значение
const decimals = 18; // Число десятичных знаков токена (для ETH это 18)

const readableBalance = parseFloat(result) / Math.pow(10, decimals);
console.log(readableBalance.toString()); // => 124029.587160525356443295

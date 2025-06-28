// utils/calculateFinalPrice.js
function calculateFinalPrice(price, quantity, discount = 0) {
  const markedUpPrice = price * 1.2;
  const discountedPrice = markedUpPrice * (1 - discount / 100);
  const finalPrice = discountedPrice * quantity;
  return Number(finalPrice.toFixed(2));
}

module.exports = calculateFinalPrice;

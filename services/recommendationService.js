// Inside recommendationService.js

const Order = require('../models/orderModels');
// Inside recommendationService.js


// Function to calculate cosine similarity
// Function to calculate cosine similarity
function calculateCosineSimilarity(orderHistory1, orderHistory2) {
  // Check if order histories are empty
  if (orderHistory1.length === 0 || orderHistory2.length === 0) {
    return 0; // Set similarity to 0 if one of the histories is empty
  }

  const intersection = orderHistory1.filter(productId => orderHistory2.includes(productId));
  const magnitude1 = Math.sqrt(orderHistory1.length);
  const magnitude2 = Math.sqrt(orderHistory2.length);

  // Calculate cosine similarity
  const cosineSimilarity = intersection.length / (magnitude1 * magnitude2);
  return cosineSimilarity;
}


// Function to get recommendations for a user
async function getRecommendations(userId) {
  const currentUserOrders = await Order.find({ user: userId }).populate('orderItems.product');
  console.log('currentUserOrders:', currentUserOrders); // Debugging

 // Extract product IDs from the order history and convert them to strings
const currentUserHistory = currentUserOrders.flatMap(order =>
  order.orderItems.map(item => item.product && item.product._id.toString()).filter(Boolean)
);


  console.log('currentUserHistory:', currentUserHistory); // Debugging

  const allOtherUsersOrders = await Order.find({ user: { $ne: userId } }).populate('orderItems.product');

  // Calculate cosine similarity with all other users
  const recommendations = allOtherUsersOrders.map(order => {
    const otherUserHistory = order.orderItems.map(item => item.product && item.product._id).filter(Boolean);
    const similarity = calculateCosineSimilarity(currentUserHistory, otherUserHistory);
    return { user: order.user, similarity };
  });

  // Sort recommendations based on similarity
  recommendations.sort((a, b) => b.similarity - a.similarity);

  // Get top 5 similar users/products
  const topRecommendations = recommendations.slice(0, 5);

  return topRecommendations;
}

module.exports = { getRecommendations };

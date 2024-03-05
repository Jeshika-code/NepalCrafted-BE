
const Order = require('../models/orderModels');
// Function to calculate cosine similarity between two vectors
const cosineSimilarity = (vectorA, vectorB) => {
  const dotProduct = Object.keys(vectorA).reduce((acc, productId) => {
    if (vectorB[productId]) {
      return acc + (vectorA[productId] * vectorB[productId]);
    } else {
      return acc;
    }
  }, 0);

  const magnitudeA = Math.sqrt(Object.values(vectorA).reduce((acc, val) => acc + val ** 2, 0));
  const magnitudeB = Math.sqrt(Object.values(vectorB).reduce((acc, val) => acc + val ** 2, 0));

  if (magnitudeA === 0 || magnitudeB === 0) return 0; // Handle division by zero

  return dotProduct / (magnitudeA * magnitudeB);
};

// Function to convert user order history into a vector
const getUserOrderVector = (userOrders) => {
  const vector = {};
  userOrders.forEach(order => {
    order.orderItems.forEach(item => {
      if (item.product) { // Add null check for product
        const productId = item.product.toString();
        vector[productId] = vector[productId] ? vector[productId] + item.quantity : item.quantity;
      }
    });
  });
  return vector;
};

// Function to recommend products based on cosine similarity
exports.recommendProducts = async (userId) => {
  try {
    const userOrders = await Order.find({ user: userId }).populate('orderItems.product');
    const userVector = getUserOrderVector(userOrders);

    const otherUsersOrders = await Order.find({ user: { $ne: userId } }).populate('orderItems.product');

    const recommendations = recommendProducts(userVector, otherUsersOrders);
    
    // Remove duplicate users and sort by similarity score
    const uniqueRecommendations = removeDuplicatesAndSort(recommendations);
    return uniqueRecommendations;
  } catch (error) {
    console.error(error);
    throw new Error('Error in recommending products');
  }
};
// Function to recommend products and include product details
const recommendProducts = (userVector, otherUsersOrders) => {
  const recommendations = [];
  otherUsersOrders.forEach(order => {
    const otherUserVector = getUserOrderVector([order]);
    const similarity = cosineSimilarity(userVector, otherUserVector);
    // Include product information along with user and similarity
    order.orderItems.forEach(item => {
      if (item.product) { // Check for null product
        recommendations.push({ 
          user: order.user, 
          
          product: item.product // Include product details
        });
      }
    });
  });
  return recommendations;
};
// Function to remove duplicate users and sort recommendations by similarity score
const removeDuplicatesAndSort = (recommendations) => {
  const uniqueUsers = new Map();
  recommendations.forEach(recommendation => {
    const userId = recommendation.user.toString();
    if (!uniqueUsers.has(userId) || recommendation.similarity > uniqueUsers.get(userId).similarity) {
      uniqueUsers.set(userId, recommendation);
    }
  });
  const sortedRecommendations = Array.from(uniqueUsers.values()).sort((a, b) => b.similarity - a.similarity);
  return sortedRecommendations;
};


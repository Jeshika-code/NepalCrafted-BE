// // collaborativeFiltering.js

// // Function to calculate cosine similarity between two items
// function calculateCosineSimilarity(item1, item2) {
//     const keys = Object.keys(item1);
//     let dotProduct = 0;
//     let magnitude1 = 0;
//     let magnitude2 = 0;
  
//     for (const key of keys) {
//       if (item2.hasOwnProperty(key)) {
//         dotProduct += item1[key] * item2[key];
//         magnitude1 += Math.pow(item1[key], 2);
//         magnitude2 += Math.pow(item2[key], 2);
//       }
//     }
  
//     const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
//     return similarity || 0; // Handle division by zero
//   }
  
//   // Function to generate item-item similarity matrix
//   function generateSimilarityMatrix(data) {
//     const items = Object.keys(data);
//     const similarityMatrix = {};
  
//     // for (const item1 of items) {
//     //   similarityMatrix[item1] = {};
  
//     //   for (const item2 of items) {
//     //     if (item1 !== item2) {
//     //       const similarity = calculateCosineSimilarity(data[item1], data[item2]);
//     //       similarityMatrix[item1][item2] = similarity;
//     //     }
//     //   }
//     // }
  
//     return similarityMatrix;
//   }
  
//   // Function to recommend items for a given user
//   function recommendItems(user, data, similarityMatrix) {
//     const userItems = data[user];
//     const items = Object.keys(userItems);
//     let recommendations = {};
  
//     // for (const item of items) {
//     //   const itemSimilarities = similarityMatrix[item];
  
//     //   for (const similarItem in itemSimilarities) {
//     //     if (!userItems.hasOwnProperty(similarItem)) {
//     //       if (!recommendations.hasOwnProperty(similarItem)) {
//     //         recommendations[similarItem] = 0;
//     //       }
  
//     //       recommendations[similarItem] +=
//     //         itemSimilarities[similarItem] * userItems[item];
//     //     }
//     //   }
//     // }
  
//     recommendations = Object.entries(recommendations)
//       .sort((a, b) => b[1] - a[1]) // Sort by recommendation score
//       .reduce((obj, [item, score]) => ((obj[item] = score), obj), {});
  
//     return recommendations;
//   }
  
//   module.exports = {
//     calculateCosineSimilarity,
//     generateSimilarityMatrix,
//     recommendItems,
//   };
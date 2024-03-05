// utils/cosineSimilarity.js

const calculateCosineSimilarity = (vectorA, vectorB) => {
    // Calculate dot product
    let dotProduct = 0;
    for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i].rating * vectorB[i].rating;
    }
  
    // Calculate magnitudes
    const magnitudeA = Math.sqrt(vectorA.reduce((acc, curr) => acc + curr.rating ** 2, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((acc, curr) => acc + curr.rating ** 2, 0));
  
    // Calculate cosine similarity
    const cosineSimilarity = dotProduct / (magnitudeA * magnitudeB);
  
    return cosineSimilarity;
  };
  
  module.exports = { calculateCosineSimilarity };
  
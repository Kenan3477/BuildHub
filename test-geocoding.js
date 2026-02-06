
// Test Bournemouth geocoding
const geocodeTest = async (postcode) => {
  const areaCoords = {
    'BH': { lat: 50.7192, lng: -1.8808 }, // Bournemouth area
  };
  const postcodePrefix = postcode.split(' ')[0];
  return areaCoords[postcodePrefix] || { lat: 51.5074, lng: -0.1278 };
};

console.log('BH1 1AA:', await geocodeTest('BH1 1AA'));
console.log('BH7 6PQ:', await geocodeTest('BH7 6PQ'));


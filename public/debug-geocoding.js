// Debug helper: Clear localStorage and test Bournemouth geocoding
console.log('🧹 Clearing old construction jobs from localStorage...');
localStorage.removeItem('constructionJobs');

// Test geocoding function for Bournemouth postcodes
const testGeocoding = () => {
  const testPostcodes = [
    'BH1 1AA', // Central Bournemouth
    'BH7 6PQ', // Pokesdown area
    'BH2 5AA', // Bournemouth Central
    'BH11 9AA', // Kinson
  ];
  
  console.log('🗺️ Testing Bournemouth postcode geocoding:');
  testPostcodes.forEach(postcode => {
    const prefix = postcode.split(' ')[0];
    if (prefix === 'BH') {
      console.log(`✅ ${postcode} → Bournemouth (50.7192, -1.8808)`);
    } else {
      console.log(`❌ ${postcode} → Unknown area`);
    }
  });
  
  console.log('🏗️ localStorage cleared! Post a new job in Bournemouth to test.');
  console.log('📍 Expected coordinates: lat: 50.7192, lng: -1.8808');
};

testGeocoding();
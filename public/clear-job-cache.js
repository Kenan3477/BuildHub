// Clear cached jobs and reset with correct coordinates
console.log('🧹 Clearing old cached jobs from localStorage...');

// Clear the old jobs
localStorage.removeItem('constructionJobs');

console.log('✅ Cache cleared! Refresh the page to see jobs with correct coordinates.');
console.log('🗺️ The Kitchen Renovation job should now appear in Bournemouth (BH2 5AU), not Manchester.');
console.log('📍 Expected coordinates: Bournemouth East Cliff (50.7156, -1.8745)');

// Force page refresh to reload sample data
if (confirm('Clear cache and refresh page to fix job locations?')) {
  window.location.reload();
}
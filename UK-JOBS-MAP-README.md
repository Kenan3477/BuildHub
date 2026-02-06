# UK Construction Jobs Interactive Map

A React-based interactive mapping solution using Leaflet.js and OpenStreetMap for displaying construction job opportunities across the United Kingdom.

## 🗺️ Features

- **Interactive Map**: Zoomable and pannable UK map with job markers
- **Real-time Job Filtering**: Filter by job type (Residential, Commercial, Infrastructure)
- **Custom Markers**: Color-coded markers by job type with urgent job indicators
- **Click-to-View Details**: Click markers to view detailed job information
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Job Sidebar**: Detailed job listings with market overview statistics

## 🚀 Technical Implementation

### Core Technologies
- **React 18** with TypeScript
- **Leaflet.js** for mapping functionality
- **react-leaflet** for React integration
- **OpenStreetMap** tiles (free, no API key required)
- **Next.js 14** with dynamic imports for SSR compatibility

### Key Components
- `UKJobsMap.tsx`: Interactive map component with job markers
- `page.tsx`: Main jobs page with filters and job listings
- Dynamic loading to prevent SSR issues with Leaflet

## 📍 Job Data Structure

The system expects job data in this format:

```typescript
interface Job {
  id: number;
  title: string;
  type: "Residential" | "Commercial" | "Infrastructure";
  lat: number;        // Latitude coordinate
  lng: number;        // Longitude coordinate  
  location: string;   // Human-readable location
  budget: string;     // Budget with currency symbol
  urgent: boolean;    // Priority flag
  timePosted: string; // Human-readable time
  description: string;
}
```

### Example Job Entry
```typescript
{
  id: 1,
  title: "Site Manager - Commercial Development",
  type: "Commercial",
  lat: 51.5074,  // London coordinates
  lng: -0.1278,
  location: "London, SW1A 1AA",
  budget: "£65,000",
  urgent: false,
  timePosted: "2 days ago",
  description: "Lead site management for major office development."
}
```

## 🔧 Integration with Real Data

### Step 1: Replace Mock Data
Replace the `constructionJobs` array in `page.tsx` with your API call:

```typescript
// Replace this mock data
const constructionJobs = [...];

// With API integration
const [constructionJobs, setConstructionJobs] = useState<Job[]>([]);

useEffect(() => {
  async function fetchJobs() {
    const response = await fetch('/api/jobs');
    const jobs = await response.json();
    setConstructionJobs(jobs);
  }
  fetchJobs();
}, []);
```

### Step 2: Add Loading States
```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// In your fetch function
try {
  setLoading(true);
  const jobs = await response.json();
  setConstructionJobs(jobs);
} catch (err) {
  setError('Failed to load jobs');
} finally {
  setLoading(false);
}
```

### Step 3: Coordinate Conversion
If you have addresses instead of coordinates, use a geocoding service:

```typescript
// Example with a geocoding API
async function geocodeAddress(address: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  );
  const results = await response.json();
  if (results.length > 0) {
    return {
      lat: parseFloat(results[0].lat),
      lng: parseFloat(results[0].lon)
    };
  }
  return null;
}
```

## 🎨 Customization Options

### Marker Colors
Customize job type colors in the `jobTypeColors` object:

```typescript
const jobTypeColors = {
  'Residential': '#22c55e',    // Green
  'Commercial': '#3b82f6',     // Blue  
  'Infrastructure': '#f59e0b', // Orange
  'Emergency': '#ef4444'       // Red (for urgent jobs)
};
```

### Map Configuration
Adjust map settings in `UKJobsMap.tsx`:

```typescript
// Map center and zoom
const ukCenter: [number, number] = [54.5, -2.0];
const defaultZoom = 6;

// UK bounding box
const ukBounds: [[number, number], [number, number]] = [
  [49.8, -8.5], // Southwest corner
  [60.9, 2.0]   // Northeast corner
];
```

### Add Clustering (Optional)
For large datasets, install and configure marker clustering:

```bash
npm install react-leaflet-cluster
```

```typescript
import MarkerClusterGroup from 'react-leaflet-cluster';

// Wrap markers in cluster group
<MarkerClusterGroup>
  {jobs.map(job => (
    <Marker key={job.id} {...markerProps} />
  ))}
</MarkerClusterGroup>
```

## 🌐 API Endpoints

Suggested API structure for job management:

```
GET  /api/jobs           - Fetch all jobs
GET  /api/jobs?type=X    - Filter by job type  
GET  /api/jobs/:id       - Get specific job
POST /api/jobs           - Create new job
PUT  /api/jobs/:id       - Update job
DELETE /api/jobs/:id     - Delete job
```

## 📱 Mobile Optimization

The map is mobile-responsive with:
- Touch-friendly zoom controls
- Responsive grid layout
- Optimized marker sizes for touch
- Mobile-friendly popups

## 🔍 Search & Filtering

Current filters available:
- Job type (All, Residential, Commercial, Infrastructure)

Easy to extend with:
- Location-based search
- Budget range filters
- Date posted filters
- Urgent jobs only

## 🎯 Performance Considerations

- **Dynamic imports** prevent Leaflet SSR issues
- **Marker clustering** for large datasets (optional)
- **Lazy loading** of job details
- **Optimized re-renders** with React.memo

## 📄 License

This implementation uses:
- OpenStreetMap (Open Database License)
- Leaflet.js (BSD-2-Clause License)
- No API keys required for basic functionality

## 🚀 Getting Started

1. Install dependencies: `npm install leaflet react-leaflet @types/leaflet`
2. Copy the component files to your project
3. Replace mock data with your API integration
4. Customize colors and styling as needed
5. Deploy and enjoy your interactive job map!

## 💡 Next Steps

- Add real-time job updates with WebSockets
- Implement job application workflow
- Add detailed job filtering
- Include company information and ratings
- Add map-based job search radius
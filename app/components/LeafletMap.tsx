import { useEffect, useState } from 'react';

interface LeafletMapProps {
  lat: number;
  lng: number;
  zoom: number;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let MapContainer: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let TileLayer: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Marker: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Popup: any;

export default function LeafletMap({ lat, lng, zoom, name }: LeafletMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Only load map components on the client side
    void Promise.all([
      import('react-leaflet'),
      import('leaflet'),
      import('leaflet/dist/leaflet.css')
    ]).then(([reactLeaflet, L]) => {
      // Store components in module scope
      MapContainer = reactLeaflet.MapContainer;
      TileLayer = reactLeaflet.TileLayer;
      Marker = reactLeaflet.Marker;
      Popup = reactLeaflet.Popup;
      
      // Fix for default marker icon
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      setIsLoaded(true);
    }).catch((error) => {
      console.error('Failed to load map:', error);
    });
  }, []);

  // Always render the same placeholder on server and first client render
  // to avoid hydration mismatch
  if (!isMounted || !isLoaded) {
    return (
      <div 
        className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600"
        suppressHydrationWarning
      >
        Loading map...
      </div>
    );
  }

  return (
    <div suppressHydrationWarning style={{ width: '100%', height: '100%' }}>
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

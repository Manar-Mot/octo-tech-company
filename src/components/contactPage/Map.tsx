import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTranslations } from 'next-intl';

const customIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const FlyToButton: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap();
  const t = useTranslations('contact');

  const handleClick = () => {
    map.flyTo(position, 15); 
  };

  return (
    <button onClick={handleClick} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 800 }} className='bg-accent text-white p-1 rounded-md'>
      {t('goToPosition')}
    </button>
  );
};

const MapComponent: React.FC = () => {
  const t = useTranslations();
  const initialPosition: [number, number] = [35.9312, 36.6372]; 

  return (
    <div style={{ position: 'relative', height: '500px' }} className='rounded-md shadow-md w-full'>
      <MapContainer center={initialPosition} zoom={10} style={{ width: '100%', height: '100%' }} className='rounded-md'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={initialPosition} icon={customIcon}>
          <Popup>
            {t('popupMessage')}
          </Popup>
        </Marker>
        <FlyToButton position={initialPosition} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;

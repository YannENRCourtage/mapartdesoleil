import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { allProjects as projects } from '@/data/projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

// Icônes Leaflet (utiliser les assets par défaut de Leaflet)
const markerIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const ProjectMap = () => {
  const [selectedProjectId, setSelectedProjectId] = useState('all');

  // Centre de la France
  const defaultCenter = [46.603354, 1.888334];

  const cities = useMemo(() => {
    const set = new Set();
    for (const p of projects) {
      const city = p.location?.city || p.location || 'Autre';
      set.add(city);
    }
    return ['Toutes les villes', ...Array.from(set)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedProjectId === 'all') return projects;
    if (selectedProjectId.startsWith('city:')) {
      const cityName = selectedProjectId.replace('city:', '');
      return projects.filter((p) => (p.location?.city || p.location) === cityName);
    }
    const id = parseInt(selectedProjectId, 10);
    return projects.filter((p) => p.id === id);
  }, [selectedProjectId]);

  // Calcule un centre “moyen” sur les projets filtrés pour recentrer la carte
  const mapCenter = useMemo(() => {
    if (!filteredProjects.length) return defaultCenter;
    const valid = filteredProjects.filter(p => p.latitude && p.longitude);
    if (!valid.length) return defaultCenter;
    const avgLat = valid.reduce((s, p) => s + p.latitude, 0) / valid.length;
    const avgLng = valid.reduce((s, p) => s + p.longitude, 0) / valid.length;
    return [avgLat, avgLng];
  }, [filteredProjects]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <CardTitle>Carte des projets</CardTitle>

        <div className="flex gap-2">
          {/* Filtre par projet */}
          <Select
            value={selectedProjectId}
            onValueChange={(v) => setSelectedProjectId(v)}
          >
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filtrer par projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les projets</SelectItem>
              {projects.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filtre par ville */}
          <Select
            value={
              selectedProjectId.startsWith('city:') ? selectedProjectId : 'city:Toutes les villes'
            }
            onValueChange={(v) => setSelectedProjectId(v)}
          >
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filtrer par ville" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c} value={`city:${c}`}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="h-[520px] w-full rounded-b-lg overflow-hidden">
          <MapContainer
            center={mapCenter}
            zoom={filteredProjects.length === 1 ? 11 : 6}
            scrollWheelZoom
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {filteredProjects.map((project) => {
              const { latitude, longitude } = project;
              if (!latitude || !longitude) return null;
              return (
                <Marker
                  key={project.id}
                  position={[latitude, longitude]}
                  icon={markerIcon}
                >
                  <Popup>
                    <div className="text-foreground">
                      <div className="font-semibold text-primary">{project.name}</div>
                      <div className="text-sm">{project.location || 'Localisation'}</div>
                      <div className="text-xs mt-1">
                        Puissance : <strong>{project.power ?? project.capacity ?? '—'} kWc</strong>
                      </div>
                      <Button asChild size="sm" className="mt-2 w-full">
                        <Link to={`/projet/${project.id}`}>En savoir plus</Link>
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectMap;
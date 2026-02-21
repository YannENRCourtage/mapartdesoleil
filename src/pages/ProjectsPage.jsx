import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { allProjects as initialProjects } from '@/data/projects';
import { MapContainer, TileLayer, Marker, Circle, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useToast } from '@/components/ui/use-toast';
import { Link, useLocation } from 'react-router-dom';

// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ProjectIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjRkY3RjAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtbWFwLXBpbiI+PHBhdGggZD0iTTIwIDEwYzAgNC45OTMtNS41MyAxMC4zNS03LjUgMTIuMDU3YS40NTIuNDUyIDAgMCAxLS42IDBDOS41MyAyMC4zNSA0IDE0Ljk5MyA0IDEwYTYgNiAwIDAgMSAxMiAwWiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiLz48L3N2Zz4=',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [mapCenter, setMapCenter] = useState([46.603354, 1.888334]); // Center of France
  const [mapZoom, setMapZoom] = useState(6);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem('projects_data_v2');
      setProjects(storedProjects ? JSON.parse(storedProjects) : initialProjects);
    } catch (e) {
      console.error("Failed to load projects from localStorage:", e);
      setProjects(initialProjects);
    }
  }, []);

  const handleProjectClick = (project) => {
    setMapCenter([project.latitude, project.longitude]);
    setMapZoom(10);
    toast({
      title: project.name,
      description: `Localisation: ${project.location}`,
      variant: "default",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Nos Projets - Ma part de soleil</title>
        <meta name="description" content="Découvrez tous les projets d'autoconsommation collective de Ma part de soleil et rejoignez la transition énergétique." />
      </Helmet>


      <section className="py-20 bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#60a5fa] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Nos Projets Solaires
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explorez nos initiatives locales et trouvez le projet qui vous correspond.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project List */}
            <div className="lg:order-2">
              <motion.h2
                className="text-3xl font-bold text-gray-800 mb-8 text-center lg:text-left"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Découvrez nos projets
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleProjectClick(project)}
                    className="cursor-pointer"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <motion.div
              className="lg:order-1 bg-white rounded-lg shadow-lg overflow-hidden h-[500px] sticky top-20"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full">
                <MapUpdater center={mapCenter} zoom={mapZoom} />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {projects.map((project) => {
                  if (!project.latitude || !project.longitude) return null;
                  return (
                    <Marker key={project.id} position={[project.latitude, project.longitude]} icon={ProjectIcon} title="">
                      <Circle
                        center={[project.latitude, project.longitude]}
                        radius={(project.eligibilityDistance || 0) * 1000} // Convert km to meters
                        color="#FF7F00"
                        fillColor="#FF7F00"
                        fillOpacity={0.2}
                        weight={2}
                      />
                      <Popup>
                        <Link to={`/projet/${project.id}`} className="font-bold text-[#FF7F00] hover:underline">
                          {project.name}
                        </Link>
                        <br />
                        {project.location}
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectsPage;
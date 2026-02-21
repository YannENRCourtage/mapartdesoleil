import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { allProjects as initialProjects } from '@/data/projects';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import projectPlaceholder from '@/assets/project-placeholder.png';
import { Share2, FileText, Download } from 'lucide-react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const SunIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjdmMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zdW4iPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjQiLz48cGF0aCBkPSJNMTIgMnYyIi8+PHBhdGggZD0iTTEyIDIwdi0yIi8+PHBhdGggZD0iTTQgMTJoLTiiLz48cGF0aCBkPSJNMjAgMTJoMiIvPjxwYXRoIGQ9Ik02LjM0IDYuMzRsLTEuNDItMS40MiIvPjxwYXRoIGQ9Ik0xOC4wNiAxOC4wNmwxLjQyIDEuNDIiLz48cGF0aCBkPSJNNi4zNCAxNy42NmwtMS40MiAxLjQyIi8+PHBhdGggZD0iTTE4LjA2IDYuMzRsMS40Mi0xLjQyIi8+PC9zdmc+',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState(null);
  const [documents] = useState([
    { id: 'doc1', name: 'Contrat d\'autoconsommation', url: '#' },
    { id: 'doc2', name: 'Mandat de prélèvement SEPA', url: '#' },
    { id: 'doc3', name: 'Règlement de service', url: '#' },
  ]);

  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem('projects_data_v2');
      const projectsToUse = storedProjects ? JSON.parse(storedProjects) : initialProjects;
      const foundProject = projectsToUse.find((p) => p.id === projectId);
      if (foundProject) {
        setProject(foundProject);
      } else {
        navigate('/404');
      }
    } catch (e) {
      console.error("Failed to load project from localStorage:", e);
      navigate('/404');
    }
  }, [projectId, navigate]);

  const handleAdhesionClick = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        navigate(`/adhesion/${projectId}`);
      } else {
        toast({
          title: "Connexion requise",
          description: "Veuillez vous connecter pour adhérer à un projet.",
          variant: "warning",
        });
        navigate('/connexion');
      }
    } catch (e) {
      console.error("Failed to check user authentication:", e);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue.",
        variant: "destructive",
      });
    }
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Lien copié !",
        description: "Le lien du projet a été copié dans votre presse-papiers.",
        variant: "success",
      });
    }).catch(() => {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien.",
        variant: "destructive",
      });
    });
  };

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Chargement du projet...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>{project.name} - Ma part de soleil</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <section className="relative py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.img
            src={project.imageUrl || projectPlaceholder}
            alt={`Image du projet ${project.name}`}
            className="w-full h-[450px] object-cover rounded-2xl shadow-2xl mb-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.9] }}
          />

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3 space-y-8">
              <motion.h1
                className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {project.name}
              </motion.h1>

              <motion.div
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">À propos du projet</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <p className="text-sm text-gray-500">Puissance installée</p>
                  <p className="text-xl font-bold text-gray-800">{project.power} kWc</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <p className="text-sm text-gray-500">Production annuelle</p>
                  <p className="text-xl font-bold text-gray-800">{project.annualProduction} MWh/an</p>
                </div>
                {project.participants > 0 && (
                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="text-xl font-bold text-gray-800">{project.participants} / {project.maxParticipants}</p>
                  </div>
                )}
                {project.eligibilityDistance > 0 && (
                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <p className="text-sm text-gray-500">Éligibilité</p>
                    <p className="text-xl font-bold text-gray-800">{project.eligibilityDistance} km</p>
                  </div>
                )}
              </motion.div>

              {(project.latitude && project.longitude && project.eligibilityDistance > 0) && (
                <motion.div
                  className="bg-white p-8 rounded-xl shadow-lg h-[400px] overflow-hidden"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Zone d'éligibilité</h2>
                  <MapContainer center={[project.latitude, project.longitude]} zoom={13} className="h-full w-full rounded-lg">
                    <MapUpdater center={[project.latitude, project.longitude]} zoom={11} />
                    <TileLayer
                      url="https://wxs.ign.fr/choisirgeoportail/geoportail/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&STYLE=normal&FORMAT=image/jpeg&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}"
                      attribution='&copy; <a href="https://www.ign.fr/">IGN</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <Marker position={[project.latitude, project.longitude]} icon={SunIcon}></Marker>
                    <Circle
                      center={[project.latitude, project.longitude]}
                      radius={project.eligibilityDistance * 1000}
                      color="#FF7F00"
                      fillColor="#FFC800"
                      fillOpacity={0.3}
                      weight={2}
                    />
                  </MapContainer>
                </motion.div>
              )}

            </div>

            <div className="lg:w-1/3 space-y-6 lg:sticky top-24 self-start">
              {project.consumerTariff > 0 && (
                <motion.div
                  className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-xl shadow-lg text-white"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <h2 className="text-xl font-bold mb-2">Tarif Consommateur</h2>
                  <p className="text-4xl font-extrabold">{project.consumerTariff}€ <span className="text-2xl font-normal">/kWh</span></p>
                  <p className="text-sm opacity-90 mt-2">Un tarif juste et stable pour une énergie locale.</p>
                </motion.div>
              )}

              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Prêt à nous rejoindre ?</h2>
                <Button
                  onClick={handleAdhesionClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-md shadow-md transform hover:scale-105 transition-transform duration-300 mb-4"
                >
                  Adhérer au projet
                </Button>
                <Button
                  onClick={handleShareClick}
                  variant="outline"
                  className="w-full text-gray-700 border-gray-300 hover:bg-gray-100 py-3 rounded-md shadow-sm"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager ce projet
                </Button>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Documents du projet</h2>
                <ul className="space-y-3">
                  {documents.map((doc) => (
                    <li key={doc.id}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline flex items-center justify-between group">
                        <span className="flex items-center">
                          <FileText className="h-5 w-5 mr-3 text-gray-400" />
                          {doc.name}
                        </span>
                        <Download className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetailPage;
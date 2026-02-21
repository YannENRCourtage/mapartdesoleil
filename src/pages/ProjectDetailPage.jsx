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

      <section className="relative py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tariff Header Inset */}
          <motion.div
            className="mb-12 p-8 bg-white border-2 border-green-500 rounded-2xl shadow-sm text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-1">Tarif Consommateur</p>
            <p className="text-4xl md:text-5xl font-black text-black">{project.consumerTariff}€ <span className="text-xl md:text-2xl font-normal text-gray-600">/kWh</span></p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 items-start mb-12">
            {/* Top Row Left: Framed Image */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white p-3 rounded-2xl shadow-xl border border-gray-200">
                <motion.img
                  src={project.imageUrl || projectPlaceholder}
                  alt={`Image du projet ${project.name}`}
                  className="w-full h-[450px] object-cover rounded-xl"
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>

            {/* Top Row Right: 4-item Detail Grid */}
            <div className="w-full lg:w-1/3 grid grid-cols-2 gap-4 h-full">
              {[
                { label: 'Localisation', value: `${project.city || ''}`, sub: project.postalCode },
                { label: 'Puissance', value: `${project.power}`, unit: 'kWc' },
                { label: 'Surface', value: `${project.surface || '—'}`, unit: 'm²' },
                { label: 'Production', value: `${project.annualProduction}`, unit: 'MWh/an' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-center items-center text-center hover:border-orange-200 transition-colors"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <p className="text-[10px] text-gray-400 uppercase font-black mb-2 tracking-widest">{item.label}</p>
                  <p className="text-xl font-black text-gray-900 leading-tight">
                    {item.value} {item.unit && <span className="text-xs font-bold text-gray-400">{item.unit}</span>}
                    {item.sub && <><br /><span className="text-sm font-bold text-gray-400">{item.sub}</span></>}
                  </p>
                </motion.div>
              ))}

              {/* Map/Zone (Span 2) */}
              {(project.latitude && project.longitude && project.eligibilityDistance > 0) && (
                <motion.div
                  className="col-span-2 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 h-[210px] overflow-hidden"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <MapContainer center={[project.latitude, project.longitude]} zoom={10} className="h-full w-full rounded-xl">
                    <MapUpdater center={[project.latitude, project.longitude]} zoom={10} />
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[project.latitude, project.longitude]} icon={ProjectIcon} title=""></Marker>
                    <Circle
                      center={[project.latitude, project.longitude]}
                      radius={project.eligibilityDistance * 1000}
                      color="#FF7F00"
                      fillColor="#FFC800"
                      fillOpacity={0.2}
                      weight={1}
                    />
                  </MapContainer>
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Bottom Row Left: Title & Description */}
            <div className="lg:w-2/3">
              <motion.h1
                className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {project.name}
              </motion.h1>

              <motion.div
                className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center">
                  <span className="w-8 h-1 bg-orange-500 mr-4 rounded-full"></span>
                  À propos du projet
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium">
                  {project.description}
                </div>
              </motion.div>
            </div>

            {/* Bottom Row Right: Adhesion & Documents */}
            <div className="lg:w-1/3 space-y-6">
              <motion.div
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h2 className="text-xl font-black text-gray-800 mb-6">Prêt à nous rejoindre ?</h2>
                <Button
                  onClick={handleAdhesionClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-all duration-300 mb-4 font-bold"
                >
                  Adhérer au projet
                </Button>
                <Button
                  onClick={handleShareClick}
                  variant="outline"
                  className="w-full text-gray-600 border-gray-200 hover:bg-gray-50 py-6 rounded-2xl shadow-sm font-bold flex items-center justify-center transition-all"
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Partager ce projet
                </Button>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center justify-between">
                  Documents
                  <FileText className="h-5 w-5 text-gray-400" />
                </h2>
                <ul className="space-y-4">
                  {documents.map((doc) => (
                    <li key={doc.id}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:border-orange-100 hover:bg-orange-50/30 transition-all group">
                        <span className="font-bold text-gray-700 group-hover:text-orange-600 transition-colors">{doc.name}</span>
                        <Download className="h-5 w-5 text-gray-300 group-hover:text-orange-500 transition-all" />
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
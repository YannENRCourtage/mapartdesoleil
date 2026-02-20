import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Zap, Users, Sun } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const imageUrl = project.imageUrl && project.imageUrl.startsWith('/') ? project.imageUrl : '/images/project-placeholder.jpg';

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <Link to={`/projet/${project.id}`}>
        <img
          src={imageUrl}
          alt={`Image du projet ${project.name}`}
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = '/images/project-placeholder.jpg'; }}
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-gray-700 text-sm">
              <MapPin className="h-4 w-4 mr-1 text-[#FF7F00]" />
              {project.location}
            </div>
            <div className="text-lg font-bold text-[#FF7F00]">
              {project.consumerTariff} €/kWh
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
            <div className="flex items-center">
              <Zap className="h-4 w-4 mr-1 text-blue-500" />
              {project.power} kWc
            </div>
            <div className="flex items-center">
              <Sun className="h-4 w-4 mr-1 text-yellow-500" />
              {project.annualProduction} MWh/an
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-green-500" />
              {project.participants}/{project.maxParticipants} participants
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-purple-500" />
              {project.eligibilityDistance} km éligibilité
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, MapPin, Zap, Users, Calendar } from 'lucide-react';
import { allProjects } from '@/data/projects';
import projectPlaceholder from '@/assets/project-placeholder.png'; // Correct import path

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    status: 'En cours',
    description: '',
    participants: '',
    startDate: '',
    image: projectPlaceholder
  });
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem('projects_data');
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        setProjects(allProjects);
        localStorage.setItem('projects_data', JSON.stringify(allProjects));
      }
    } catch (e) {
      console.error("Failed to load projects:", e);
      setProjects(allProjects);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      if (isEditing && editingProject) {
        const updatedProjects = projects.map(p => 
          p.id === editingProject.id 
            ? { ...p, ...formData, capacity: parseFloat(formData.capacity), participants: parseInt(formData.participants) }
            : p
        );
        setProjects(updatedProjects);
        localStorage.setItem('projects_data', JSON.stringify(updatedProjects));
        toast({
          title: "Projet modifié",
          description: "Le projet a été mis à jour avec succès.",
          variant: "success",
        });
      } else {
        const newProject = {
          id: String(projects.length + 1),
          ...formData,
          capacity: parseFloat(formData.capacity),
          participants: parseInt(formData.participants),
          coordinates: [45.75, 4.85] // Default coordinates
        };
        const updatedProjects = [...projects, newProject];
        setProjects(updatedProjects);
        localStorage.setItem('projects_data', JSON.stringify(updatedProjects));
        toast({
          title: "Projet créé",
          description: "Le nouveau projet a été ajouté avec succès.",
          variant: "success",
        });
      }
      
      resetForm();
    } catch (e) {
      console.error("Failed to save project:", e);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le projet.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setEditingProject(project);
    setFormData({
      name: project.name,
      location: project.location,
      capacity: String(project.capacity),
      status: project.status,
      description: project.description,
      participants: String(project.participants),
      startDate: project.startDate || '',
      image: project.image || projectPlaceholder
    });
  };

  const handleDelete = (projectId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        const updatedProjects = projects.filter(p => p.id !== projectId);
        setProjects(updatedProjects);
        localStorage.setItem('projects_data', JSON.stringify(updatedProjects));
        toast({
          title: "Projet supprimé",
          description: "Le projet a été supprimé avec succès.",
          variant: "success",
        });
      } catch (e) {
        console.error("Failed to delete project:", e);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le projet.",
          variant: "destructive",
        });
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingProject(null);
    setFormData({
      name: '',
      location: '',
      capacity: '',
      status: 'En cours',
      description: '',
      participants: '',
      startDate: '',
      image: projectPlaceholder
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En cours':
        return 'bg-green-100 text-green-800';
      case 'Terminé':
        return 'bg-blue-100 text-blue-800';
      case 'Planifié':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <Helmet>
        <title>Gestion des projets - Admin - Ma part de soleil</title>
        <meta name="description" content="Gérez les projets solaires de la plateforme." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des projets</h1>
          <p className="text-gray-600">Créez et gérez les projets solaires</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Modifier le projet' : 'Créer un nouveau projet'}</CardTitle>
              <CardDescription>
                {isEditing ? 'Modifiez les informations du projet' : 'Ajoutez un nouveau projet solaire à la plateforme'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom du projet *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: Centrale Solaire Lyon Sud"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Localisation *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Ex: Lyon, Rhône-Alpes"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacité (kWc) *</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      step="0.1"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="Ex: 250"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="participants">Nombre de participants</Label>
                    <Input
                      id="participants"
                      name="participants"
                      type="number"
                      value={formData.participants}
                      onChange={handleInputChange}
                      placeholder="Ex: 45"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Statut *</Label>
                    <Select value={formData.status} onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="En cours">En cours</SelectItem>
                        <SelectItem value="Terminé">Terminé</SelectItem>
                        <SelectItem value="Planifié">Planifié</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="startDate">Date de début</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Décrivez le projet..."
                    rows={4}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="bg-[#FF7F00] hover:bg-[#E67300]">
                    <Plus className="mr-2 h-4 w-4" />
                    {isEditing ? 'Mettre à jour' : 'Créer le projet'}
                  </Button>
                  {isEditing && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Annuler
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Projects List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Liste des projets ({projects.length})</CardTitle>
              <CardDescription>Tous les projets solaires de la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4" />
                          {project.capacity} kWc
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {project.participants || 0} participants
                        </div>
                        {project.startDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {project.startDate}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{project.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminProjectsPage;
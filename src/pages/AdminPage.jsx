import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
  Users, FolderOpen, Download, Settings, Search, Filter,
  Plus, Edit, Trash2, Check, X, Eye, FileSpreadsheet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import { users as mockUsers } from '@/data/mockData';
import { allProjects as mockProjects } from '@/data/projects';
import { useToast } from '@/components/ui/use-toast';

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const handleAction = (action, item = null) => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée",
      description: "Mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
    });
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Actif':
        return 'bg-green-100 text-green-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Suspendu':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectStatusColor = (status) => {
    switch (status) {
      case 'En cours':
        return 'bg-green-100 text-green-800';
      case 'En développement':
        return 'bg-blue-100 text-blue-800';
      case 'Ouvert':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>Administration - Ma part de soleil</title>
        <meta name="description" content="Interface d'administration pour gérer les utilisateurs, projets et paramètres de la plateforme Ma part de soleil." />
        <meta property="og:title" content="Administration - Ma part de soleil" />
        <meta property="og:description" content="Interface d'administration pour gérer les utilisateurs, projets et paramètres de la plateforme Ma part de soleil." />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Administration
            </h1>
            <p className="text-xl text-gray-600">
              Gestion de la plateforme Ma part de soleil
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-4 gap-6 mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                    <p className="text-2xl font-bold text-gray-900">{mockUsers.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Projets</p>
                    <p className="text-2xl font-bold text-gray-900">{mockProjects.length}</p>
                  </div>
                  <FolderOpen className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total investi</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(mockUsers.reduce((sum, user) => sum + user.totalInvestment, 0) / 1000)}k€
                    </p>
                  </div>
                  <FileSpreadsheet className="w-8 h-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">En attente</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockUsers.filter(u => u.status === 'En attente').length}
                    </p>
                  </div>
                  <Settings className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                <TabsTrigger value="projects">Projets</TabsTrigger>
                <TabsTrigger value="exports">Exports</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="mt-6">
                <div className="space-y-6">
                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Rechercher un utilisateur..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-48">
                          <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les statuts</SelectItem>
                          <SelectItem value="Actif">Actif</SelectItem>
                          <SelectItem value="En attente">En attente</SelectItem>
                          <SelectItem value="Suspendu">Suspendu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => handleAction('export-users')}>
                        <Download className="w-4 h-4 mr-2" />
                        Exporter XLS
                      </Button>
                      <Button onClick={() => handleAction('add-user')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>
                  </div>

                  {/* Users Table */}
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Utilisateur</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Ville</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Investissement</TableHead>
                            <TableHead>Inscription</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.slice(0, 10).map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{user.firstName} {user.lastName}</div>
                                  <div className="text-sm text-gray-500">ID: {user.id}</div>
                                </div>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.city}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(user.status)}>
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{user.totalInvestment.toLocaleString()}€</TableCell>
                              <TableCell>{new Date(user.registrationDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline" onClick={() => handleAction('view', user)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleAction('edit', user)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  {user.status === 'En attente' && (
                                    <>
                                      <Button size="sm" variant="outline" onClick={() => handleAction('approve', user)}>
                                        <Check className="w-4 h-4 text-green-600" />
                                      </Button>
                                      <Button size="sm" variant="outline" onClick={() => handleAction('reject', user)}>
                                        <X className="w-4 h-4 text-red-600" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <div className="text-sm text-gray-500">
                    Affichage de 10 sur {filteredUsers.length} utilisateurs
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <div className="space-y-6">
                  {/* Project Filters */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Rechercher un projet..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => handleAction('export-projects')}>
                        <Download className="w-4 h-4 mr-2" />
                        Exporter XLS
                      </Button>
                      <Button onClick={() => handleAction('add-project')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau projet
                      </Button>
                    </div>
                  </div>

                  {/* Projects Table */}
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Projet</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Localisation</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Participants</TableHead>
                            <TableHead>Financement</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProjects.slice(0, 10).map((project) => (
                            <TableRow key={project.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{project.name}</div>
                                  <div className="text-sm text-gray-500">{project.capacity} kWc</div>
                                </div>
                              </TableCell>
                              <TableCell>{project.type}</TableCell>
                              <TableCell>{project.location}</TableCell>
                              <TableCell>
                                <Badge className={getProjectStatusColor(project.status)}>
                                  {project.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{project.participants}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="text-sm">
                                    {Math.round((project.currentFunding / project.targetFunding) * 100)}%
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {project.currentFunding.toLocaleString()}€ / {project.targetFunding.toLocaleString()}€
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline" onClick={() => handleAction('view-project', project)}>
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleAction('edit-project', project)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleAction('delete-project', project)}>
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="exports" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Exports de données</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Export utilisateurs</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600">
                          Exportez la liste complète des utilisateurs avec leurs informations et investissements.
                        </p>
                        <Button onClick={() => handleAction('export-users')} className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger XLS
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Export projets</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600">
                          Exportez la liste des projets avec leurs détails techniques et financiers.
                        </p>
                        <Button onClick={() => handleAction('export-projects')} className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger XLS
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Données de consommation</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600">
                          Récupérez les données de consommation via l'API en utilisant les PDL/PRM.
                        </p>
                        <Button onClick={() => handleAction('fetch-consumption')} className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Récupérer données API
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Rapport global</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600">
                          Générez un rapport complet de la plateforme avec toutes les métriques.
                        </p>
                        <Button onClick={() => handleAction('global-report')} className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Générer rapport
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Paramètres de la plateforme</h2>

                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Configuration générale</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Nom de la plateforme</label>
                            <Input defaultValue="Ma part de soleil" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Domaine</label>
                            <Input defaultValue="mapartdesoleil.fr" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Email de contact</label>
                            <Input defaultValue="contact@mapartdesoleil.fr" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Téléphone</label>
                            <Input defaultValue="01 23 45 67 89" />
                          </div>
                        </div>
                        <Button onClick={() => handleAction('save-settings')}>
                          Sauvegarder
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>API et intégrations</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Clé API consommation</label>
                            <Input type="password" placeholder="••••••••••••••••" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">URL API consommation</label>
                            <Input defaultValue="https://api.enedis.fr/v1/" />
                          </div>
                        </div>
                        <Button onClick={() => handleAction('test-api')}>
                          Tester la connexion API
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Notifications email automatiques</span>
                            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Notifications SMS</span>
                            <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Alertes administrateur</span>
                            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Euro, Zap, Calendar, FileText, Bell, 
  Settings, Download, Eye, PieChart, BarChart3 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import { mockProjects, mockUsers } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

const DashboardPage = () => {
  const { toast } = useToast();
  
  // Simulation d'un utilisateur connecté
  const currentUser = mockUsers[0];
  const userProjects = currentUser.projects.map(up => ({
    ...mockProjects.find(p => p.id === up.projectId),
    userInvestment: up.investment,
    joinDate: up.joinDate
  }));

  const totalInvestment = currentUser.totalInvestment;
  const estimatedAnnualReturn = userProjects.reduce((sum, project) => 
    sum + (project.userInvestment * project.expectedReturn / 100), 0
  );

  const handleAction = (action) => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée",
      description: "Mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Tableau de bord - Ma part de soleil</title>
        <meta name="description" content="Gérez vos investissements dans l'énergie renouvelable, consultez vos documents et suivez vos rendements." />
        <meta property="og:title" content="Tableau de bord - Ma part de soleil" />
        <meta property="og:description" content="Gérez vos investissements dans l'énergie renouvelable, consultez vos documents et suivez vos rendements." />
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
              Bonjour {currentUser.firstName} !
            </h1>
            <p className="text-xl text-gray-600">
              Voici un aperçu de vos investissements énergétiques
            </p>
          </motion.div>

          {/* Key Metrics */}
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
                    <p className="text-sm font-medium text-gray-600">Total investi</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalInvestment.toLocaleString()}€
                    </p>
                  </div>
                  <Euro className="w-8 h-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rendement annuel</p>
                    <p className="text-2xl font-bold text-green-600">
                      {Math.round(estimatedAnnualReturn).toLocaleString()}€
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Projets</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {userProjects.length}
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Depuis</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {new Date(currentUser.registrationDate).getFullYear()}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
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
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="projects">Mes projets</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Mes investissements</h2>
                    <Button asChild>
                      <Link to="/projets">Découvrir d'autres projets</Link>
                    </Button>
                  </div>

                  <div className="grid gap-6">
                    {userProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {project.name}
                                  </h3>
                                  <Badge className="bg-green-100 text-green-800">
                                    {project.status}
                                  </Badge>
                                </div>
                                <p className="text-gray-600 mb-3">{project.location}</p>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">Investi</span>
                                    <p className="font-semibold">{project.userInvestment.toLocaleString()}€</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Rendement</span>
                                    <p className="font-semibold text-green-600">{project.expectedReturn}%</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Depuis</span>
                                    <p className="font-semibold">{new Date(project.joinDate).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Gain annuel</span>
                                    <p className="font-semibold text-green-600">
                                      {Math.round(project.userInvestment * project.expectedReturn / 100)}€
                                    </p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button asChild variant="outline" size="sm">
                                  <Link to={`/projet/${project.id}`}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Voir
                                  </Link>
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleAction('download')}>
                                  <Download className="w-4 h-4 mr-2" />
                                  Rapport
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Performance de vos investissements</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <PieChart className="w-5 h-5 mr-2 text-amber-600" />
                          Répartition par type d'énergie
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {['Photovoltaïque', 'Éolien', 'Hydraulique', 'Biomasse'].map((type, index) => {
                            const percentage = Math.random() * 40 + 10;
                            return (
                              <div key={type} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{type}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-sm font-medium">{Math.round(percentage)}%</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                          Évolution des gains
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'].map((month, index) => {
                            const amount = Math.random() * 200 + 50;
                            return (
                              <div key={month} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{month} 2024</span>
                                <span className="text-sm font-medium text-green-600">
                                  +{Math.round(amount)}€
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Mes documents</h2>
                    <Button asChild>
                      <Link to="/documents">Voir tous les documents</Link>
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {[
                      { name: 'Contrat de participation - Ferme Solaire Provence', date: '15/01/2024', type: 'Contrat' },
                      { name: 'Facture énergétique - Janvier 2024', date: '31/01/2024', type: 'Facture' },
                      { name: 'Rapport de production - Q4 2023', date: '10/01/2024', type: 'Rapport' },
                      { name: 'Relevé de dividendes - Q4 2023', date: '05/01/2024', type: 'Relevé' }
                    ].map((doc, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="font-medium text-gray-900">{doc.name}</p>
                                <p className="text-sm text-gray-500">{doc.type} • {doc.date}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => handleAction('download')}>
                              <Download className="w-4 h-4 mr-2" />
                              Télécharger
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Paramètres du compte</h2>
                  
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Informations personnelles</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Prénom</label>
                            <p className="text-gray-900">{currentUser.firstName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Nom</label>
                            <p className="text-gray-900">{currentUser.lastName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <p className="text-gray-900">{currentUser.email}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Téléphone</label>
                            <p className="text-gray-900">{currentUser.phone}</p>
                          </div>
                        </div>
                        <Button onClick={() => handleAction('edit')}>
                          <Settings className="w-4 h-4 mr-2" />
                          Modifier
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
                            <span className="text-sm font-medium text-gray-700">Notifications par email</span>
                            <input 
                              type="checkbox" 
                              checked={currentUser.notifications.email}
                              onChange={() => handleAction('toggle')}
                              className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" 
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Notifications SMS</span>
                            <input 
                              type="checkbox" 
                              checked={currentUser.notifications.sms}
                              onChange={() => handleAction('toggle')}
                              className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" 
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Notifications push</span>
                            <input 
                              type="checkbox" 
                              checked={currentUser.notifications.push}
                              onChange={() => handleAction('toggle')}
                              className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" 
                            />
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

export default DashboardPage;
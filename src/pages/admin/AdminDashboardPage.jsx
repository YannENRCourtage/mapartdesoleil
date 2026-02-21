import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Zap, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { allProjects } from '@/data/projects';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    pendingApplications: 0,
    totalProduction: 0,
    activeProjects: 0,
    completedProjects: 0
  });

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem('users_data');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const storedProjects = localStorage.getItem('projects_data_v2');
      const projects = storedProjects ? JSON.parse(storedProjects) : allProjects;

      const storedApplications = localStorage.getItem('applications_data');
      const applications = storedApplications ? JSON.parse(storedApplications) : [];

      const pendingApps = applications.filter(app => app.status === 'pending').length;
      const activeProjs = projects.filter(p => p.status === 'En cours').length;
      const completedProjs = projects.filter(p => p.status === 'Terminé').length;
      const totalProd = projects.reduce((sum, p) => sum + (p.capacity || 0), 0);

      setStats({
        totalUsers: users.length,
        totalProjects: projects.length,
        pendingApplications: pendingApps,
        totalProduction: totalProd,
        activeProjects: activeProjs,
        completedProjects: completedProjs
      });
    } catch (e) {
      console.error("Failed to load admin stats:", e);
    }
  }, []);

  const statCards = [
    {
      title: 'Utilisateurs',
      value: stats.totalUsers,
      icon: Users,
      description: 'Utilisateurs inscrits',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/admin/users'
    },
    {
      title: 'Projets',
      value: stats.totalProjects,
      icon: Zap,
      description: `${stats.activeProjects} actifs, ${stats.completedProjects} terminés`,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      link: '/admin/projects'
    },
    {
      title: 'Candidatures',
      value: stats.pendingApplications,
      icon: FileText,
      description: 'En attente de validation',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: '/admin/applications'
    },
    {
      title: 'Production totale',
      value: `${stats.totalProduction} kWc`,
      icon: TrendingUp,
      description: 'Capacité installée',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/admin/projects'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <Helmet>
        <title>Tableau de bord Admin - Ma part de soleil</title>
        <meta name="description" content="Tableau de bord administrateur pour gérer les utilisateurs, projets et candidatures." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord administrateur</h1>
          <p className="text-gray-600">Vue d'ensemble de la plateforme Ma part de soleil</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link to={stat.link}>
                <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`${stat.bgColor} p-2 rounded-lg`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Accédez rapidement aux fonctionnalités principales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/admin/users">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Users className="mr-2 h-4 w-4" />
                    Gérer les utilisateurs
                  </Button>
                </Link>
                <Link to="/admin/applications">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    <FileText className="mr-2 h-4 w-4" />
                    Valider les candidatures
                  </Button>
                </Link>
                <Link to="/admin/projects">
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                    <Zap className="mr-2 h-4 w-4" />
                    Gérer les projets
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Dernières actions sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Nouvelle candidature approuvée</p>
                    <p className="text-xs text-gray-500">Jean Dupont - Projet Lyon Sud - Il y a 2 heures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Nouvel utilisateur inscrit</p>
                    <p className="text-xs text-gray-500">Marie Martin - Il y a 5 heures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Candidature en attente</p>
                    <p className="text-xs text-gray-500">Pierre Durand - Projet Bordeaux Ouest - Il y a 1 jour</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;
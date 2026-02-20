import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, HardHat, FileDown, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { mockProjects, mockUsers } from '@/data/mockData';
import { utils, writeFile } from 'xlsx';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleExportUsers = () => {
    try {
      const ws = utils.json_to_sheet(mockUsers || []);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Utilisateurs');
      writeFile(wb, 'utilisateurs.xlsx');
      toast({ title: 'Export réussi', description: 'Le fichier utilisateurs.xlsx a été généré.' });
    } catch (e) {
      toast({ title: 'Erreur export', description: 'Impossible de générer le fichier.', variant: 'destructive' });
    }
  };

  const handleExportProjects = () => {
    try {
      const ws = utils.json_to_sheet(mockProjects || []);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Projets');
      writeFile(wb, 'projets.xlsx');
      toast({ title: 'Export réussi', description: 'Le fichier projets.xlsx a été généré.' });
    } catch (e) {
      toast({ title: 'Erreur export', description: 'Impossible de générer le fichier.', variant: 'destructive' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin - Ma part de soleil</title>
        <meta
          name="description"
          content="Espace d’administration des projets, utilisateurs et documents."
        />
      </Helmet>

      <motion.div
        className="container py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord Administrateur</h1>
          <p className="text-muted-foreground">
            Gérez les projets, utilisateurs et opérations courantes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="text-primary" /> Gestion Utilisateurs
              </CardTitle>
              <CardDescription>Consultez et gérez la liste des utilisateurs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/admin/users')} className="w-full">
                Voir les utilisateurs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="text-primary" /> Validation des Adhésions
              </CardTitle>
              <CardDescription>Passez en revue les nouvelles demandes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/admin/applications')} className="w-full">
                Voir les demandes en attente
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardHat className="text-primary" /> Gestion Projets
              </CardTitle>
              <CardDescription>Modifiez les projets existants ou ajoutez-en de nouveaux.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => toast({ title: 'Bientôt disponible ! 🚧' })} className="w-full">
                Gérer les projets
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileDown className="text-primary" /> Export Utilisateurs
              </CardTitle>
              <CardDescription>Téléchargez la liste des utilisateurs au format Excel.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleExportUsers} className="w-full">
                Exporter les utilisateurs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileDown className="text-primary" /> Export Projets
              </CardTitle>
              <CardDescription>Téléchargez la liste des projets au format Excel.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleExportProjects} className="w-full">
                Exporter les projets
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </>
  );
};

export default AdminDashboardPage;
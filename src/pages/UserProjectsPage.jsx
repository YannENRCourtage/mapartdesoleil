import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { allProjects } from '@/data/projects';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HardHat, Clock, CheckCircle, Search } from 'lucide-react';

const UserProjectsPage = () => {
    const [userApplications, setUserApplications] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const storedApplications = JSON.parse(localStorage.getItem(`user_apps_${user.id}`) || '[]');
            const applicationsWithDetails = storedApplications.map(app => ({
                ...app,
                project: allProjects.find(p => p.id === app.projectId)
            }));
            setUserApplications(applicationsWithDetails);
        }
    }, []);

    const activeProjects = userApplications.filter(app => app.status === 'Validé');
    const pendingProjects = userApplications.filter(app => app.status === 'En attente');
    
    return (
        <>
            <Helmet>
                <title>Mes Projets - Ma part de soleil</title>
                <meta name="description" content="Retrouvez la liste de vos projets, vos adhésions en cours et leur état d'avancement." />
            </Helmet>

            <div className="container py-12">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <h1 className="text-3xl font-bold">Mes Projets</h1>
                    <p className="text-muted-foreground mt-2">Suivez ici vos adhésions et vos projets actifs.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.4}} className="mt-12">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Clock className="text-amber-500" />Demandes en attente</h2>
                    {pendingProjects.length > 0 ? (
                        <div className="space-y-4">
                            {pendingProjects.map(app => (
                                <Card key={app.id}>
                                    <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <p className="font-semibold">{app.project?.name || 'Projet inconnu'}</p>
                                            <p className="text-sm text-muted-foreground">Soumis le {new Date(app.date).toLocaleDateString()}</p>
                                        </div>
                                        <Badge variant="secondary">En attente de validation</Badge>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                       <Card className="text-center p-8 bg-gray-50 border-dashed">
                            <HardHat className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <CardTitle>Aucune demande en cours</CardTitle>
                            <CardDescription className="mt-2">Vous n'avez pas de demande d'adhésion en attente.</CardDescription>
                            <Button asChild className="mt-4"><Link to="/projets"><Search className="mr-2 h-4 w-4" />Trouver un projet</Link></Button>
                        </Card>
                    )}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.2}} className="mt-12">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><CheckCircle className="text-green-500"/>Projets Actifs</h2>
                    {activeProjects.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {activeProjects.map((app, index) => (
                                app.project ? <ProjectCard key={app.project.id} project={app.project} index={index} /> : null
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">Vous n'avez aucun projet actif pour le moment.</p>
                    )}
                </motion.div>
            </div>
        </>
    );
};

// Assuming ProjectCard is imported or defined in this scope
const ProjectCard = ({ project, index }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
    <Card className="overflow-hidden h-full">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <Badge variant="success">Actif</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Vous êtes participant de ce projet.</p>
        <Button asChild className="w-full"><Link to={`/projet/${project.id}`}>Voir les détails</Link></Button>
      </CardContent>
    </Card>
  </motion.div>
);

export default UserProjectsPage;
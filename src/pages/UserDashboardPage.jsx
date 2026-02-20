import React from 'react';
    import { Helmet } from 'react-helmet-async';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { FileText, Bell, User, HardHat } from 'lucide-react';
    import { useNavigate } from 'react-router-dom';

    const UserDashboardPage = () => {
      const navigate = useNavigate();

      const handleNavigation = (path) => {
        navigate(path);
      };

      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.5,
          },
        }),
      };

      const menuItems = [
        { title: 'Mes Projets', description: 'Gérez vos projets en cours.', icon: HardHat, path: '/mes-projets' },
        { title: 'Mes Documents', description: 'Consultez vos contrats et factures.', icon: FileText, path: '/documents' },
        { title: 'Mon Profil', description: 'Mettez à jour vos informations.', icon: User, path: '/profil' },
        { title: 'Notifications', description: 'Gérez vos alertes et préférences.', icon: Bell, path: '/notifications' },
      ];

      return (
        <>
          <Helmet>
            <title>Tableau de bord - Ma part de soleil</title>
            <meta name="description" content="Votre espace personnel pour gérer vos projets, documents et notifications." />
          </Helmet>

          <div className="container py-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold">Tableau de bord</h1>
              <p className="text-muted-foreground">
                Bienvenue sur votre espace personnel.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {menuItems.map((item, i) => (
                <motion.div key={item.title} custom={i} variants={cardVariants} initial="hidden" animate="visible">
                  <Card onClick={() => handleNavigation(item.path)} className="h-full hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col">
                    <CardHeader className="flex-grow">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{item.title}</CardTitle>
                      </div>
                      <CardDescription className="pt-2">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="link" className="p-0">Accéder →</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      );
    };

    export default UserDashboardPage;
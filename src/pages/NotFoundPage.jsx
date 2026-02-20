import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 Page non trouvée - Ma part de soleil</title>
        <meta name="description" content="La page que vous cherchez n'existe pas." />
      </Helmet>
      <motion.div
        className="container flex flex-col items-center justify-center text-center py-20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <p className="mt-4 text-2xl font-semibold tracking-tight">Page non trouvée</p>
        <p className="mt-2 text-muted-foreground">Désolé, nous n'avons pas trouvé la page que vous recherchez.</p>
        <Button asChild className="mt-6">
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </motion.div>
    </>
  );
};

export default NotFoundPage;
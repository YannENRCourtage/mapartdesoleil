import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lightbulb, Users } from 'lucide-react';

const AccPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Comment ça marche ? - Ma part de soleil</title>
        <meta name="description" content="Découvrez le fonctionnement de l'autoconsommation collective avec Ma part de soleil : simple, local et économique." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-[#0066CC]"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            L'autoconsommation collective,<br />c'est simple.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-700"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Partagez une énergie verte, produite localement, et bénéficiez d'un tarif juste et stable.
            C'est ça, la révolution énergétique citoyenne.
          </motion.p>
        </div>
      </section>
      <div className="h-1 bg-gradient-to-r from-orange-300 via-yellow-400 to-orange-300 w-full"></div>


      {/* Principles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos principes
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Users className="h-16 w-16 text-[#FF7F00] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Modèle Associatif</h3>
              <p className="text-gray-600">
                Ma part de soleil fonctionne sur un modèle associatif et citoyen. Pas d'abonnement, pas de frais d'adhésion cachés.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Lightbulb className="h-16 w-16 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Liberté et Flexibilité</h3>
              <p className="text-gray-600">
                Le consommateur est libre de sortir d'un projet à tout moment, sans engagement de durée.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparence Totale</h3>
              <p className="text-gray-600">
                Nous garantissons une transparence complète sur les coûts, la production et la répartition de l'énergie.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Les étapes pour rejoindre un projet
          </motion.h2>
          <div className="relative flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="hidden md:block absolute top-1/2 left-0 w-full -translate-y-1/2 z-0">
              <svg width="100%" height="2">
                <motion.line
                  x1="15%"
                  y1="1"
                  x2="85%"
                  y2="1"
                  stroke="#d1d5db"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
            </div>

            <motion.div
              className="relative z-10 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center max-w-sm w-full"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-[#FF7F00] text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trouvez votre projet</h3>
              <p className="text-gray-600 text-center">
                Parcourez notre carte interactive et choisissez un projet près de chez vous.
              </p>
            </motion.div>
            <motion.div
              className="relative z-10 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center max-w-sm w-full"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-yellow-400 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Adhérez simplement</h3>
              <p className="text-gray-600 text-center">
                Remplissez le formulaire d'adhésion en ligne et signez électroniquement.
              </p>
            </motion.div>
            <motion.div
              className="relative z-10 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center max-w-sm w-full"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="bg-green-400 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Consommez local</h3>
              <p className="text-gray-600 text-center">
                Profitez de votre énergie verte et suivez votre impact positif sur l'environnement.
              </p>
            </motion.div>
          </div>
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link to="/projets">
              <Button size="lg" className="bg-[#FF7F00] hover:bg-[#E67300] text-white text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                Je découvre les projets
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AccPage;
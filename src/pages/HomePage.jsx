import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDown, Zap, Users, Leaf } from 'lucide-react';
import { allProjects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import heroRoofImage from '@/assets/hero-roof.jpg'; // Import the image

const HomePage = () => {
  const [consumption, setConsumption] = useState('');
  const [savings, setSavings] = useState(0);
  const [showSavings, setShowSavings] = useState(false);
  const [randomProjects, setRandomProjects] = useState([]);


  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem('projects_data_v2');
      const projectsToUse = storedProjects ? JSON.parse(storedProjects) : allProjects;
      const shuffled = [...projectsToUse].sort(() => 0.5 - Math.random());
      setRandomProjects(shuffled.slice(0, 3));
    } catch (e) {
      console.error("Failed to load projects from localStorage:", e);
      const shuffled = [...allProjects].sort(() => 0.5 - Math.random());
      setRandomProjects(shuffled.slice(0, 3));
    }
  }, []);

  const calculateSavings = () => {
    const kwh = parseFloat(consumption);
    if (!isNaN(kwh) && kwh > 0) {
      // Example calculation: 0.05€/kWh saving
      setSavings((kwh * 0.05).toFixed(2));
      setShowSavings(true);
    } else {
      setSavings(0);
      setShowSavings(false);
    }
  };

  const handleInputChange = (e) => {
    setConsumption(e.target.value);
    setShowSavings(false); // Hide savings when input changes
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Accueil - Ma part de soleil</title>
        <meta name="description" content="Ma part de soleil : Devenez acteur de la transition énergétique locale en participant à des projets solaires collectifs." />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-20 md:py-32 text-white flex items-center justify-center"
        style={{ backgroundImage: `url(${heroRoofImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Devenez acteur de la transition énergétique
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Avec Ma part de soleil, rejoignez l’autoconsommation collective et consommez une électricité verte, locale et à un prix juste.
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link to="/projets">
              <Button size="lg" className="bg-[#FF7F00] hover:bg-[#E67300] text-white text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                Découvrir les projets
              </Button>
            </Link>
            <Link to="/acc">
              <Button size="lg" variant="outline" className="text-black border-white hover:bg-white hover:text-black text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                Comment ça marche ?
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Vignoble Photo Section */}
      <section className="w-full overflow-hidden" style={{ height: '480px' }}>
        <img
          src="/images/photo-vignoble.jpg"
          alt="Installation panneaux solaires sur vignoble"
          className="w-full h-full object-cover"
        />
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pourquoi choisir <span className="text-[#FF7F00]">Ma part de soleil</span> ?
          </motion.h2>
          <div className="relative flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
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
                Explorez les projets solaires près de chez vous et choisissez celui qui vous correspond.
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
                Inscrivez-vous en quelques clics et rejoignez la communauté des producteurs-consommateurs.
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
                Profitez d'une énergie propre et suivez votre consommation en temps réel.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Savings Calculator Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Calculez vos économies potentielles !
          </motion.h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Estimez combien vous pourriez économiser en rejoignant un projet d'autoconsommation collective.
          </p>
          <motion.div
            className="bg-gray-50 p-8 rounded-lg shadow-xl max-w-md mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="consumption" className="text-lg font-medium text-gray-700">
                  Votre consommation annuelle moyenne (en kWh) :
                </Label>
                <Input
                  id="consumption"
                  type="number"
                  placeholder="Ex: 4500"
                  value={consumption}
                  onChange={handleInputChange}
                  className="mt-2 text-center text-lg p-3 border-gray-300 focus:border-[#FF7F00] focus:ring-[#FF7F00]"
                />
              </div>
              <Button
                onClick={calculateSavings}
                className="w-full bg-[#FF7F00] hover:bg-[#E67300] text-white text-lg py-3 rounded-md shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                Calculer mes économies
              </Button>
            </div>
            {showSavings && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl font-semibold text-gray-700">
                  Vos économies potentielles annuelles :
                </p>
                <p className="text-5xl font-extrabold text-green-600 mt-2 flex items-center justify-center">
                  <ArrowDown className="h-10 w-10 mr-2" /> {savings} €
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  *Estimation basée sur une moyenne. Les économies réelles peuvent varier.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials/Social Proof Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ils économisent déjà avec nous.
          </motion.h2>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Rejoignez une communauté qui fait la différence pour la planète et pour son portefeuille.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-green-200 text-green-700 rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold mb-4">€</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Famille (4 personnes)</h3>
              <p className="text-2xl font-bold text-[#FF7F00] mb-2">250 €/an</p>
              <p className="text-gray-600 text-center text-sm">
                En moyenne, sur une consommation annuelle de 4500 kWh, en profitant d'un prix du kWh inférieur au tarif réglementé.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-green-200 text-green-700 rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold mb-4">€</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Boulangerie</h3>
              <p className="text-2xl font-bold text-[#FF7F00] mb-2">1200 €/an</p>
              <p className="text-gray-600 text-center text-sm">
                Pour une consommation de 15000 kWh/an, l'autoconsommation collective permet de stabiliser une partie du coût de l'énergie.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-green-200 text-green-700 rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold mb-4">€</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Petite entreprise</h3>
              <p className="text-2xl font-bold text-[#FF7F00] mb-2">1800 €/an</p>
              <p className="text-gray-600 text-center text-sm">
                Sur une base de 25000 kWh/an. Un avantage compétitif et un engagement RSE concret pour l'entreprise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos projets phares
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {randomProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
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
                Voir tous les projets
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-white relative">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-r from-orange-400 to-yellow-400 opacity-80" style={{ maxWidth: '75%', margin: '0 auto' }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Prêt à rejoindre l’aventure solaire ?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 drop-shadow-md"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Inscrivez-vous dès aujourd'hui et commencez à consommer une énergie plus propre et plus juste.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link to="/connexion">
              <Button size="lg" className="bg-white text-[#FF7F00] hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                Je m'inscris !
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
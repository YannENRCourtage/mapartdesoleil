import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SimpleLogo from '@/components/SimpleLogo';

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-800 text-white py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <SimpleLogo className="text-white" />
            <p className="text-gray-400 text-sm">
              Ma part de soleil est une initiative citoyenne pour accélérer la transition énergétique locale.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#FF7F00] transition-colors duration-300 text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/projets" className="text-gray-400 hover:text-[#FF7F00] transition-colors duration-300 text-sm">
                  Nos projets
                </Link>
              </li>
              <li>
                <Link to="/acc" className="text-gray-400 hover:text-[#FF7F00] transition-colors duration-300 text-sm">
                  Comment ça marche ?
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#FF7F00] transition-colors duration-300 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contactez-nous</h3>
            <p className="text-gray-400 text-sm">
              Email: contact@mapartdesoleil.fr
            </p>
            <p className="text-gray-400 text-sm">
              Téléphone: +33 1 23 45 67 89
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-[#FF7F00] transition-colors duration-300">
                <img alt="Facebook icon" class="h-5 w-5" src="https://images.unsplash.com/photo-1601141586963-f213d2575b7f" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF7F00] transition-colors duration-300">
                <img alt="Twitter icon" class="h-5 w-5" src="https://images.unsplash.com/photo-1691431118988-8e332ca2bd28" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF7F00] transition-colors duration-300">
                <img alt="LinkedIn icon" class="h-5 w-5" src="https://images.unsplash.com/photo-1592181572975-1d0d8880d175" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Ma part de soleil. Tous droits réservés.</p>
          <p className="mt-2">
            <Link to="/mentions-legales" className="hover:text-[#FF7F00] transition-colors duration-300">Mentions légales</Link> | <Link to="/politique-de-confidentialite" className="hover:text-[#FF7F00] transition-colors duration-300">Politique de confidentialité</Link>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
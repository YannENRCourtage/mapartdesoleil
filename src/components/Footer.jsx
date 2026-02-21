import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-800 text-white py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <img src="/images/logo-enr-courtage.png" alt="ENR COURTAGE" className="h-12 w-auto" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Ma part de soleil est une initiative citoyenne pour accélérer la transition énergétique locale.
              <br />
              <span className="mt-2 block">Ma part de soleil fait partie du groupe <strong>ENR COURTAGE</strong>.</span>
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white tracking-wide">Liens rapides</h3>
            <ul className="space-y-3">
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
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white tracking-wide">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start text-gray-400 space-x-3">
                <MapPin className="h-5 w-5 text-[#FF7F00] shrink-0 mt-0.5" />
                <p className="text-sm">
                  7 rue Gutenberg<br />
                  33700 MÉRIGNAC
                </p>
              </div>
              <div className="flex items-center text-gray-400 space-x-3">
                <Mail className="h-5 w-5 text-[#FF7F00] shrink-0" />
                <a href="mailto:contact@enr-courtage.fr" className="text-sm hover:text-[#FF7F00] transition-colors underline decoration-[#FF7F00]/30 underline-offset-4">
                  contact@enr-courtage.fr
                </a>
              </div>
              <div className="pt-2">
                <Link to="/#contact-section" onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                  <Button variant="outline" className="bg-[#EBF5FF] text-[#0066CC] border-transparent hover:bg-[#D6E9FF] hover:text-[#0052A3] transition-all px-8">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-xs">
          <p>&copy; 2025 Ma part de soleil. Tous droits réservés.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
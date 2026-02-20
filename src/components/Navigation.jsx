import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import SimpleLogo from '@/components/SimpleLogo';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setIsAuthenticated(true);
        setIsAdmin(user.isAdmin || false);
        // Check for notifications (mock for now)
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        setHasNotifications(notifications.some(notif => !notif.read));
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setHasNotifications(false);
      }
    } catch (e) {
      console.error("Failed to access localStorage for user/notifications:", e);
      setIsAuthenticated(false);
      setIsAdmin(false);
      setHasNotifications(false);
    }
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('userApplications');
      localStorage.removeItem('notifications');
    } catch (e) {
      console.error("Failed to clear localStorage on logout:", e);
    }
    setIsAuthenticated(false);
    setIsAdmin(false);
    setHasNotifications(false);
    navigate('/connexion');
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté de votre compte.",
      variant: "success",
    });
  };

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Comment ça marche ?', path: '/acc' },
    { name: 'Nos projets', path: '/projets' },
  ];

  if (isAuthenticated && !isAdmin) {
    navItems.push({ name: 'Mon tableau de bord', path: '/tableau-de-bord' });
  }

  return (
    <motion.nav
      className="bg-white shadow-lg fixed w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <SimpleLogo className="h-8 w-auto" />
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-gray-700 hover:text-[#FF7F00] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  location.pathname === item.path ? 'text-[#FF7F00] font-bold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-gray-700 hover:text-[#FF7F00] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  location.pathname.startsWith('/admin') ? 'text-[#FF7F00] font-bold' : ''
                }`}
              >
                Admin
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <Link to="/notifications" className="relative text-gray-700 hover:text-[#FF7F00] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">
                  <Bell className="h-5 w-5" />
                  {hasNotifications && (
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500 animate-pulse"></span>
                  )}
                </Link>
                <Button onClick={handleLogout} variant="outline" className="text-sm">
                  Déconnexion
                </Button>
              </>
            ) : (
              <Link to="/connexion">
                <Button variant="default" className="bg-[#FF7F00] hover:bg-[#E67300] text-white text-sm">
                  Connexion
                </Button>
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button onClick={toggleMenu} variant="ghost" className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#FF7F00] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF7F00]">
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </div>

      <motion.div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block text-gray-700 hover:text-[#FF7F00] hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                location.pathname === item.path ? 'text-[#FF7F00] font-bold bg-gray-100' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className={`block text-gray-700 hover:text-[#FF7F00] hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                location.pathname.startsWith('/admin') ? 'text-[#FF7F00] font-bold bg-gray-100' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}
          {isAuthenticated ? (
            <>
              <Link
                to="/notifications"
                className="relative block text-gray-700 hover:text-[#FF7F00] hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Notifications
                {hasNotifications && (
                  <span className="absolute top-2 right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500 animate-pulse"></span>
                )}
              </Link>
              <Button onClick={() => { handleLogout(); setIsOpen(false); }} variant="outline" className="w-full mt-2 text-base">
                Déconnexion
              </Button>
            </>
          ) : (
            <Link to="/connexion" className="block w-full mt-2" onClick={() => setIsOpen(false)}>
              <Button variant="default" className="w-full bg-[#FF7F00] hover:bg-[#E67300] text-white text-base">
                Connexion
              </Button>
            </Link>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pdlPrm: '',
    address: '',
    phone: '',
    iban: '',
    bic: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
        setFormData({
          name: storedUser.name || '',
          email: storedUser.email || '',
          pdlPrm: storedUser.pdlPrm || '',
          address: storedUser.address || '',
          phone: storedUser.phone || '',
          iban: storedUser.bankDetails?.iban || '',
          bic: storedUser.bankDetails?.bic || '',
        });
      } else {
        toast({
          title: "Accès refusé",
          description: "Veuillez vous connecter pour accéder à votre profil.",
          variant: "destructive",
        });
        // Redirect to login if no user is found
        // navigate('/connexion'); // Uncomment if you want to redirect
      }
    } catch (e) {
      console.error("Failed to load user from localStorage:", e);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du chargement de votre profil.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (formData.pdlPrm && formData.pdlPrm.length !== 14) {
      toast({
        title: "Erreur de saisie",
        description: "Le PDL/PRM doit contenir 14 chiffres.",
        variant: "destructive",
      });
      return;
    }

    try {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        pdlPrm: formData.pdlPrm,
        address: formData.address,
        phone: formData.phone,
        bankDetails: {
          iban: formData.iban,
          bic: formData.bic,
        },
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Update the user in the global 'users' array as well
      const allUsers = JSON.parse(localStorage.getItem('users')) || [];
      const updatedAllUsers = allUsers.map(u => u.id === updatedUser.id ? updatedUser : u);
      localStorage.setItem('users', JSON.stringify(updatedAllUsers));

      setUser(updatedUser);
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès.",
        variant: "success",
      });
    } catch (e) {
      console.error("Failed to save profile:", e);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde de votre profil.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Chargement du profil...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Mon Profil - Ma part de soleil</title>
        <meta name="description" content="Gérez vos informations personnelles, vos coordonnées et vos préférences sur Ma part de soleil." />
      </Helmet>

      <section className="py-16 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-lg shadow-lg">
          <motion.h1
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Mon Profil
          </motion.h1>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
              <TabsTrigger value="contact">Coordonnées</TabsTrigger>
              <TabsTrigger value="bank">Informations bancaires</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-6">
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    disabled // Email is usually not editable
                  />
                </div>
                <Button type="submit" className="w-full bg-[#FF7F00] hover:bg-[#E67300]">
                  Enregistrer les modifications
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="contact" className="mt-6">
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <Label htmlFor="pdlPrm">PDL / PRM (Point De Livraison / Point de Référence Mesure)</Label>
                  <Input
                    id="pdlPrm"
                    type="text"
                    placeholder="Entrez votre PDL/PRM (14 chiffres)"
                    value={formData.pdlPrm}
                    onChange={handleChange}
                    maxLength={14}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Le PDL/PRM est un numéro à 14 chiffres que vous trouverez sur votre facture d'électricité.
                  </p>
                  {formData.pdlPrm && formData.pdlPrm.length !== 14 && (
                    <p className="text-red-500 text-sm mt-1">Le PDL/PRM doit contenir 14 chiffres.</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address">Adresse complète</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#FF7F00] hover:bg-[#E67300]">
                  Enregistrer les modifications
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="bank" className="mt-6">
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <Label htmlFor="iban">IBAN</Label>
                  <Input
                    id="iban"
                    type="text"
                    placeholder="FRXX XXXX XXXX XXXX XXXX XXX"
                    value={formData.iban}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bic">BIC</Label>
                  <Input
                    id="bic"
                    type="text"
                    placeholder="BIC (Code SWIFT)"
                    value={formData.bic}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#FF7F00] hover:bg-[#E67300]">
                  Enregistrer les modifications
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </motion.div>
  );
};

export default UserProfilePage;
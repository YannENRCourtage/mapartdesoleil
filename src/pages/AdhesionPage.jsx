import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { allProjects as initialProjects } from '@/data/projects';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";

const AdhesionPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pdlPrm: '',
    address: '',
    phone: '',
    iban: '',
    bic: '',
    consent: false,
  });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem('projects_data_v2');
      const projectsToUse = storedProjects ? JSON.parse(storedProjects) : initialProjects;
      const foundProject = projectsToUse.find((p) => p.id === projectId);
      if (foundProject) {
        setProject(foundProject);
      } else {
        navigate('/404');
      }

      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser) {
        setUser(currentUser);
        setFormData(prev => ({
          ...prev,
          pdlPrm: currentUser.pdlPrm || '',
          address: currentUser.address || '',
          phone: currentUser.phone || '',
          iban: currentUser.bankDetails?.iban || '',
          bic: currentUser.bankDetails?.bic || '',
        }));
      } else {
        toast({
          title: "Connexion requise",
          description: "Veuillez vous connecter pour adhérer à un projet.",
          variant: "warning",
        });
        navigate('/connexion');
      }
    } catch (e) {
      console.error("Failed to load data from localStorage:", e);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du chargement des données.",
        variant: "destructive",
      });
      navigate('/connexion');
    }
  }, [projectId, navigate, toast]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.pdlPrm || formData.pdlPrm.length !== 14) {
        toast({
          title: "Erreur de saisie",
          description: "Veuillez entrer un PDL/PRM valide de 14 chiffres.",
          variant: "destructive",
        });
        return;
      }
      if (!formData.address || !formData.phone) {
        toast({
          title: "Champs manquants",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      if (!formData.iban || !formData.bic) {
        toast({
          title: "Champs manquants",
          description: "Veuillez remplir tous les champs bancaires obligatoires.",
          variant: "destructive",
        });
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (!formData.consent) {
      toast({
        title: "Consentement requis",
        description: "Veuillez accepter les conditions générales pour finaliser l'adhésion.",
        variant: "destructive",
      });
      return;
    }
    setIsConfirmationOpen(true);
  };

  const confirmAdhesion = () => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          const newApplication = {
            id: `app-${Date.now()}`,
            projectId: project.id,
            projectName: project.name,
            userId: user.id,
            userName: user.name,
            status: 'pending', // pending, approved, rejected, info_requested
            pdlPrm: formData.pdlPrm,
            address: formData.address,
            phone: formData.phone,
            iban: formData.iban,
            bic: formData.bic,
            applicationDate: new Date().toISOString(),
            notifications: [], // For admin to user communication
          };

          const updatedApplications = [...(u.applications || []), newApplication];

          // Update user's profile data
          const updatedUser = {
            ...u,
            pdlPrm: formData.pdlPrm,
            address: formData.address,
            phone: formData.phone,
            bankDetails: { iban: formData.iban, bic: formData.bic },
            applications: updatedApplications,
          };
          localStorage.setItem('user', JSON.stringify(updatedUser)); // Update current user in local storage
          return updatedUser;
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Add a notification for the admin
      const adminNotifications = JSON.parse(localStorage.getItem('adminNotifications')) || [];
      adminNotifications.push({
        id: `admin-notif-${Date.now()}`,
        type: 'new_application',
        message: `Nouvelle demande d'adhésion de ${user.name} pour le projet ${project.name}.`,
        read: false,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('adminNotifications', JSON.stringify(adminNotifications));

      toast({
        title: "Demande d'adhésion envoyée !",
        description: "Votre demande a été soumise et est en attente de validation par l'administrateur.",
        variant: "success",
      });
      setIsConfirmationOpen(false);
      navigate('/tableau-de-bord');
    } catch (e) {
      console.error("Failed to submit adhesion:", e);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  if (!project || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Chargement de la page d'adhésion...</p>
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
        <title>Adhésion au projet {project.name} - Ma part de soleil</title>
        <meta name="description" content={`Adhérez au projet solaire ${project.name} et rejoignez l'autoconsommation collective.`} />
      </Helmet>

      <section className="py-16 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-lg shadow-lg">
          <motion.h1
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Adhésion au projet : {project.name}
          </motion.h1>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className={`flex-1 text-center py-2 rounded-l-lg ${step >= 1 ? 'bg-[#FF7F00] text-white' : 'bg-gray-200 text-gray-700'}`}>
                Étape 1: Vos informations
              </div>
              <div className={`flex-1 text-center py-2 ${step >= 2 ? 'bg-[#FF7F00] text-white' : 'bg-gray-200 text-gray-700'}`}>
                Étape 2: Informations bancaires
              </div>
              <div className={`flex-1 text-center py-2 rounded-r-lg ${step >= 3 ? 'bg-[#FF7F00] text-white' : 'bg-gray-200 text-gray-700'}`}>
                Étape 3: Confirmation
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <motion.div
                className="h-full bg-[#FF7F00] rounded-full"
                initial={{ width: `${(step - 1) * 50}%` }}
                animate={{ width: `${(step - 1) * 50}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Vos informations</h2>
                <div>
                  <Label htmlFor="pdlPrm">PDL / PRM (Point De Livraison / Point de Référence Mesure)</Label>
                  <Input
                    id="pdlPrm"
                    type="text"
                    placeholder="Entrez votre PDL/PRM (14 chiffres)"
                    value={formData.pdlPrm}
                    onChange={handleChange}
                    maxLength={14}
                    required
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
                    placeholder="Votre adresse"
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
                    placeholder="Votre numéro de téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Informations bancaires</h2>
                <p className="text-gray-700 mb-4">
                  Ces informations sont nécessaires pour la mise en place du mandat SEPA.
                </p>
                <div>
                  <Label htmlFor="iban">IBAN</Label>
                  <Input
                    id="iban"
                    type="text"
                    placeholder="FRXX XXXX XXXX XXXX XXXX XXX"
                    value={formData.iban}
                    onChange={handleChange}
                    required
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
                    required
                    className="mt-1"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Récapitulatif et confirmation</h2>
                <div className="space-y-3 text-gray-700">
                  <p><span className="font-semibold">Projet :</span> {project.name}</p>
                  <p><span className="font-semibold">PDL/PRM :</span> {formData.pdlPrm}</p>
                  <p><span className="font-semibold">Adresse :</span> {formData.address}</p>
                  <p><span className="font-semibold">Téléphone :</span> {formData.phone}</p>
                  <p><span className="font-semibold">IBAN :</span> {formData.iban}</p>
                  <p><span className="font-semibold">BIC :</span> {formData.bic}</p>
                </div>
                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => handleChange({ target: { id: 'consent', type: 'checkbox', checked } })}
                  />
                  <Label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    J'accepte les conditions générales d'adhésion et autorise le prélèvement SEPA.
                  </Label>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button type="button" onClick={handlePrevious} variant="outline">
                  Précédent
                </Button>
              )}
              {step < 3 && (
                <Button type="button" onClick={handleNext} className="ml-auto bg-[#FF7F00] hover:bg-[#E67300]">
                  Suivant
                </Button>
              )}
              {step === 3 && (
                <Button type="button" onClick={handleSubmit} className="ml-auto bg-[#28a745] hover:bg-[#218838]">
                  Finaliser mon adhésion
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer votre adhésion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Vous êtes sur le point de finaliser votre adhésion au projet <span className="font-semibold">{project.name}</span>.
              Une fois votre demande validée par l'administrateur, vous serez invité à signer électroniquement le contrat et le mandat SEPA.
            </p>
            <p className="text-gray-700 mt-2">
              Un email de confirmation vous sera envoyé.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Annuler
              </Button>
            </DialogClose>
            <Button type="button" onClick={confirmAdhesion} className="bg-[#FF7F00] hover:bg-[#E67300]">
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdhesionPage;
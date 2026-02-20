import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import SimpleLogo from '@/components/SimpleLogo';

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === loginEmail && u.password === loginPassword);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        toast({
          title: "Connexion réussie !",
          description: `Bienvenue, ${user.name}.`,
          variant: "success",
        });
        if (user.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/tableau-de-bord');
        }
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect.",
          variant: "destructive",
        });
      }
    } catch (e) {
      console.error("Failed to login:", e);
      toast({
        title: "Erreur système",
        description: "Impossible de se connecter. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Erreur d'inscription",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(u => u.email === registerEmail)) {
        toast({
          title: "Erreur d'inscription",
          description: "Cet email est déjà enregistré.",
          variant: "destructive",
        });
        return;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        isAdmin: false,
        registrationDate: new Date().toISOString(),
        notifications: [],
        pdlPrm: '',
        address: '',
        phone: '',
        bankDetails: { iban: '', bic: '' },
        documents: [],
      };
      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      toast({
        title: "Inscription réussie !",
        description: "Votre compte a été créé. Vous pouvez maintenant vous connecter.",
        variant: "success",
      });
      // Optionally log in the user immediately
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/tableau-de-bord');
    } catch (e) {
      console.error("Failed to register:", e);
      toast({
        title: "Erreur système",
        description: "Impossible de s'inscrire. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some(u => u.email === forgotPasswordEmail);

      if (userExists) {
        toast({
          title: "Lien de réinitialisation envoyé",
          description: "Si votre email est enregistré, un lien de réinitialisation a été envoyé.",
          variant: "success",
        });
        setIsForgotPasswordOpen(false);
        setForgotPasswordEmail('');
        // Redirect to login page after sending link
        navigate('/connexion');
      } else {
        toast({
          title: "Email non trouvé",
          description: "Cet email n'est pas enregistré dans notre système.",
          variant: "destructive",
        });
      }
    } catch (e) {
      console.error("Failed to handle forgot password:", e);
      toast({
        title: "Erreur système",
        description: "Impossible de traiter la demande. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Connexion / Inscription - Ma part de soleil</title>
        <meta name="description" content="Connectez-vous ou créez un compte pour accéder à votre espace personnel et gérer vos projets solaires." />
      </Helmet>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-6">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <Label htmlFor="login-email">Adresse email</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="login-password">Mot de passe</Label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(true)}
                    className="font-medium text-[#FF7F00] hover:text-[#E67300]"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF7F00] hover:bg-[#E67300] text-white py-2 px-4 rounded-md text-lg font-semibold transition-colors duration-300"
              >
                Se connecter
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register" className="mt-6">
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <Label htmlFor="register-name">Nom complet</Label>
                <Input
                  id="register-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="register-email">Adresse email</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="register-password">Mot de passe</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="register-confirm-password">Confirmer le mot de passe</Label>
                <Input
                  id="register-confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#FF7F00] hover:bg-[#E67300] text-white py-2 px-4 rounded-md text-lg font-semibold transition-colors duration-300"
              >
                S'inscrire
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mot de passe oublié ?</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="forgot-email">Adresse email</Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="Entrez votre adresse email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-[#FF7F00] hover:bg-[#E67300]">
                Envoyer le lien
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default LoginPage;
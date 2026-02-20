import React from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ProjectsPage from '@/pages/ProjectsPage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import LoginPage from '@/pages/LoginPage';
import UserDashboardPage from '@/pages/UserDashboardPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AccPage from '@/pages/AccPage';
import UserProfilePage from '@/pages/UserProfilePage';
import DocumentsPage from '@/pages/DocumentsPage';
import NotificationsPage from '@/pages/NotificationsPage';
import AdhesionPage from '@/pages/AdhesionPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminApplicationsPage from '@/pages/admin/AdminApplicationsPage';
import AdminProjectsPage from '@/pages/admin/AdminProjectsPage';
import ElectronicSignaturePage from '@/pages/ElectronicSignaturePage';
import UserProjectsPage from '@/pages/UserProjectsPage';
import UserConsumptionPage from '@/pages/UserConsumptionPage';
import ScrollToTop from '@/components/ScrollToTop';
import { ContactSection } from '@/components/ContactSection';

function App() {
  const location = useLocation();
  let isAuthenticated = false;
  let isAdmin = false;

  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      isAuthenticated = true;
      isAdmin = user.isAdmin || false;
    }
  } catch (e) {
    console.error("Security error accessing localStorage:", e);
    isAuthenticated = false;
    isAdmin = false;
  }

  const showContactSection = ['/', '/projets', '/acc'].includes(location.pathname);

  const AdminRoute = () => (isAdmin ? <Outlet /> : <Navigate to="/connexion" state={{ from: location }} replace />);
  const UserRoute = () => (isAuthenticated && !isAdmin ? <Outlet /> : <Navigate to="/connexion" state={{ from: location }} replace />);
  const GuestRoute = () => (!isAuthenticated ? <Outlet /> : <Navigate to="/tableau-de-bord" replace />);

  return (
    <>
      <ScrollToTop />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projets" element={<ProjectsPage />} />
            <Route path="/projet/:projectId" element={<ProjectDetailPage />} />
            <Route path="/acc" element={<AccPage />} />
            
            <Route element={<GuestRoute />}>
              <Route path="/connexion" element={<LoginPage />} />
            </Route>

            <Route element={<UserRoute />}>
              <Route path="/tableau-de-bord" element={<UserDashboardPage />} />
              <Route path="/adhesion/:projectId" element={<AdhesionPage />} />
              <Route path="/profil" element={<UserProfilePage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/mes-projets" element={<UserProjectsPage />} />
              <Route path="/ma-consommation" element={<UserConsumptionPage />} />
              <Route path="/signature/:applicationId" element={<ElectronicSignaturePage />} />
            </Route>

            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="applications" element={<AdminApplicationsPage />} />
              <Route path="projects" element={<AdminProjectsPage />} />
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
        {showContactSection && <ContactSection />}
      </Layout>
    </>
  );
}

export default App;
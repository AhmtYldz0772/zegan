import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SiteConfigProvider } from './context/SiteConfigContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Layout from './components/layout/Layout';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminCrud from './pages/admin/AdminCrud';
import AdminSettings from './pages/admin/AdminSettings';
import AdminPricing from './pages/admin/AdminPricing';
import AdminMessages from './pages/admin/AdminMessages';

// Pages
import Home from './pages/Home';
import Leistungen from './pages/Leistungen';
import ServiceDetail from './pages/ServiceDetail';
import Referenzen from './pages/Referenzen';
import ProjectDetail from './pages/ProjectDetail';
import Bauwissen from './pages/Bauwissen';
import BlogDetail from './pages/BlogDetail';
import BaukostenRechner from './pages/BaukostenRechner';
import Kontakt from './pages/Kontakt';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <SiteConfigProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/leistungen" element={<Leistungen />} />
                <Route path="/leistungen/:slug" element={<ServiceDetail />} />
                <Route path="/referenzen" element={<Referenzen />} />
                <Route path="/referenzen/:slug" element={<ProjectDetail />} />
                <Route path="/bauwissen" element={<Bauwissen />} />
                <Route path="/bauwissen/:slug" element={<BlogDetail />} />
                <Route path="/baukosten-rechner" element={<BaukostenRechner />} />
                <Route path="/kontakt" element={<Kontakt />} />
              </Route>

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="categories" element={<AdminCrud collectionName="categories" />} />
                <Route path="projects" element={<AdminCrud collectionName="projects" richText />} />
                <Route path="blogs" element={<AdminCrud collectionName="blogs" richText />} />
                <Route path="team-members" element={<AdminCrud collectionName="teamMembers" />} />
                <Route path="reviews" element={<AdminCrud collectionName="reviews" />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="pricing" element={<AdminPricing />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SiteConfigProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

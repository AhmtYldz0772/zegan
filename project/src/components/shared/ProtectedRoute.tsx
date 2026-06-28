import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, firebaseReady } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-carbon-1000 p-10 text-white">Wird geladen...</div>;
  }

  if (!firebaseReady) {
    return <>{children}</>;
  }

  return user ? <>{children}</> : <Navigate to="/admin/login" replace />;
}

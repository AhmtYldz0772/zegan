import { Link } from 'react-router-dom';
import { Home, Construction } from 'lucide-react';
import Seo from '../components/shared/Seo';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Seite nicht gefunden"
        description="Die angeforderte Seite wurde nicht gefunden."
      />

      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-accent-500/10 border border-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Construction className="w-10 h-10 text-accent-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">
            Seite nicht gefunden
          </p>
          <Link to="/" className="btn-primary">
            <Home className="w-5 h-5" />
            Zurück zur Startseite
          </Link>
        </div>
      </section>
    </>
  );
}

import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hammer } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, firebaseReady } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');

    if (!firebaseReady) {
      navigate('/admin');
      return;
    }

    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Login fehlgeschlagen. Bitte Zugangsdaten prüfen.');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-carbon-1000 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded border border-white/10 bg-carbon-900 p-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-accent-500">
            <Hammer className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-sm text-gray-500">Firebase Auth geschützter Bereich</p>
          </div>
        </div>

        {!firebaseReady && (
          <div className="mb-5 rounded border border-accent-500/30 bg-accent-500/10 p-3 text-sm text-accent-200">
            Firebase .env ist nicht aktiv. Der Demo-Modus öffnet das Admin-Panel ohne Login.
          </div>
        )}

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-white">E-Mail</span>
          <input className="input-field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="mb-6 block">
          <span className="mb-2 block text-sm font-medium text-white">Passwort</span>
          <input className="input-field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>

        <button className="btn-primary w-full justify-center" type="submit">
          Einloggen
        </button>
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      </form>
    </main>
  );
}

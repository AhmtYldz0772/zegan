import { useProjects, useCategories, useBlogs } from '../../hooks/useData';
import { useState } from 'react';
import { Database } from 'lucide-react';
import { firebaseReady } from '../../lib/firebase';
import { seedFirestore } from '../../services/firestoreService';

export default function AdminDashboard() {
  const { data: projects } = useProjects();
  const { data: categories } = useCategories();
  const { data: blogs } = useBlogs();
  const [status, setStatus] = useState('');

  const stats = [
    { label: 'Projekte', value: projects.length },
    { label: 'Leistungen', value: categories.length },
    { label: 'Blogs', value: blogs.length },
    { label: 'Nachrichten', value: 0 },
  ];

  async function seed() {
    setStatus('Seed läuft...');
    try {
      await seedFirestore();
      setStatus('Demo-Inhalte wurden in Firestore angelegt.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Seed fehlgeschlagen.');
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Willkommen im Firebase Admin-Bereich</p>
      </div>
      <div className="card mb-8 flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-3">
          <Database className="h-5 w-5 text-accent-500" />
          <div>
            <div className="font-semibold text-white">Firestore Initialisierung</div>
            <p className="text-sm text-gray-500">
              {firebaseReady ? 'Firebase ist konfiguriert.' : 'Firebase .env fehlt, Fallback-Daten sind aktiv.'}
            </p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => void seed()} disabled={!firebaseReady}>
          Demo-Inhalte initialisieren
        </button>
      </div>
      {status && <p className="mb-6 text-sm text-gray-400">{status}</p>}

      {/* Stats */}
      <div className="mb-8 grid mobile-safe-grid gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-6">
            <div className="text-3xl font-bold text-accent-500 mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Schnellaktionen</h2>
          <div className="space-y-3">
            <a
              href="/admin/projects/new"
              className="block px-4 py-3 bg-accent-500/10 border border-accent-500/20 rounded text-accent-400 hover:bg-accent-500/20 text-sm transition-colors"
            >
              + Neues Projekt anlegen
            </a>
            <a
              href="/admin/blogs/new"
              className="block px-4 py-3 bg-accent-500/10 border border-accent-500/20 rounded text-accent-400 hover:bg-accent-500/20 text-sm transition-colors"
            >
              + Neuen Blog schreiben
            </a>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Systeminfo</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Modus</span>
              <span className="text-white">{firebaseReady ? 'Live' : 'Demo'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Datenbank</span>
              <span className="text-white">Firebase / Firestore</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Version</span>
              <span className="text-white">1.0.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Letzte Projekte</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="pb-3">Titel</th>
                <th className="pb-3">Kategorie</th>
                <th className="pb-3">Jahr</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.slice(0, 5).map((project) => (
                <tr key={project.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 text-white">{project.title}</td>
                  <td className="py-3 text-gray-400">{project.categorySlug}</td>
                  <td className="py-3 text-gray-400">{project.year}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded">
                      Veröffentlicht
                    </span>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    Keine Projekte vorhanden
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

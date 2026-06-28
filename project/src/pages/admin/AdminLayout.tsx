import { NavLink, Outlet } from 'react-router-dom';
import { Hammer, LayoutDashboard, FolderKanban, FileText, Settings, MessageSquare, LogOut, ChevronLeft, Users, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSiteConfigContext } from '../../context/SiteConfigContext';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/categories', label: 'Leistungen', icon: FolderKanban },
  { to: '/admin/projects', label: 'Projekte', icon: FolderKanban },
  { to: '/admin/blogs', label: 'Blogs', icon: FileText },
  { to: '/admin/team-members', label: 'Team', icon: Users },
  { to: '/admin/reviews', label: 'Bewertungen', icon: Star },
  { to: '/admin/messages', label: 'Nachrichten', icon: MessageSquare },
  { to: '/admin/settings', label: 'Einstellungen', icon: Settings },
];

export default function AdminLayout() {
  const { logout, firebaseReady } = useAuth();
  const { config } = useSiteConfigContext();
  const logoSrc = config.logo || '/logo.jpeg';

  return (
    <div className="min-h-screen bg-carbon-1000 md:flex">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-carbon-950/95 p-4 backdrop-blur md:hidden">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <img src={logoSrc} alt="Logo" className="h-10 w-10 flex-shrink-0 rounded object-cover" />
            <div className="min-w-0">
              <div className="truncate font-display font-bold text-white">Admin</div>
              <div className="text-xs text-gray-500">{firebaseReady ? 'Firebase aktiv' : 'Demo-Modus'}</div>
            </div>
          </div>
          <button
            onClick={() => void logout()}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded border border-white/10 text-gray-300"
            aria-label="Abmelden"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
        <nav className="-mx-4 overflow-x-auto px-4">
          <ul className="flex min-w-max gap-2 pb-1">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/admin'}
                    className={({ isActive }) =>
                      `flex min-h-10 items-center gap-2 rounded px-3 text-sm font-medium transition-all ${
                        isActive ? 'bg-accent-500 text-white' : 'bg-white/5 text-gray-300'
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {/* Sidebar */}
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-white/10 bg-carbon-900 md:flex">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Logo" className="h-10 w-10 rounded object-cover" />
            <div>
              <div className="font-display font-bold text-white">Admin</div>
              <div className="text-xs text-gray-500">{firebaseReady ? 'Firebase aktiv' : 'Demo-Modus'}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/admin'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-accent-500 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Zur Website
          </a>
          <button
            onClick={() => void logout()}
            className="mt-2 flex w-full items-center gap-3 rounded px-4 py-3 text-sm text-gray-400 transition-all hover:bg-white/5 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

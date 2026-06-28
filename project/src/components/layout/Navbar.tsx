import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteConfigContext } from '../../context/SiteConfigContext';

const navLinks = [
  { to: '/', label: 'Start' },
  { to: '/leistungen', label: 'Leistungen' },
  { to: '/referenzen', label: 'Referenzen' },
  { to: '/bauwissen', label: 'Bauwissen' },
  { to: '/baukosten-rechner', label: 'Kostenrechner' },
  { to: '/kontakt', label: 'Kontakt' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { config } = useSiteConfigContext();
  const isHomePage = location.pathname === '/';
  const logoSrc = config.logo || '/logo.jpeg';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-carbon-900/95 py-3 shadow-lg backdrop-blur-md'
          : isHomePage
            ? 'bg-transparent py-5'
            : 'bg-carbon-950/90 py-4 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <Link to="/" className="group flex min-w-0 items-center gap-3">
            <img src={logoSrc} alt="Logo" className="h-10 w-10 flex-shrink-0 rounded object-cover" />
            <span className="max-w-[62vw] truncate font-display text-base font-bold text-white transition-colors group-hover:text-accent-500 sm:max-w-none sm:text-xl">
              {config.companyName || 'Bauunternehmen'}
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-accent-500 ${
                    isActive
                      ? 'text-accent-500'
                      : scrolled || !isHomePage
                        ? 'text-white/90'
                        : 'text-white/80'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <Link to="/kontakt" className="btn-primary hidden text-sm lg:inline-flex">
            Projekt anfragen
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            data-testid="mobile-menu-toggle"
            className="relative z-[70] flex h-11 w-11 flex-shrink-0 items-center justify-center rounded border border-white/10 bg-carbon-950/70 text-white transition-colors hover:text-accent-500 lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 bottom-0 top-0 z-[60] bg-carbon-950/98 pt-20 backdrop-blur-lg lg:hidden"
        >
          <div className="flex h-full flex-col overflow-y-auto overscroll-contain py-5">
            <div className="container-custom flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded px-4 py-4 text-lg font-medium transition-all ${
                      isActive
                        ? 'bg-white/5 text-accent-500'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/kontakt"
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-6 w-full text-center"
              >
                Projekt anfragen
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

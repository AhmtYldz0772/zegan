import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useSiteConfigContext } from '../../context/SiteConfigContext';

const quickLinks = [
  { to: '/leistungen', label: 'Leistungen' },
  { to: '/referenzen', label: 'Referenzen' },
  { to: '/bauwissen', label: 'Bauwissen' },
  { to: '/baukosten-rechner', label: 'Baukosten-Rechner' },
  { to: '/kontakt', label: 'Kontakt' },
];

const legalLinks = [
  { to: '/impressum', label: 'Impressum' },
  { to: '/datenschutz', label: 'Datenschutz' },
  { to: '/agb', label: 'AGB' },
];

export default function Footer() {
  const { config } = useSiteConfigContext();
  const logoSrc = config.logo || '/logo.jpeg';

  return (
    <footer className="bg-carbon-950 border-t border-white/10">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <img src={logoSrc} alt="Logo" className="h-10 w-10 rounded object-cover" />
              <span className="font-display font-bold text-xl text-white group-hover:text-accent-500 transition-colors">
                {config.companyName}
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Ihr verlässlicher Partner für Bauvorhaben in Berlin. Qualität, Termintreue und Transparenz seit über 15 Jahren.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {config.socialLinks?.facebook && (
                <a
                  href={config.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-accent-500 rounded flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {config.socialLinks?.instagram && (
                <a
                  href={config.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-accent-500 rounded flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {config.socialLinks?.linkedin && (
                <a
                  href={config.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-accent-500 rounded flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {config.socialLinks?.youtube && (
                <a
                  href={config.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-accent-500 rounded flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-6">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-accent-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-6">Kontakt</h3>
            <ul className="space-y-4">
              {config.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">{config.address}</span>
                </li>
              )}
              {config.phone && (
                <li>
                  <a
                    href={`tel:${config.phone}`}
                    className="flex items-center gap-3 text-gray-400 hover:text-accent-500 transition-colors text-sm"
                  >
                    <Phone className="w-5 h-5 text-accent-500" />
                    {config.phone}
                  </a>
                </li>
              )}
              {config.email && (
                <li>
                  <a
                    href={`mailto:${config.email}`}
                    className="flex items-center gap-3 text-gray-400 hover:text-accent-500 transition-colors text-sm"
                  >
                    <Mail className="w-5 h-5 text-accent-500" />
                    {config.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-6">Rechtliches</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-accent-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            {config.footerText || '© 2024 Bauunternehmen Berlin. Alle Rechte vorbehalten.'}
          </p>
          <p className="text-gray-600 text-xs">
            Mit Liebe für Berlin gebaut
          </p>
        </div>
      </div>
    </footer>
  );
}

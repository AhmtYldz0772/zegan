import { Shield, Award, Clock, Users, CheckCircle, Leaf } from 'lucide-react';

const trustPoints = [
  { icon: Shield, title: 'Qualität & Sicherheit', description: 'Zertifizierte Bauqualität nach höchsten Standards' },
  { icon: Award, title: '15+ Jahre Erfahrung', description: 'Über 15 Jahre Expertise im Bauwesen' },
  { icon: Clock, title: 'Termingerechte Fertigstellung', description: '98% aller Projekte pünktlich abgeschlossen' },
  { icon: Users, title: 'Eigene Fachmannschaften', description: 'Eigene qualifizierte Bauteams vor Ort' },
  { icon: Leaf, title: 'Nachhaltiges Bauen', description: 'Umweltgerechte Bauweisen und Materialien' },
  { icon: CheckCircle, title: 'Festpreisgarantie', description: 'Transparente Preisgestaltung ohne versteckte Kosten' },
];

export default function TrustSection() {
  return (
    <section className="section-padding bg-carbon-1000">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="label">Warum wir?</span>
          <h2 className="heading-lg text-white mt-4 mb-6">
            Ihr Vertrauen ist unser Kapital
          </h2>
          <p className="subheading mx-auto text-gray-400">
            Mit über 500 erfolgreich abgeschlossenen Projekten sind wir der verlässliche Partner für Ihr Bauvorhaben.
          </p>
        </div>

        {/* Trust Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div
                key={index}
                className={`card p-6 animate-slide-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-500/10 border border-accent-500/20 rounded flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

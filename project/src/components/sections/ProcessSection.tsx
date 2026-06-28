import { Search, FileText, HardHat, CheckCircle2 } from 'lucide-react';

const processSteps = [
  {
    icon: Search,
    title: 'Analyse',
    description: 'Wir analysieren Ihr Bauprojekt detailliert und erstellen eine professionelle Bestandsaufnahme.',
    step: '01',
  },
  {
    icon: FileText,
    title: 'Planung',
    description: 'Gemeinsam entwickeln wir ein maßgeschneidertes Konzept und einen transparenten Kostenrahmen.',
    step: '02',
  },
  {
    icon: HardHat,
    title: 'Ausführung',
    description: 'Unsere erfahrenen Bauexperten setzen Ihr Projekt mit höchster Qualität um.',
    step: '03',
  },
  {
    icon: CheckCircle2,
    title: 'Übergabe',
    description: 'Nach finaler Qualitätskontrolle übergeben wir Ihnen Ihr fertiggestelltes Bauprojekt.',
    step: '04',
  },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-carbon-950">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="label">Unser Prozess</span>
          <h2 className="heading-lg text-white mt-4 mb-6">
            Von der Idee zur Fertigstellung
          </h2>
          <p className="subheading mx-auto text-gray-400">
            In vier transparenten Schritten begleiten wir Sie durch Ihr Bauprojekt – von der ersten Beratung bis zur finalen Übergabe.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-[72px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-accent-500/0 via-accent-500/50 to-accent-500/0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className={`text-center animate-slide-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Step Number */}
                  <div className="relative inline-flex items-center justify-center w-20 h-20 bg-carbon-900 border border-white/10 rounded mb-6">
                    <IconComponent className="w-8 h-8 text-accent-500" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {step.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

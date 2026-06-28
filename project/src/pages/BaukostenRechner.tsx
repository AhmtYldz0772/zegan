import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Info } from 'lucide-react';
import Seo from '../components/shared/Seo';
import { useCategories, usePricingRules } from '../hooks/useData';
import { formatPrice } from '../utils/helpers';
import type { ObjectType, Complexity } from '../types';
import { objectTypes, complexityLevels } from '../data/defaultData';

export default function BaukostenRechner() {
  const { data: categories } = useCategories();
  const { data: pricing } = usePricingRules();

  const [selectedService, setSelectedService] = useState<string>('');
  const [objectType, setObjectType] = useState<ObjectType>('apartment');
  const [area, setArea] = useState<number>(100);
  const [complexity, setComplexity] = useState<Complexity>('medium');

  const estimatedCost = useMemo(() => {
    if (!selectedService) return null;

    const basePrice = pricing.basePrice;
    const areaCost = area * pricing.areaFactor;
    const complexityMultiplier = pricing.complexityFactors[complexity];
    const objectMultiplier = pricing.objectMultipliers[objectType] || 1;
    const serviceMultiplier = pricing.serviceMultipliers[selectedService] || 1;

    const total = (basePrice + areaCost) * complexityMultiplier * objectMultiplier * serviceMultiplier;

    return Math.round(total);
  }, [selectedService, area, complexity, objectType, pricing]);

  return (
    <>
      <Seo
        title="Baukosten-Rechner"
        description="Berechnen Sie die geschätzten Kosten für Ihr Bauvorhaben. Unverbindliche Vorkalkulation."
        keywords={['Baukosten', 'Rechner', 'Kostenkalkulation', 'Bauvorhaben']}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-carbon-950">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="label">Kostenkalkulation</span>
            <h1 className="heading-xl text-white mt-4 mb-6">
              Baukosten-Rechner
            </h1>
            <p className="text-xl text-gray-400">
              Erhalten Sie eine unverbindliche Kostenschätzung für Ihr Bauvorhaben. Die Berechnung basiert auf Durchschnittswerten und dient als erste Orientierung.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding bg-carbon-1000">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-accent-500/10 border border-accent-500/20 rounded flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-accent-500" />
                </div>
                <h2 className="text-xl font-bold text-white">Ihre Projektdaten</h2>
              </div>

              <div className="space-y-6">
                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Gewünschte Leistung</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Bitte wählen...</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Object Type */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Objekttyp</label>
                  <select
                    value={objectType}
                    onChange={(e) => setObjectType(e.target.value as ObjectType)}
                    className="select-field"
                  >
                    {objectTypes.map((obj) => (
                      <option key={obj.value} value={obj.value}>
                        {obj.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Fläche in m²: <span className="text-accent-500">{area}</span>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="1000"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2 bg-carbon-700 rounded appearance-none cursor-pointer accent-accent-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>20 m²</span>
                    <span>1000 m²</span>
                  </div>
                </div>

                {/* Complexity */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">Komplexität</label>
                  <div className="grid grid-cols-3 gap-3">
                    {complexityLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setComplexity(level.value as Complexity)}
                        className={`px-4 py-3 rounded text-sm font-medium transition-all ${
                          complexity === level.value
                            ? 'bg-accent-500 text-white'
                            : 'bg-carbon-800 text-gray-400 hover:bg-carbon-700 hover:text-white'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Result */}
            <div>
              <div className="card p-8 mb-6">
                <h3 className="text-lg font-semibold text-white mb-6">Geschätzte Baukosten</h3>
                {estimatedCost !== null ? (
                  <div>
                    <div className="text-5xl font-bold text-accent-500 mb-4">
                      {formatPrice(estimatedCost)}
                    </div>
                    <p className="text-gray-400 text-sm">
                      Basierend auf Ihren Eingaben. Der tatsächliche Preis kann je nach Projekt variieren.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl font-bold text-gray-600 mb-4">
                      -- €
                    </div>
                    <p className="text-gray-500 text-sm">
                      Bitte wählen Sie eine Leistung aus.
                    </p>
                  </div>
                )}
              </div>

              <div className="card p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-400 text-sm">
                    Diese Kostenschätzung dient als Orientierungshilfe. Für ein detailliertes Angebot kontaktieren Sie uns.
                  </p>
                </div>
              </div>

              {estimatedCost !== null && (
                <Link to="/kontakt" className="btn-primary w-full justify-center">
                  Unverbindliches Angebot anfordern
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

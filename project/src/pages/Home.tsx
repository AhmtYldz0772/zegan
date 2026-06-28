import Seo from '../components/shared/Seo';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection';
import ProcessSection from '../components/sections/ProcessSection';
import TrustSection from '../components/sections/TrustSection';
import CTASection from '../components/sections/CTASection';
import QuickQuoteSection from '../components/sections/QuickQuoteSection';
import TeamSection from '../components/sections/TeamSection';
import ReviewsSection from '../components/sections/ReviewsSection';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import { useSiteConfigContext } from '../context/SiteConfigContext';

export default function Home() {
  const { config } = useSiteConfigContext();

  return (
    <>
      <Seo
        title={config.globalSeoTitle || 'Bauunternehmen Berlin | Sanierung & Neubau'}
        description={config.globalSeoDescription || 'Premium Bauunternehmen in Berlin. Sanierung, Neubau, Ausbau und mehr.'}
        keywords={config.globalSeoKeywords}
      />

      {/* Hero */}
      <HeroSection />

      {/* Quick Quote */}
      <QuickQuoteSection />

      {/* Services */}
      <ServicesSection />

      {/* Featured Projects */}
      <FeaturedProjectsSection />

      {/* Before/After Section */}
      <section className="section-padding bg-carbon-950">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label">Vorher / Nachher</span>
              <h2 className="heading-lg text-white mt-4 mb-6">
                Transformationen aus erster Hand
              </h2>
              <p className="text-gray-400 mb-6">
                Unsere Projekte sprechen für sich. Sehen Sie, wie wir Räume transformieren und Gebäude revitalisieren – von marren Altbauten zu modernem Wohnkomfort.
              </p>
              <p className="text-gray-400">
                Jedes Projekt zeigt unser Engagement für Qualität, Detailverliebtheit und die Umsetzung höchster Baustandards.
              </p>
            </div>
            <BeforeAfterSlider
              beforeImage="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
              afterImage="https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSection />

      {/* Trust */}
      <TrustSection />

      {/* Team */}
      <TeamSection />

      {/* Reviews */}
      <ReviewsSection />

      {/* CTA */}
      <CTASection />
    </>
  );
}

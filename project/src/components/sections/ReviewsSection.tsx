import { useReviews } from '../../hooks/useData';

export default function ReviewsSection() {
  const { data: reviews, loading } = useReviews();

  if (loading) return null;

  return (
    <section className="section-padding bg-carbon-1000">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span className="label">Kundenbewertungen</span>
          <h2 className="heading-lg mt-4 mb-6 text-white">Was unsere Kunden sagen</h2>
          <p className="subheading mx-auto text-gray-400">
            Vertrauen, Qualität und ein reibungsloser Ablauf sind die Basis unserer Projekte.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="card p-6">
              <div className="mb-4 flex items-center gap-3">
                <img src={review.avatar || '/logo.jpeg'} alt={review.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-white">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="mb-4 flex gap-1 text-accent-500">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-gray-400">“{review.text}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

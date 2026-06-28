import { useTeamMembers } from '../../hooks/useData';

export default function TeamSection() {
  const { data: teamMembers, loading } = useTeamMembers();

  if (loading) return null;

  return (
    <section className="section-padding bg-carbon-950">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span className="label">Unser Team</span>
          <h2 className="heading-lg mt-4 mb-6 text-white">Unsere Experten hinter jedem Projekt</h2>
          <p className="subheading mx-auto text-gray-400">
            Fachleute, die mit Erfahrung, Präzision und Verantwortung jedes Bauvorhaben begleiten.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="card overflow-hidden p-0">
              <img src={member.photo || '/logo.jpeg'} alt={member.name} className="h-72 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="mt-2 text-sm text-accent-500">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

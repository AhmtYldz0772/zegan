import { useMessages } from '../../hooks/useData';

export default function AdminMessages() {
  const { data } = useMessages();

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-white">Nachrichten</h1>
      <div className="mt-6 space-y-4">
        {data.map((message) => (
          <article key={message.id} className="card p-5">
            <div className="flex flex-wrap justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">{message.name}</h2>
              <span className="text-sm text-accent-400">{message.service}</span>
            </div>
            <p className="mt-2 break-words text-sm text-gray-500">{message.email} · {message.phone}</p>
            <p className="mt-4 text-gray-300">{message.message}</p>
            {!!message.attachments?.length && (
              <div className="mt-4 flex flex-wrap gap-2">
                {message.attachments.map((url) => (
                  <a key={url} href={url} target="_blank" rel="noreferrer" className="rounded border border-white/10 px-3 py-2 text-sm text-white">
                    Anhang öffnen
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
        {!data.length && <p className="text-gray-500">Noch keine Nachrichten vorhanden.</p>}
      </div>
    </section>
  );
}

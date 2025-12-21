import Navigation from '@/components/Navigation';
import episodesData from '@/data/episodes.json';
import { useParams, Link } from 'react-router-dom';

const EpisodePage = () => {
  const { id } = useParams<{ id: string }>();
  const episode = episodesData.episodes.find((e: any) => e.id === id);

  if (!episode) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          <div className="max-w-3xl mx-auto px-6 py-24 text-center">
            <h2 className="text-2xl font-philosophy">Episodio no encontrado</h2>
            <p className="mt-4 text-muted-foreground">No encontramos el episodio solicitado.</p>
            <div className="mt-6">
              <Link to="/podcast" className="text-primary underline">Volver al Podcast</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-6 text-sm text-muted-foreground">Episodio {episode.id.replace('ep','')}</div>
          <h1 className="font-philosophy text-3xl text-foreground">{episode.title}</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">{episode.description}</p>

          <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
            <div>Duración: {episode.duration}</div>
            <div>Fecha: {new Date(episode.date).toLocaleDateString('es-ES')}</div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium">Nodos relacionados</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {episode.nodes.map((n: string) => (
                <span key={n} className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">{n}</span>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <Link to="/podcast" className="text-primary underline">← Volver al listado de episodios</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EpisodePage;

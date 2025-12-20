import Navigation from '@/components/Navigation';
import EpisodeCard from '@/components/EpisodeCard';
import episodesData from '@/data/episodes.json';
import { Headphones, Rss } from 'lucide-react';

const Podcast = () => {
  const publishedEpisodes = episodesData.episodes.filter(e => e.state === 'published');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 border-b border-border relative overflow-hidden">
          {/* Background gradient */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, hsl(38 70% 50% / 0.15) 0%, transparent 60%)'
            }}
          />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-primary/10 border border-primary/30">
                  <Headphones className="w-5 h-5 text-primary" />
                </div>
                <span className="font-system text-xs text-primary uppercase tracking-widest">
                  Podcast PlatonIA
                </span>
              </div>

              <h1 className="font-philosophy text-4xl md:text-5xl text-foreground leading-tight">
                Episodios que no te dejan en paz
              </h1>
              
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Cada episodio es una exploración de las tensiones del mapa Lagrange. 
                No buscamos respuestas definitivas — buscamos preguntas que incomoden productivamente.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-system text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors">
                  <Rss className="w-4 h-4" />
                  Suscribirse
                </button>
                <span className="text-sm text-muted-foreground font-system">
                  {publishedEpisodes.length} episodios disponibles
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Episodes List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {publishedEpisodes.map((episode) => (
                <EpisodeCard 
                  key={episode.id} 
                  episode={episode as any}
                  onPlay={() => console.log('Play:', episode.id)}
                />
              ))}
            </div>

            {publishedEpisodes.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground italic">
                  Próximamente: episodios que cuestionarán tus certezas.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* About the format */}
        <section className="py-16 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-philosophy text-3xl text-foreground text-center">
              Formato del Podcast
            </h2>
            
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/30 mb-4">
                  <span className="font-philosophy text-lg text-primary">1</span>
                </div>
                <h3 className="font-philosophy text-lg text-foreground">Tensión</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Identificamos un nodo del mapa en estado de activación.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/30 mb-4">
                  <span className="font-philosophy text-lg text-primary">2</span>
                </div>
                <h3 className="font-philosophy text-lg text-foreground">Dialéctica</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Exploramos las contradicciones sin pretender resolverlas.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/30 mb-4">
                  <span className="font-philosophy text-lg text-primary">3</span>
                </div>
                <h3 className="font-philosophy text-lg text-foreground">Pregunta</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Terminamos con una pregunta socrática más incómoda que el inicio.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Podcast;

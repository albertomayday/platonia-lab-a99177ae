import { useState } from "react";
import Navigation from "@/components/Navigation";
import EpisodeCard from "@/components/EpisodeCard";
import AudioPlayer from "@/components/AudioPlayer";
import TranscriptViewer from "@/components/TranscriptViewer";
import { usePodcastEpisodes } from "@/hooks/queries";
import { getTranscript } from "@/data/transcripts";
import type { Episode } from "@/types";
import { Headphones, Rss, X, Loader2 } from "lucide-react";

const Podcast = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const { data: episodes = [], isLoading, error } = usePodcastEpisodes();

  const publishedEpisodes = episodes.filter((e) => e.is_published);

  const selectedEpisodeData = selectedEpisode
    ? publishedEpisodes.find((e) => e.id === selectedEpisode)
    : null;
  const transcript = selectedEpisode ? getTranscript(selectedEpisode) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 border-b border-border relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, hsl(38 70% 50% / 0.15) 0%, transparent 60%)",
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
                Cada episodio es una exploración de las tensiones del mapa
                Lagrange. No buscamos respuestas definitivas — buscamos
                preguntas que incomoden productivamente.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-system text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors">
                  <Rss className="w-4 h-4" />
                  Suscribirse
                </button>
                <span className="text-sm text-muted-foreground font-system">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Cargando...
                    </span>
                  ) : (
                    `${publishedEpisodes.length} episodios disponibles`
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Player Section */}
        {selectedEpisodeData && transcript && (
          <section className="py-8 bg-card border-b border-border">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-system text-xs text-primary uppercase">
                  Reproduciendo
                </span>
                <button
                  onClick={() => setSelectedEpisode(null)}
                  className="p-1 hover:bg-secondary rounded transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <AudioPlayer
                  title={selectedEpisodeData.title}
                  episodeNumber={selectedEpisodeData.id.replace("ep", "")}
                  duration={selectedEpisodeData.duration}
                  onTimeUpdate={setCurrentTime}
                />
                <TranscriptViewer
                  title={transcript.title}
                  segments={transcript.segments}
                  currentTime={currentTime}
                />
              </div>
            </div>
          </section>
        )}

        {/* Episodes List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-20 text-muted-foreground">
                Error al cargar episodios
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {publishedEpisodes.map((episode) => (
                  <EpisodeCard
                    key={episode.id}
                    episode={episode as any}
                    onPlay={() => setSelectedEpisode(episode.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Podcast;

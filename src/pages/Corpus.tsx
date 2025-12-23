import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CorpusCard from "@/components/CorpusCard";
import { useCorpusEntries } from "@/hooks/queries";
import { BookOpen, Loader2 } from "lucide-react";

const Corpus = () => {
  const {
    data: entries = [],
    isLoading,
    error,
  } = useCorpusEntries({ status: "published" });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-16">
        <section className="py-16 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-primary/10 border border-primary/30">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <span className="font-system text-xs text-primary uppercase tracking-widest">
                Lectura Crítica
              </span>
            </div>

            <h1 className="font-philosophy text-4xl md:text-5xl text-foreground">
              Corpus Filosófico
            </h1>

            <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
              Textos que exploran las tensiones del mapa. No buscan resolver —
              buscan mantener abierta la pregunta.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-20 text-muted-foreground">
                Error al cargar entradas
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No hay entradas publicadas
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {entries.map((entry) => (
                  <CorpusCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Corpus;

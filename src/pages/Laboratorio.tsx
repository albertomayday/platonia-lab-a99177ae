import { useState } from 'react';
import Navigation from '@/components/Navigation';
import LabDemo from '@/components/LabDemo';
import { Beaker, Lock, Sparkles, AlertTriangle } from 'lucide-react';

const Laboratorio = () => {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Header */}
        <section className="py-16 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-primary/10 border border-primary/30">
                <Beaker className="w-5 h-5 text-primary" />
              </div>
              <span className="font-system text-xs text-primary uppercase tracking-widest">
                Capa Academia
              </span>
            </div>

            <h1 className="font-philosophy text-4xl md:text-5xl text-foreground">
              Laboratorio
            </h1>
            
            <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
              Aquí es donde el sistema aprende. Análisis IA sobre corpus, preguntas y noticias externas. 
              Generación de nuevas conexiones. Feedback controlado.
            </p>
          </div>
        </section>

        {/* Access Warning */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-card border border-amber-dim/30 rounded-lg p-8">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-amber-dim/20">
                  <Lock className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <h2 className="font-philosophy text-xl text-foreground">
                    Acceso Restringido
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    El laboratorio completo requiere autenticación. 
                    Esta es una vista previa de las capacidades del sistema.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Features */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Prompt Editor Preview */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h3 className="font-philosophy text-lg text-foreground">
                    Editor de Prompts
                  </h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Construye prompts que crucen el corpus filosófico con las tensiones del mapa.
                </p>

                <LabDemo />
              </div>

              {/* Analysis Capabilities */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-primary" />
                  <h3 className="font-philosophy text-lg text-foreground">
                    Capacidades de Análisis
                  </h3>
                </div>

                <ul className="space-y-4">
                  {[
                    {
                      title: 'Cruce Corpus-Tensiones',
                      desc: 'Encuentra conexiones no evidentes entre textos filosóficos y nodos del mapa'
                    },
                    {
                      title: 'Generación de Preguntas',
                      desc: 'Produce nuevas preguntas socráticas basadas en el análisis de tensiones'
                    },
                    {
                      title: 'Propuestas de Episodio',
                      desc: 'Sugiere temas de podcast basados en nodos en estado de activación'
                    },
                    {
                      title: 'Análisis de Noticias',
                      desc: 'Cruza noticias externas con el marco conceptual del sistema'
                    }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div>
                        <span className="text-foreground text-sm font-medium">{item.title}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* System Stats */}
        <section className="py-12 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="font-philosophy text-xl text-foreground text-center mb-8">
              Estado del Sistema
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Nodos', value: '8', sub: 'en el mapa' },
                { label: 'Conexiones', value: '12', sub: 'activas' },
                { label: 'Preguntas', value: '6', sub: 'socráticas' },
                { label: 'Episodios', value: '3', sub: 'publicados' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 bg-background border border-border rounded-lg">
                  <span className="block font-philosophy text-3xl text-primary">{stat.value}</span>
                  <span className="block text-sm text-foreground mt-1">{stat.label}</span>
                  <span className="block text-xs text-muted-foreground">{stat.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-border">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="font-philosophy text-2xl text-foreground">
              ¿Quieres contribuir al sistema?
            </h2>
            <p className="mt-4 text-muted-foreground">
              El laboratorio está diseñado para que el sistema aprenda de sus errores. 
              Si tienes ideas que cuestionen las nuestras, queremos escucharlas.
            </p>
            <button className="mt-8 px-6 py-3 rounded-lg border border-primary/50 text-primary font-system text-sm uppercase tracking-wider hover:bg-primary/10 transition-colors">
              Solicitar Acceso
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Laboratorio;

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import LagrangeMap from '@/components/LagrangeMap';
import SocraticQuestion from '@/components/SocraticQuestion';
import questionsData from '@/data/socraticQuestions.json';
import nodesData from '@/data/nodes.json';

interface Node {
  id: string;
  label: string;
  axis: string;
  description: string;
  state: string;
}

const Mapa = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const relatedQuestions = selectedNode
    ? questionsData.questions.filter(q => 
        (q.relatedNodes as string[]).includes(selectedNode.id)
      )
    : [];

  const getStateStats = () => {
    const nodes = nodesData.nodes;
    return {
      active: nodes.filter(n => n.state === 'active').length,
      latent: nodes.filter(n => n.state === 'latent').length,
      saturated: nodes.filter(n => n.state === 'saturated').length,
      total: nodes.length,
    };
  };

  const stats = getStateStats();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Header */}
        <section className="py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="font-system text-xs text-primary uppercase tracking-widest">
                  Capa Dialéctica
                </span>
                <h1 className="mt-2 font-philosophy text-4xl md:text-5xl text-foreground">
                  Mapa Lagrange
                </h1>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  Un sistema de conceptos en tensión. Cada nodo es un punto de equilibrio 
                  inestable entre fuerzas opuestas. Haz clic para explorar las conexiones.
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 font-system text-sm">
                <div className="text-center">
                  <span className="block text-2xl text-primary">{stats.active}</span>
                  <span className="text-xs text-muted-foreground">Activos</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl text-latent">{stats.latent}</span>
                  <span className="text-xs text-muted-foreground">Latentes</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl text-tension">{stats.saturated}</span>
                  <span className="text-xs text-muted-foreground">Saturados</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Map */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-lg p-4 h-[600px]">
                  <LagrangeMap onNodeSelect={(node) => setSelectedNode(node)} />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Legend */}
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="font-philosophy text-lg text-foreground mb-4">Leyenda</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">
                        <span className="text-foreground">Activo</span> — En producción dialéctica
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-latent" />
                      <span className="text-sm text-muted-foreground">
                        <span className="text-foreground">Latente</span> — Pendiente de activación
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-tension" />
                      <span className="text-sm text-muted-foreground">
                        <span className="text-foreground">Saturado</span> — Tensión máxima
                      </span>
                    </div>
                  </div>
                </div>

                {/* Selected node details */}
                {selectedNode && (
                  <div className="bg-card border border-primary/30 rounded-lg p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-system text-xs text-primary uppercase">
                          Nodo Seleccionado
                        </span>
                        <h3 className="mt-1 font-philosophy text-xl text-foreground">
                          {selectedNode.label}
                        </h3>
                      </div>
                      <span className="font-system text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                        {selectedNode.axis}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {selectedNode.description}
                    </p>
                  </div>
                )}

                {/* Related questions */}
                {relatedQuestions.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-philosophy text-lg text-foreground">
                      Preguntas Relacionadas
                    </h3>
                    {relatedQuestions.map((q) => (
                      <SocraticQuestion key={q.id} question={q as any} />
                    ))}
                  </div>
                )}

                {/* Empty state */}
                {!selectedNode && (
                  <div className="bg-card border border-dashed border-border rounded-lg p-8 text-center">
                    <p className="text-sm text-muted-foreground italic">
                      Selecciona un nodo del mapa para explorar sus tensiones y preguntas asociadas.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Mapa;

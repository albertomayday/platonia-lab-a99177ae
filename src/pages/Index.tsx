import { Link } from "react-router-dom";
import { ArrowRight, Brain, Zap, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import SocraticQuestion from "@/components/SocraticQuestion";
import { useRandomSocraticQuestions } from "@/hooks/queries";

const Index = () => {
  const { data: featuredQuestions = [], isLoading } =
    useRandomSocraticQuestions(3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 30% 40%, hsl(38 70% 50% / 0.15) 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                "radial-gradient(ellipse at 70% 60%, hsl(220 40% 45% / 0.2) 0%, transparent 40%)",
            }}
          />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(38 70% 50%) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(38 70% 50%) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Tagline */}
          <div className="fade-in-up opacity-0 stagger-1">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 font-system text-xs text-primary uppercase tracking-widest">
              Sistema de Pensamiento Crítico
            </span>
          </div>

          {/* Main heading */}
          <h1 className="fade-in-up opacity-0 stagger-2 mt-8 font-philosophy text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.1] tracking-tight">
            Platon<span className="text-primary">IA</span>
          </h1>

          {/* Subtitle */}
          <p className="fade-in-up opacity-0 stagger-3 mt-6 max-w-2xl mx-auto font-philosophy text-xl md:text-2xl text-muted-foreground italic leading-relaxed">
            Un sistema que obliga a pensar
            <span className="text-foreground">
              {" "}
              incluso cuando intenta automatizar el pensamiento.
            </span>
          </p>

          {/* Description */}
          <p className="fade-in-up opacity-0 stagger-4 mt-8 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            No es una web. No es un podcast. No es un experimento de IA. Es un
            artefacto dialéctico que devuelve preguntas mejor formuladas que tus
            respuestas.
          </p>

          {/* CTA Buttons */}
          <div className="fade-in-up opacity-0 stagger-5 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/mapa"
              className="group flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-system text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              Explorar el Mapa
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/podcast"
              className="flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-system text-sm uppercase tracking-wider hover:bg-secondary hover:border-primary/30 transition-all"
            >
              Escuchar Podcast
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* What is PlatonIA */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-system text-xs text-primary uppercase tracking-widest">
                El Sistema
              </span>
              <h2 className="mt-4 font-philosophy text-4xl text-foreground leading-tight">
                ¿Qué es el Sistema PlatonIA?
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                PlatonIA es un reactor dialéctico: un sistema que cruza
                filosofía crítica, inteligencia artificial y tensiones
                conceptuales para generar pensamiento, no respuestas
                prefabricadas.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Cada nodo del mapa es un concepto en tensión. Cada pregunta
                socrática es una provocación estructurada. Cada episodio del
                podcast es una exploración de contradicciones productivas.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Brain,
                  title: "Crítica Activa",
                  desc: "No acepta respuestas, genera preguntas",
                },
                {
                  icon: Zap,
                  title: "Tensión Productiva",
                  desc: "El conflicto como método de conocimiento",
                },
                {
                  icon: Eye,
                  title: "Transparencia Radical",
                  desc: "El poder visible es poder auditable",
                },
                {
                  icon: ArrowRight,
                  title: "Retroalimentación",
                  desc: "Todo output vuelve a ser input",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors group"
                >
                  <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="mt-3 font-philosophy text-sm text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Questions */}
      <section className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-system text-xs text-primary uppercase tracking-widest">
              Preguntas Socráticas
            </span>
            <h2 className="mt-4 font-philosophy text-4xl text-foreground">
              ¿Puedes responder sin evadir?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredQuestions.map((question) => (
              <SocraticQuestion key={question.id} question={question as any} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/mapa"
              className="inline-flex items-center gap-2 text-primary font-system text-sm hover:underline"
            >
              Explorar todas las tensiones
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Warning/Manifesto Section */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block p-1 rounded-full bg-tension/10 border border-tension/30 mb-8">
            <span className="px-4 py-1 font-system text-xs text-tension uppercase tracking-widest">
              Advertencia
            </span>
          </div>

          <p className="font-philosophy text-2xl md:text-3xl text-foreground leading-relaxed italic">
            "Si esto fracasa, no será por falta de técnica.
            <br />
            <span className="text-primary">
              Será porque a la gente no le gusta que le devuelvan preguntas
              mejor formuladas que sus respuestas."
            </span>
          </p>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              PlatonIA no es neutral. No es objetivo. No es cómodo.
              <br />
              Es un sistema diseñado para incomodar productivamente.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="font-philosophy text-primary text-sm">π</span>
            </div>
            <span className="font-philosophy text-foreground">
              Platon<span className="text-primary">IA</span>
            </span>
          </div>

          <div className="flex items-center gap-6 font-system text-sm text-muted-foreground">
            <Link
              to="/mapa"
              className="hover:text-foreground transition-colors"
            >
              Mapa
            </Link>
            <Link
              to="/podcast"
              className="hover:text-foreground transition-colors"
            >
              Podcast
            </Link>
            <Link
              to="/laboratorio"
              className="hover:text-foreground transition-colors"
            >
              Laboratorio
            </Link>
          </div>

          <p className="font-system text-xs text-muted-foreground">
            Sistema de Pensamiento Crítico © 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

interface Question {
  id: string;
  text: string;
  axis: string;
  level: number;
  tension: string;
  state: 'active' | 'latent' | 'saturated';
}

interface SocraticQuestionProps {
  question: Question;
  onExplore?: () => void;
}

const SocraticQuestion = ({ question, onExplore }: SocraticQuestionProps) => {
  const getStateColor = (state: string) => {
    switch (state) {
      case 'active': return 'border-primary/50 bg-primary/5';
      case 'latent': return 'border-latent/50 bg-latent/5';
      case 'saturated': return 'border-tension/50 bg-tension/5';
      default: return 'border-border bg-card';
    }
  };

  const getStateIndicator = (state: string) => {
    switch (state) {
      case 'active': return 'bg-primary';
      case 'latent': return 'bg-latent';
      case 'saturated': return 'bg-tension';
      default: return 'bg-muted';
    }
  };

  return (
    <div 
      className={`
        relative p-5 rounded-lg border transition-all duration-300
        hover:shadow-lg hover:border-primary/30 group cursor-pointer
        ${getStateColor(question.state)}
      `}
      onClick={onExplore}
    >
      {/* State indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${getStateIndicator(question.state)}`} />
        <span className="font-system text-xs text-muted-foreground uppercase">
          {question.state}
        </span>
      </div>

      {/* Question text */}
      <p className="font-philosophy text-lg text-foreground leading-relaxed pr-20 italic">
        "{question.text}"
      </p>

      {/* Metadata */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-system">
        <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground">
          {question.axis}
        </span>
        <span className="text-muted-foreground">
          Nivel {question.level}
        </span>
        <span className="text-muted-foreground">
          Tensión: {question.tension}
        </span>
      </div>

      {/* Hover action hint */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="font-system text-xs text-primary">
          Explorar →
        </span>
      </div>
    </div>
  );
};

export default SocraticQuestion;

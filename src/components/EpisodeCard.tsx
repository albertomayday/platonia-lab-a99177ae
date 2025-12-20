import { Play, Clock, Calendar } from 'lucide-react';

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  nodes: string[];
  state: 'published' | 'draft';
}

interface EpisodeCardProps {
  episode: Episode;
  onPlay?: () => void;
}

const EpisodeCard = ({ episode, onPlay }: EpisodeCardProps) => {
  return (
    <div className="group relative p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
      {/* Play button overlay */}
      <button
        onClick={onPlay}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:bg-primary/20 transition-all duration-300"
      >
        <Play className="w-5 h-5 text-primary ml-0.5" />
      </button>

      {/* Episode number */}
      <span className="font-system text-xs text-primary uppercase tracking-wider">
        Episodio {episode.id.replace('ep', '')}
      </span>

      {/* Title */}
      <h3 className="mt-2 font-philosophy text-xl text-foreground group-hover:text-primary transition-colors pr-16">
        {episode.title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {episode.description}
      </p>

      {/* Related nodes */}
      <div className="mt-4 flex flex-wrap gap-2">
        {episode.nodes.map((node) => (
          <span
            key={node}
            className="px-2 py-1 rounded-full bg-secondary text-xs font-system text-secondary-foreground capitalize"
          >
            {node}
          </span>
        ))}
      </div>

      {/* Metadata footer */}
      <div className="mt-4 pt-4 border-t border-border flex items-center gap-4 text-xs text-muted-foreground font-system">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {episode.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(episode.date).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </span>
        {episode.state === 'draft' && (
          <span className="ml-auto px-2 py-0.5 rounded bg-amber-dim/20 text-amber-glow">
            Borrador
          </span>
        )}
      </div>
    </div>
  );
};

export default EpisodeCard;

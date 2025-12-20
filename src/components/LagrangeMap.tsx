import { useState, useCallback } from 'react';
import nodesData from '@/data/nodes.json';

interface Node {
  id: string;
  label: string;
  axis: string;
  x: number;
  y: number;
  state: 'active' | 'latent' | 'saturated';
  description: string;
}

interface Edge {
  source: string;
  target: string;
  weight: number;
}

interface LagrangeMapProps {
  onNodeSelect?: (node: Node) => void;
}

const LagrangeMap = ({ onNodeSelect }: LagrangeMapProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes: Node[] = nodesData.nodes as Node[];
  const edges: Edge[] = nodesData.edges;

  const getNodeColor = (state: string, isHovered: boolean, isSelected: boolean) => {
    if (isSelected) return 'hsl(38, 80%, 60%)';
    if (isHovered) return 'hsl(38, 70%, 55%)';
    switch (state) {
      case 'active': return 'hsl(38, 70%, 50%)';
      case 'latent': return 'hsl(220, 40%, 45%)';
      case 'saturated': return 'hsl(0, 50%, 45%)';
      default: return 'hsl(45, 5%, 55%)';
    }
  };

  const getEdgeOpacity = (edge: Edge) => {
    if (hoveredNode === edge.source || hoveredNode === edge.target) return 0.8;
    if (selectedNode === edge.source || selectedNode === edge.target) return 0.6;
    return 0.15;
  };

  const handleNodeClick = useCallback((node: Node) => {
    setSelectedNode(node.id === selectedNode ? null : node.id);
    onNodeSelect?.(node);
  }, [selectedNode, onNodeSelect]);

  const getNodePosition = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className="relative w-full h-full min-h-[500px] bg-background rounded-lg overflow-hidden">
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(38 70% 50% / 0.08) 0%, transparent 70%)'
        }}
      />
      
      <svg 
        viewBox="0 0 800 600" 
        className="w-full h-full"
        style={{ minHeight: '500px' }}
      >
        <defs>
          {/* Glow filter for nodes */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Gradient for edges */}
          <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(38, 70%, 50%)" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="hsl(38, 70%, 50%)" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="hsl(38, 70%, 50%)" stopOpacity="0.3"/>
          </linearGradient>
        </defs>

        {/* Edges */}
        <g className="edges">
          {edges.map((edge, i) => {
            const source = getNodePosition(edge.source);
            const target = getNodePosition(edge.target);
            return (
              <line
                key={i}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke="hsl(38, 50%, 40%)"
                strokeWidth={edge.weight * 2}
                opacity={getEdgeOpacity(edge)}
                className="transition-opacity duration-300"
                strokeDasharray={hoveredNode === edge.source || hoveredNode === edge.target ? "none" : "4 4"}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g className="nodes">
          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode === node.id;
            const nodeColor = getNodeColor(node.state, isHovered, isSelected);
            
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node)}
                className="cursor-pointer"
              >
                {/* Outer glow ring */}
                <circle
                  r={isHovered || isSelected ? 35 : 28}
                  fill="none"
                  stroke={nodeColor}
                  strokeWidth="1"
                  opacity={isHovered || isSelected ? 0.5 : 0.2}
                  className="transition-all duration-300"
                />
                
                {/* Pulsing background for active nodes */}
                {node.state === 'active' && (
                  <circle
                    r="25"
                    fill={nodeColor}
                    opacity="0.15"
                    className="animate-pulse-slow"
                  />
                )}
                
                {/* Main node circle */}
                <circle
                  r={isHovered || isSelected ? 18 : 14}
                  fill={nodeColor}
                  filter={isHovered || isSelected ? "url(#glow)" : undefined}
                  className="transition-all duration-300"
                />
                
                {/* Inner highlight */}
                <circle
                  r="6"
                  fill="hsl(0, 0%, 95%)"
                  opacity={isHovered || isSelected ? 0.3 : 0.15}
                  className="transition-opacity duration-300"
                />
                
                {/* Label */}
                <text
                  y={isHovered || isSelected ? 45 : 40}
                  textAnchor="middle"
                  className="font-philosophy text-sm fill-foreground pointer-events-none select-none"
                  style={{ 
                    fontSize: isHovered || isSelected ? '14px' : '12px',
                    fontWeight: isHovered || isSelected ? 600 : 400,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {node.label}
                </text>
                
                {/* Axis indicator */}
                <text
                  y={isHovered || isSelected ? 60 : 55}
                  textAnchor="middle"
                  className="font-system text-xs fill-muted-foreground pointer-events-none select-none"
                  style={{ fontSize: '9px' }}
                >
                  [{node.axis}]
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Selected node detail panel */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-philosophy text-lg text-foreground">
                {nodes.find(n => n.id === selectedNode)?.label}
              </h3>
              <span className="font-system text-xs text-primary">
                [{nodes.find(n => n.id === selectedNode)?.axis}]
              </span>
            </div>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {nodes.find(n => n.id === selectedNode)?.description}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span 
              className="inline-block w-2 h-2 rounded-full"
              style={{ 
                backgroundColor: getNodeColor(
                  nodes.find(n => n.id === selectedNode)?.state || 'latent', 
                  false, 
                  false
                ) 
              }}
            />
            <span className="font-system text-xs text-muted-foreground uppercase">
              {nodes.find(n => n.id === selectedNode)?.state}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LagrangeMap;

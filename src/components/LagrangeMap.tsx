import { useState, useCallback, useEffect, useRef } from 'react';
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
  const [externalSvgLoaded, setExternalSvgLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    // Try to load semantic SVG from public/svg/map.svg and bind interactions
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch('/svg/map.svg');
        if (!res.ok) throw new Error('No SVG');
        const text = await res.text();
        if (!mounted) return;
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'image/svg+xml');
        const svg = doc.querySelector('svg');
        if (!svg || !containerRef.current) return;

        // Clear container and append imported SVG
        containerRef.current.innerHTML = '';
        const imported = document.importNode(svg, true) as SVGSVGElement;
        imported.setAttribute('class', 'w-full h-full');
        imported.setAttribute('role', 'img');
        containerRef.current.appendChild(imported);

        // Bind node interactions
        nodes.forEach((n) => {
          const el = imported.querySelector(`[data-node-id="${n.id}"]`);
          if (!el) return;
          el.setAttribute('tabindex', '0');
          const circle = el.querySelector('circle');
          const applyStyle = (isHovered: boolean, isSelected: boolean) => {
            const color = getNodeColor(n.state, isHovered, isSelected);
            if (circle instanceof SVGElement) circle.setAttribute('fill', color);
            if (isHovered || isSelected) el.setAttribute('filter', 'url(#glow)');
            else el.removeAttribute('filter');
          };

          const onEnter = () => {
            setHoveredNode(n.id);
            applyStyle(true, selectedNode === n.id);
          };
          const onLeave = () => {
            setHoveredNode((v) => (v === n.id ? null : v));
            applyStyle(false, selectedNode === n.id);
          };
          const onClick = () => {
            setSelectedNode((prev) => (prev === n.id ? null : n.id));
            onNodeSelect?.(n);
          };

          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
          el.addEventListener('click', onClick);
          el.addEventListener('focus', onEnter);
          el.addEventListener('blur', onLeave);

          // store cleanup on element
          (el as any).__cleanup = () => {
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
            el.removeEventListener('click', onClick);
            el.removeEventListener('focus', onEnter);
            el.removeEventListener('blur', onLeave);
          };
        });

        // Store reference to update edges when hover/selection changes
        setExternalSvgLoaded(true);
      } catch (e) {
        // ignore, fallback to inline svg
        setExternalSvgLoaded(false);
      }
    };

    load();

    return () => {
      mounted = false;
      // cleanup event listeners if svg was injected
      if (containerRef.current) {
        const svgel = containerRef.current.querySelector('svg');
        if (svgel) {
          const nodesEls = svgel.querySelectorAll('[data-node-id]');
          nodesEls.forEach((el) => {
            const c = (el as any).__cleanup;
            if (typeof c === 'function') c();
          });
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update external svg visuals when hovered/selected changes
  useEffect(() => {
    if (!externalSvgLoaded || !containerRef.current) return;
    const svgel = containerRef.current.querySelector('svg');
    if (!svgel) return;

    // Update node fills and edge opacities
    nodes.forEach((n) => {
      const el = svgel.querySelector(`[data-node-id="${n.id}"]`);
      if (!el) return;
      const circle = el.querySelector('circle');
      const isHovered = hoveredNode === n.id;
      const isSelected = selectedNode === n.id;
      const color = getNodeColor(n.state, isHovered, isSelected);
      if (circle instanceof SVGElement) circle.setAttribute('fill', color);
      if (isHovered || isSelected) el.setAttribute('filter', 'url(#glow)');
      else el.removeAttribute('filter');
    });

    const edgeEls = svgel.querySelectorAll('[data-edge-source][data-edge-target]');
    edgeEls.forEach((edgeEl) => {
      const src = edgeEl.getAttribute('data-edge-source');
      const tgt = edgeEl.getAttribute('data-edge-target');
      const opacity = (hoveredNode === src || hoveredNode === tgt) ? '0.8' : (selectedNode === src || selectedNode === tgt ? '0.6' : '0.15');
      (edgeEl as SVGElement).setAttribute('opacity', opacity);
      if (hoveredNode === src || hoveredNode === tgt) (edgeEl as SVGElement).removeAttribute('stroke-dasharray');
      else (edgeEl as SVGElement).setAttribute('stroke-dasharray', '4 4');
    });
  }, [hoveredNode, selectedNode, externalSvgLoaded]);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-background rounded-lg overflow-hidden">
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(38 70% 50% / 0.08) 0%, transparent 70%)'
        }}
      />
      
      {/* External semantic SVG will be injected here when present */}
      <div ref={containerRef} className="w-full h-full" />

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

// components/ForceDirectedTree.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ForceDirectedTree = ({ width , height , nodes, links }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!nodes.length || !links.length) return;

    // Clear the svg content if it was rendered before
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Define force simulation
    const force = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.index).distance(100))
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 3, height / 2))
      .force('gravity', d3.forceY(0.10));

    // Create links
    const link = svg.selectAll('.link')
      .data(links)
      .enter().append('line')
      .attr('class', 'link')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Create nodes as groups
    const node = svg.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .call(d3.drag()
        .on('start', (event, d) => {
          if (!event.active) force.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) force.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Add circle to nodes
    node.append('circle')
      .attr('r', 10) // Circle radius
      .attr('fill', '#69b3a2'); // Circle color

    // Add text to nodes
    node.append('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .attr('fill', '#ffffff')
      .text(d => d.name);

    // Simulation tick behavior
    force.on('tick', () => {
      const k = 10 * force.alpha(); // Adjust vertical force using the simulation's alpha

      // Apply custom forces on the y-axis during each tick
      links.forEach(d => {
        d.source.y -= k;
        d.target.y += k;
      });

      // Update link positions
      link.attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

      // Update node positions
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Clean up the simulation on component unmount
    return () => {
      force.stop();
    };
  }, [nodes, links, width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default ForceDirectedTree;

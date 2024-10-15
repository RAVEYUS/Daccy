// components/ForceDirectedTree.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ForceDirectedTree = ({ width, height, nodes }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!nodes.length) return;

    // Clear the svg content if it was rendered before
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create a hierarchy from the nodes
    const root = d3.hierarchy(nodes[0]);

    // Create a tree layout with adjusted size
    const treeLayout = d3.tree()
      .size([height, width - 300]); // Adjust width to control line length

    // Compute the new tree layout
    treeLayout(root);

    // Create links
    const link = svg.selectAll('.link')
      .data(root.links())
      .enter().append('line')
      .attr('class', 'link')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2)
      .attr('x1', d => d.source.y + 100) // Shift links to the right
      .attr('y1', d => d.source.x)
      .attr('x2', d => d.target.y + 100) // Shift links to the right
      .attr('y2', d => d.target.x);

    // Create nodes as groups
    const node = svg.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y + 100},${d.x})`); // Shift nodes to the right

    // Add circle to nodes
    node.append('circle')
      .attr('r', 10) // Circle radius
      .attr('fill', '#69b3a2'); // Circle color

    // Add text to nodes
    node.append('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .attr('fill', '#ffffff')
      .text(d => d.data.name)
      .style('visibility', d => (d.depth === 0 ? 'visible' : 'hidden')); // Show only root node by default

    // Show node names on hover
    node.on('mouseover', function () {
      d3.select(this).select('text').style('visibility', 'visible');
    }).on('mouseout', function () {
      d3.select(this).select('text').style('visibility', d => (d.depth === 0 ? 'visible' : 'hidden'));
    });

  }, [nodes, width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default ForceDirectedTree;

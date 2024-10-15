// pages/tree.js
"use client"
import ForceDirectedTree from '@/components/loadGraph';

const TreePage = () => {
  const nodes = [
    { name: 'd3' },
    { name: 'd3.svg' },
    { name: 'd3.svg.area' },
    { name: 'd3.svg.line' },
    { name: 'd3.scale' },
    { name: 'd3.scale.linear' },
    { name: 'd3.scale.ordinal' }
  ];

  const links = [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 0, target: 4 },
    { source: 4, target: 5 },
    { source: 4, target: 6 }
  ];

  return (
    <div className='overflow-x-hidden'>
      <h1>Force-Directed Tree</h1>
      <ForceDirectedTree nodes={nodes} links={links} width={1920} height={800} />
    </div>
  );
};

export default TreePage;

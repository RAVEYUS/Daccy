// pages/tree.js
"use client"
import ForceDirectedTree from '@/components/loadGraph';

const TreePage = () => {
  const nodes = [
    { id: 'A', group: 1 },
    { id: 'B', group: 1 },
    { id: 'C', group: 2 },
    { id: 'D', group: 2 },
    { id: 'E', group: 3 },
  ];

  const links = [
    { source: 'A', target: 'B' },
    { source: 'A', target: 'C' },
    { source: 'B', target: 'D' },
    { source: 'C', target: 'E' },
  ];

  return (
    <div>
      <h1>Force-Directed Tree</h1>
      <ForceDirectedTree nodes={nodes} links={links} width={800} height={600} />
    </div>
  );
};

export default TreePage;

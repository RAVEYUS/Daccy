"use client"

import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CollapsibleTree({ data }) {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!data || !svgRef.current) return

    // Set chart dimensions
    const width = 1200
    const marginTop = 20
    const marginRight = 120
    const marginBottom = 20
    const marginLeft = 120

    const root = d3.hierarchy(data)

    // Adjust these values for spacing
    const dx = 20; // Increase for more vertical spacing
    const dy = (width - marginRight - marginLeft) / (1 + root.height) + 20; // Increase for more horizontal spacing

    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x)

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", dx)
      .attr("viewBox", [-marginLeft, -marginTop, width, dx])
      .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif; user-select: none;")

    const gLink = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 3); // Set a thicker stroke width

    const gNode = svg.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all")

    // Define an array of colors for the links
    const linkColors = d3.schemeCategory10; // You can change this to any other color scheme

    // Update function to refresh the tree layout
    function update(event, source) {
      const duration = event?.altKey ? 2500 : 250
      const nodes = root.descendants().reverse()
      const links = root.links()

      // Compute the new tree layout.
      tree(root)

      let left = root
      let right = root
      root.eachBefore(node => {
        if (node.x < left.x) left = node
        if (node.x > right.x) right = node
      })

      const height = right.x - left.x + marginTop + marginBottom

      const transition = svg.transition()
        .duration(duration)
        .attr("height", height)
        .attr("viewBox", [-marginLeft, left.x - marginTop, width, height])
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"))

      // Update the nodes…
      const node = gNode.selectAll("g")
        .data(nodes, d => d.id)

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children
          update(event, d)
        })

      nodeEnter.append("circle")
        .attr("r", 5)
        .attr("fill", d => d._children ? "#555" : "#999")
        .attr("stroke-width", 10)

      nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d._children ? -8 : 8)
        .attr("text-anchor", d => d._children ? "end" : "start")
        .text(d => d.data.name)
        .attr("fill", "white") // Change text color to white for better visibility
        .clone(true).lower()
        .attr("stroke", "black") // Adjust stroke color for better contrast
        .attr("stroke-width", 3)

      // Transition nodes to their new position.
      const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1)

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)

      // Update the links…
      const link = gLink.selectAll("path")
        .data(links, d => d.target.id)

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().append("path")
        .attr("d", d => {
          const o = { x: source.x0, y: source.y0 }
          return diagonal({ source: o, target: o })
        })
        // Set the stroke color based on the index
        .attr("stroke", (d, i) => linkColors[i % linkColors.length])
        .attr("stroke-width", 3); // Set a thicker stroke width for entering links

      // Transition links to their new position.
      link.merge(linkEnter).transition(transition)
        .attr("d", diagonal)
        .attr("stroke", (d, i) => linkColors[i % linkColors.length]) // Apply colors on update
        .attr("stroke-width", 3); // Set a thicker stroke width for updated links

      // Transition exiting links to the parent's new position.
      link.exit().transition(transition).remove()
        .attr("d", d => {
          const o = { x: source.x, y: source.y }
          return diagonal({ source: o, target: o })
        })

      // Stash the old positions for transition.
      root.eachBefore(d => {
        d.x0 = d.x
        d.y0 = d.y
      })
    }

    // Initial setup of the tree
    root.x0 = dy / 2
    root.y0 = 0
    root.descendants().forEach((d, i) => {
      d.id = i
      d._children = d.children
      // Ensure no nodes are collapsed initially
      d.children = d._children
    })

    update(null, root)
  }, [data])

  return (
    <Card className="w-full max-w-[1200px] mx-auto ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Array Methods and Properties</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <svg ref={svgRef} />
        </div>
      </CardContent>
    </Card>
  )
}

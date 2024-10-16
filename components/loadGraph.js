"use client"

import React, { useEffect, useRef, useCallback } from 'react'
import * as d3 from 'd3'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CollapsibleTree({ data, onNodeClick}) {
  const svgRef = useRef(null)
  const treeRef = useRef(null)

  const renderTree = useCallback(() => {
    if (!data || !svgRef.current) return

    // Set chart dimensions
    const width = 1200
    const marginTop = 20
    const marginRight = 120
    const marginBottom = 20
    const marginLeft = 120

    const root = d3.hierarchy(data)

    // Adjust these values for spacing
    const dx = 20
    const dy = (width - marginRight - marginLeft) / (1 + root.height) + 20

    const tree = d3.tree().nodeSize([dx, dy])
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
      .attr("stroke-width", 3)

    const gNode = svg.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all")

    const linkColors = d3.schemeCategory10

    function update(source) {
      const nodes = root.descendants().reverse()
      const links = root.links()

      tree(root)

      let left = root
      let right = root
      root.eachBefore(node => {
        if (node.x < left.x) left = node
        if (node.x > right.x) right = node
      })

      const height = right.x - left.x + marginTop + marginBottom

      const transition = svg.transition()
        .duration(250)
        .attr("height", height)
        .attr("viewBox", [-marginLeft, left.x - marginTop, width, height])
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"))

      const node = gNode.selectAll("g")
        .data(nodes, d => d.id)

      const nodeEnter = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children
          update(d)
          onNodeClick(d)
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
        .attr("fill", "white")
        .clone(true).lower()
        .attr("stroke", "black")
        .attr("stroke-width", 3)

      node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1)

      node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)

      const link = gLink.selectAll("path")
        .data(links, d => d.target.id)

      link.enter().append("path")
        .attr("d", d => {
          const o = { x: source.x0, y: source.y0 }
          return diagonal({ source: o, target: o })
        })
        .attr("stroke", (d, i) => linkColors[i % linkColors.length])
        .attr("stroke-width", 3)
        .merge(link).transition(transition)
        .attr("d", diagonal)

      link.exit().transition(transition).remove()
        .attr("d", d => {
          const o = { x: source.x, y: source.y }
          return diagonal({ source: o, target: o })
        })

      root.eachBefore(d => {
        d.x0 = d.x
        d.y0 = d.y
      })
    }

    root.x0 = dy / 2
    root.y0 = 0
    root.descendants().forEach((d, i) => {
      d.id = i
      d._children = d.children
      d.children = d._children
    })

    update(root)

    treeRef.current = { root, update }
  }, [data, onNodeClick])

  useEffect(() => {
    renderTree()
  }, [renderTree])

  return (
    <Card className="w-full max-w-[1200px] mx-auto">
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
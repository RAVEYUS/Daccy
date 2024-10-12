import { NextResponse } from 'next/server'

type Topic = 'arrays' | 'linkedlists' | 'trees' | 'sorting'

const topics: Record<Topic, string> = {
  arrays: `Arrays are data structures that store elements in a contiguous memory location. Strings are also treated as arrays of characters in most languages.`,
  linkedlists: `Linked Lists are linear data structures where each element (node) contains a data part and a reference (or link) to the next element.`,
  trees: `Trees are hierarchical data structures used to represent hierarchical relationships between elements.`,
  sorting: `Sorting algorithms organize data in a particular order. Common sorting algorithms include Bubble Sort, Merge Sort, Quick Sort, and Insertion Sort.`,
}

export async function POST(request: Request) {
  const { message, selectedTopic } = await request.json()

  if (!message || !(selectedTopic in topics)) {
    return NextResponse.json({ reply: 'Invalid request. Please provide a valid topic and message.' }, { status: 400 })
  }

  const topicResponse = topics[selectedTopic as Topic]
  const response = `You asked about "${message}". Here's some information on ${selectedTopic}: ${topicResponse}`

  return NextResponse.json({ reply: response })
}
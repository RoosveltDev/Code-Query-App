import { fetchedQuestions } from "../types/question/fetchedQuestions.type"

export const dataChartReduce = (results: fetchedQuestions[]) => {
  const reduced = results.reduce((acc: Record<string, number>, current) => {
    const date = new Date(current.created_at).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})
  const sortedEntries = Object.entries(reduced).sort(([a], [b]) => {
    return new Date(a).getTime() - new Date(b).getTime()
  })

  const labels = sortedEntries.map(([key]) => key)
  const dataPoints = sortedEntries.map(([, value]) => value)

  return { labels, dataPoints }
}
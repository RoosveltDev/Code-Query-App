

export const dataChartReduce = <T extends {created_at:string}>(results: T[]) => {
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
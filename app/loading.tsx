export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-background animate-pulse">
      {/* Header skeleton */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="h-8 w-48 rounded bg-muted mb-1" />
          <div className="h-4 w-36 rounded bg-muted/60" />
        </div>
      </header>

      {/* Character section skeletons */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-1 border-r last:border-r-0 border-border flex flex-col items-center justify-center gap-3 px-4 min-h-[200px]"
          >
            <div className="w-24 h-32 md:w-28 md:h-40 lg:w-36 lg:h-52 rounded-lg bg-muted/40" />
            <div className="h-5 w-24 rounded bg-muted" />
            <div className="flex flex-col items-center gap-1">
              <div className="h-3 w-32 rounded bg-muted/60" />
              <div className="h-3 w-24 rounded bg-muted/40" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

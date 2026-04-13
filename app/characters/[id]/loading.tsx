export default function CharacterLoading() {
  return (
    <main className="min-h-screen bg-background animate-pulse">
      {/* Header skeleton */}
      <header className="border-b bg-card/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-muted" />
            <div className="flex flex-col gap-1">
              <div className="h-5 w-32 rounded bg-muted" />
              <div className="h-3 w-44 rounded bg-muted/60" />
            </div>
          </div>
        </div>
      </header>

      {/* Grid skeleton */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Portrait */}
          <div className="lg:col-span-4 rounded-xl border-2 border-border bg-card/50 min-h-[280px] flex items-center justify-center">
            <div className="w-[200px] h-[267px] rounded-lg bg-muted/40" />
          </div>

          {/* Stats */}
          <div className="lg:col-span-8 rounded-xl border-2 border-border bg-card/50 p-6">
            <div className="h-6 w-36 rounded bg-muted mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-border bg-background/50 p-4">
                  <div className="h-4 w-24 rounded bg-muted mb-3" />
                  <div className="h-8 w-16 rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>

          {/* Builds panel */}
          <div className="lg:col-span-12 rounded-xl border-2 border-border bg-card/50 min-h-[480px]" />
        </div>
      </div>
    </main>
  )
}

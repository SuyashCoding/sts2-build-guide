import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-4 text-center page-enter">
      <div className="text-8xl opacity-20 select-none">⚔️</div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          This path leads nowhere. The character or page you're looking for doesn't exist — yet.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card/60 hover:bg-accent transition-colors text-sm font-medium text-foreground"
      >
        ← Back to characters
      </Link>
    </main>
  )
}

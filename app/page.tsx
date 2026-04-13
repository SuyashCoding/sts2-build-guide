import { CharacterSection } from '@/components/character-section'
import { characters } from '@/lib/characters'

export default function Home() {
  return (
    <main className="min-h-screen bg-background page-enter">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Slay the Spire 2
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Character Build Guides</p>
        </div>
      </header>

      {/* Character Sections */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        {characters.map((character) => (
          <CharacterSection key={character.id} character={character} />
        ))}
      </div>
    </main>
  )
}

'use client'

import { Character } from '@/lib/characters'
import { cn } from '@/lib/utils'
import { CHARACTER_COLORS } from '@/lib/color-map'
import { CharacterPortrait } from './character-portrait'
import { StatsPanel } from './stats-panel'
import { BuildsDocPanel } from './builds-doc-panel'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CharacterPageProps {
  character: Character
}

export function CharacterPage({ character }: CharacterPageProps) {
  const router = useRouter()
  const colors = CHARACTER_COLORS[character.color] ?? CHARACTER_COLORS.ironclad

  return (
    <main className={cn('min-h-screen bg-background page-enter', colors.bg)}>
      {/* Header */}
      <header
        className={cn(
          'border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50',
          colors.border
        )}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className={cn(
                'p-1.5 rounded-lg border transition-colors',
                'hover:bg-accent cursor-pointer',
                colors.border
              )}
              aria-label="Back to characters"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className={cn('text-lg md:text-xl font-bold tracking-tight leading-tight', colors.text)}>
                {character.name}
              </h1>
              <p className="text-muted-foreground text-xs">Build Guides & Documentation</p>
            </div>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Top Row: Portrait + Stats */}
          <div className="lg:col-span-4">
            <CharacterPortrait character={character} colors={colors} />
          </div>
          <div className="lg:col-span-8">
            <StatsPanel character={character} colors={colors} />
          </div>

          {/* Bottom Row: Combined Builds + Docs Panel */}
          <div className="lg:col-span-12">
            <BuildsDocPanel
              character={character}
              colors={colors}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

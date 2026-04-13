'use client'

import { Character } from '@/lib/characters'
import { CharacterColors } from '@/lib/color-map'
import { cn } from '@/lib/utils'
import { Heart, Coins, Gem } from 'lucide-react'

interface StatsPanelProps {
  character: Character
  colors: CharacterColors
}

export function StatsPanel({ character, colors }: StatsPanelProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 p-6 h-full',
        'bg-card/50 backdrop-blur-sm',
        colors.border
      )}
    >
      <h2 className={cn('text-xl font-bold mb-4', colors.text)}>Starting Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* HP */}
        <div
          className={cn(
            'rounded-lg border p-4',
            'bg-background/50',
            colors.border
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <Heart className={cn('w-5 h-5', colors.text)} />
            <span className="text-muted-foreground text-sm font-medium">Starting HP</span>
          </div>
          <p className={cn('text-3xl font-bold', colors.text)}>{character.startingHp}</p>
        </div>

        {/* Gold */}
        <div
          className={cn(
            'rounded-lg border p-4',
            'bg-background/50',
            colors.border
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <Coins className={cn('w-5 h-5', colors.text)} />
            <span className="text-muted-foreground text-sm font-medium">Starting Gold</span>
          </div>
          <p className={cn('text-3xl font-bold', colors.text)}>{character.startingGold}</p>
        </div>

        {/* Relic */}
        <div
          className={cn(
            'rounded-lg border p-4 md:col-span-1',
            'bg-background/50',
            colors.border
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <Gem className={cn('w-5 h-5', colors.text)} />
            <span className="text-muted-foreground text-sm font-medium">Starting Relic</span>
          </div>
          <p className={cn('text-lg font-bold', colors.text)}>{character.startingRelic}</p>
          <p className="text-muted-foreground text-sm mt-1">{character.relicDescription}</p>
        </div>
      </div>
    </div>
  )
}

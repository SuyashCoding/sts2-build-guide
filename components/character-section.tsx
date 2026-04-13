'use client'

import Link from 'next/link'
import { Character } from '@/lib/characters'
import { cn } from '@/lib/utils'
import { CHARACTER_COLORS } from '@/lib/color-map'

interface CharacterSectionProps {
  character: Character
}

export function CharacterSection({ character }: CharacterSectionProps) {
  const colors = CHARACTER_COLORS[character.color] ?? CHARACTER_COLORS.ironclad

  return (
    <Link
      href={`/characters/${character.id}`}
      prefetch
      className={cn(
        'flex-1 border-r last:border-r-0 border-border',
        'flex flex-col items-center justify-center gap-3 px-4',
        'min-h-[200px] md:min-h-full',
        'transition-all duration-300 ease-out',
        'group cursor-pointer relative overflow-hidden',
        colors.bg,
        colors.border,
        colors.hover
      )}
    >
      {/* Portrait placeholder */}
      <div
        className={cn(
          'w-24 h-32 md:w-28 md:h-40 lg:w-36 lg:h-52',
          'border-2 rounded-lg',
          'flex items-center justify-center',
          'bg-card/60',
          'transition-all duration-300',
          'group-hover:scale-105',
          colors.border,
        )}
      >
        <span className={cn('text-4xl md:text-5xl opacity-20', colors.text)}>?</span>
      </div>

      {/* Character name */}
      <h2
        className={cn(
          'text-base md:text-lg lg:text-xl font-bold text-center leading-tight',
          'transition-transform duration-300 group-hover:scale-105',
          colors.text
        )}
      >
        {character.name}
      </h2>

      {/* Taglines */}
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-foreground/80 text-xs md:text-sm leading-snug">
          {character.tagline1}
        </p>
        <p className="text-muted-foreground text-xs leading-snug italic">
          {character.tagline2}
        </p>
      </div>

      {/* View guides CTA */}
      <div
        className={cn(
          'flex items-center gap-2 text-xs md:text-sm italic opacity-60',
          'group-hover:opacity-100 transition-opacity duration-300 mt-3',
          colors.text
        )}
      >
        <span>View guides</span>
        <span>→</span>
      </div>
    </Link>
  )
}

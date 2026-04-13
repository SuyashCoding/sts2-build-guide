'use client'

import { Character } from '@/lib/characters'
import { CharacterColors } from '@/lib/color-map'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

interface CharacterPortraitProps {
  character: Character
  colors: CharacterColors
}

export function CharacterPortrait({ character, colors }: CharacterPortraitProps) {
  const [imageError, setImageError] = useState(false)
  const imagePath = `/images/characters/${character.id}.png`

  return (
    <div
      className={cn(
        'rounded-xl border-2 p-4 h-full min-h-[280px]',
        'bg-card/50 backdrop-blur-sm',
        'flex flex-col items-center justify-center',
        colors.border
      )}
    >
      <div
        className={cn(
          'w-full aspect-[3/4] max-w-[200px] rounded-lg border-2 overflow-hidden',
          'bg-muted/30 flex items-center justify-center',
          colors.border
        )}
      >
        {!imageError ? (
          <Image
            src={imagePath}
            alt={character.name}
            width={200}
            height={267}
            sizes="200px"
            priority
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <span className={cn('text-6xl opacity-30', colors.text)}>?</span>
            <p className="text-muted-foreground text-xs mt-2">
              Add image at:
              <br />
              <code className="text-[10px] bg-muted px-1 rounded">
                /public/images/characters/{character.id}.png
              </code>
            </p>
          </div>
        )}
      </div>
      <h3 className={cn('mt-4 text-lg font-semibold', colors.text)}>{character.name}</h3>
    </div>
  )
}


/**
 * @deprecated This component is no longer used.
 * The sidebar + viewer are now combined in `builds-doc-panel.tsx`.
 * This file is safe to delete.
 */
'use client'

import { Character } from '@/lib/characters'
import { cn } from '@/lib/utils'
import { BookOpen, ChevronRight } from 'lucide-react'

interface BuildsPanelProps {
  character: Character
  colors: {
    bg: string
    border: string
    text: string
    accent: string
  }
  selectedBuild: string | null
  onSelectBuild: (buildId: string | null) => void
}

export function BuildsPanel({
  character,
  colors,
  selectedBuild,
  onSelectBuild,
}: BuildsPanelProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 p-6 h-full',
        'bg-card/50 backdrop-blur-sm',
        colors.border
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className={cn('w-5 h-5', colors.text)} />
        <h2 className={cn('text-xl font-bold', colors.text)}>Builds</h2>
      </div>

      <div className="space-y-2">
        {character.builds.map((build) => (
          <button
            key={build.id}
            onClick={() => onSelectBuild(selectedBuild === build.id ? null : build.id)}
            className={cn(
              'w-full text-left rounded-lg p-4',
              'transition-all duration-200',
              'hover:bg-accent/50',
              'flex items-center justify-between gap-2',
              selectedBuild === build.id
                ? cn('bg-accent', colors.border, 'border-2')
                : 'bg-background/50'
            )}
          >
            <div>
              <h3 className={cn('font-semibold', selectedBuild === build.id ? colors.text : 'text-foreground')}>
                {build.name}
              </h3>
              <p className="text-muted-foreground text-sm">{build.description}</p>
            </div>
            <ChevronRight
              className={cn(
                'w-5 h-5 transition-transform',
                selectedBuild === build.id ? 'rotate-90' : '',
                colors.text
              )}
            />
          </button>
        ))}
      </div>

      <p className="text-muted-foreground text-xs mt-4">
        Select a build to view the guide. Add markdown files to{' '}
        <code className="bg-muted px-1 rounded text-[10px]">
          /public/docs/{character.id}/
        </code>
      </p>
    </div>
  )
}

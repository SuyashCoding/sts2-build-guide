/**
 * @deprecated This component is no longer used.
 * Markdown rendering is now handled inside `builds-doc-panel.tsx`.
 * This file is safe to delete.
 */
'use client'

import { Character } from '@/lib/characters'
import { cn } from '@/lib/utils'
import { FileText, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface MarkdownViewerProps {
  character: Character
  colors: {
    bg: string
    border: string
    text: string
    accent: string
  }
  selectedBuild: string | null
}

export function MarkdownViewer({ character, colors, selectedBuild }: MarkdownViewerProps) {
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedBuild) {
      setMarkdown(null)
      setError(null)
      return
    }

    const fetchMarkdown = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/docs/${character.id}/${selectedBuild}.md`)
        if (!response.ok) {
          throw new Error('File not found')
        }
        const text = await response.text()
        setMarkdown(text)
      } catch {
        setError(`No documentation found. Add a file at /public/docs/${character.id}/${selectedBuild}.md`)
        setMarkdown(null)
      } finally {
        setLoading(false)
      }
    }

    fetchMarkdown()
  }, [selectedBuild, character.id])

  const build = character.builds.find((b) => b.id === selectedBuild)

  return (
    <div
      className={cn(
        'rounded-xl border-2 p-6 min-h-[400px]',
        'bg-card/50 backdrop-blur-sm',
        colors.border
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <FileText className={cn('w-5 h-5', colors.text)} />
        <h2 className={cn('text-xl font-bold', colors.text)}>
          {build ? build.name : 'Documentation'}
        </h2>
      </div>

      {!selectedBuild ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <FileText className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">Select a build from the list to view its documentation</p>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center h-64">
          <div className={cn('w-8 h-8 border-4 border-t-transparent rounded-full animate-spin', colors.border)} />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground text-sm max-w-md">{error}</p>
          <p className="text-muted-foreground/70 text-xs mt-4">
            Create a markdown file with your build guide content.
          </p>
        </div>
      ) : (
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className={cn('text-2xl font-bold mb-4', colors.text)}>{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className={cn('text-xl font-semibold mb-3 mt-6', colors.text)}>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className={cn('text-lg font-semibold mb-2 mt-4', colors.text)}>{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-foreground/90 mb-4 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-1 text-foreground/90">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-1 text-foreground/90">{children}</ol>
              ),
              li: ({ children }) => <li className="text-foreground/90">{children}</li>,
              code: ({ children, className }) => {
                const isInline = !className
                return isInline ? (
                  <code className={cn('bg-muted px-1.5 py-0.5 rounded text-sm', colors.text)}>
                    {children}
                  </code>
                ) : (
                  <code className="block bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    {children}
                  </code>
                )
              },
              blockquote: ({ children }) => (
                <blockquote className={cn('border-l-4 pl-4 italic text-muted-foreground', colors.border)}>
                  {children}
                </blockquote>
              ),
              strong: ({ children }) => (
                <strong className={cn('font-bold', colors.text)}>{children}</strong>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className={cn('underline hover:no-underline', colors.text)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}

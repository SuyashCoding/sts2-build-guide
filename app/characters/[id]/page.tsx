import { characters, getCharacter } from '@/lib/characters'
import { CharacterPage } from '@/components/character-page'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return characters.map((character) => ({
    id: character.id,
  }))
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const character = getCharacter(id)

  if (!character) {
    notFound()
  }

  return <CharacterPage character={character} />
}

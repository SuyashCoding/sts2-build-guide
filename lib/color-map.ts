export interface CharacterColors {
  bg: string
  border: string
  text: string
  accent: string
  hover: string
}

export const CHARACTER_COLORS: Record<string, CharacterColors> = {
  ironclad: {
    bg: 'bg-ironclad/15',
    border: 'border-ironclad/55',
    text: 'text-ironclad',
    accent: 'bg-ironclad',
    hover: 'hover:bg-ironclad/25 hover:border-ironclad/80',
  },
  silent: {
    bg: 'bg-silent/15',
    border: 'border-silent/55',
    text: 'text-silent',
    accent: 'bg-silent',
    hover: 'hover:bg-silent/25 hover:border-silent/80',
  },
  necrobinder: {
    bg: 'bg-necrobinder/15',
    border: 'border-necrobinder/55',
    text: 'text-necrobinder',
    accent: 'bg-necrobinder',
    hover: 'hover:bg-necrobinder/25 hover:border-necrobinder/80',
  },
  regent: {
    bg: 'bg-regent/15',
    border: 'border-regent/55',
    text: 'text-regent',
    accent: 'bg-regent',
    hover: 'hover:bg-regent/25 hover:border-regent/80',
  },
  defect: {
    bg: 'bg-defect/15',
    border: 'border-defect/55',
    text: 'text-defect',
    accent: 'bg-defect',
    hover: 'hover:bg-defect/25 hover:border-defect/80',
  },
}

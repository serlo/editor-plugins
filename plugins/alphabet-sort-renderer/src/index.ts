import { AlphabetSortRenderer } from './renderer'

export const createAlphabetSortRendererPlugin = () => {
  return {
    Component: AlphabetSortRenderer
  }
}

export * from './renderer'
export * from './contact-card.renderer'

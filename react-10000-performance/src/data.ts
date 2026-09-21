export type Item = {
  id: number
  name: string
  description: string
}

export const ITEMS: Item[] = Array.from({ length: 10_000 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
  description: `This is the description for item ${index + 1}.`,
}))

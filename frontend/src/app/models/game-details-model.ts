export interface GameDetailsModel{
  id: number,
  title: string,
  price: number,
  stockQuantity: number,
  description: string,
  imgUrl: string,
  releaseYear : number,
  rating: string,
  genre: string[],
  tagLine: string,
  fastPacedCombat: string,
  legendaryLevel: string
}

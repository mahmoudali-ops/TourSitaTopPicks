import { ITour } from "./itour"

export interface ICatTour {
  id: number
  imageCover: string
  isActive: boolean
  titles: string
  descriptions: string
  referneceName: string
}

export interface IdetailedCattour {
    id: number
    imageCover: string
    isActive: boolean
    titles: string
    descriptions: string
    tours: ITour[]
  }
  

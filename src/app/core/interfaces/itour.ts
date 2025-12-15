export interface ITour {
  id: number
  imageCover: string
  isActive: boolean
  duration: number
  price: number
  startLocation: string
  endLocation: string
  languageOptions: string
  createdAt: string
  fK_CategoryID: number
  fK_UserID: string
  fK_DestinationID: number
  categoryName: string
  destinationName: string
  titles: string
  descriptions: string
  linkVideo: any
  referneceName: string
}

export interface IDetailedTour {
  id: number
  imageCover: string
  isActive: boolean
  duration: number
  price: number
  startLocation: string
  endLocation: string
  languageOptions: string
  createdAt: string
  fK_CategoryID: number
  fK_UserID: string
  fK_DestinationID: number
  categoryName: string
  destinationName: string
  titles: string
  descriptions: string
  linkVideo: any
  referneceName: string
  tourImgs: TourImg[]
  highlights: Highlight[]
  includedItems: IncludedItem[]
  notIncludedItems: NotIncludedItem[]
}

export interface TourImg {
  id: number
  imageCarouselUrl: string
  isActive: boolean
  fK_TourId: any
  tourName: string
  titles: string
}

export interface Highlight {
  id: number
  language: string
  text: string
}

export interface IncludedItem {
  id: number
  language: string
  text: string
}

export interface NotIncludedItem {
  id: number
  language: string
  text: string
}
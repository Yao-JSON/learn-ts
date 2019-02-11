import { ImageData } from './../interface'

export function mapImagesData(arr: ImageData[]):ImageData[] {
  return arr.map((item: ImageData): ImageData => {
    item.imageURL = require(`../images/${item.fileName}`);
    return item;
  })
}


export interface ImageData {
  fileName: string;
  title: string;
  desc: string;
  imageURL?: string;
}

export interface Iarrange {
  isCenter: boolean;
  pos: object | undefined;
  rotate: number | string;
  isInverse: boolean;
};


interface Iimgspos {
  top: number;
  left: number;
}

interface IhPosRange {
  leftSecX: [number, number];
  rightSecX: [number, number];
  y: [number, number];
}

interface IvPosRange {
  topY: [number, number];
  x: [number, number];
}

export interface IConstant {
  centerPos: Iimgspos;
  hPosRange: IhPosRange;
  vPosRange: IvPosRange;
}

export interface IimageArrange {
  pos: Iimgspos;
  rotate: string | number;
  isInverse: boolean;
  isCenter: boolean;
}

export interface IState {
  imgsArrangeArr: IimageArrange[];
}
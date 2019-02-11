import * as React from 'react';

import { Iarrange, ImageData } from './../interface/index';

export interface ImgFigureProps {
  arrange: Iarrange;
  imageData: ImageData;
  inverse: () => void;
  center: () => void;
}


export default class ImgFigure extends React.PureComponent<ImgFigureProps> {

  public handleClick: React.MouseEventHandler = (e: any):void => {
    const { arrange, inverse, center } = this.props;
    if(arrange.isCenter) {
      inverse();
    } else {
      center()
    }
    e.preventDefault();
		e.stopPropagation();
  }

  public render() {
    const { imageData, arrange } = this.props;
    let styleObject: object = {};
    if(arrange.pos) {
      styleObject = arrange.pos;
    }

    let imgFigureClassName: string = 'img-figure';

    if(arrange.isInverse) {
      imgFigureClassName += ' is-inverse'
    }

    return (<figure
      style={styleObject}
      className={imgFigureClassName}
      onClick={this.handleClick}>
      <img src={imageData.imageURL} alt={imageData.title}/>
      <figcaption>
        <h2 className="img-title">{imageData.title}</h2>
        <div className="img-back" onClick={this.handleClick}>
          <p>{imageData.desc}</p>
        </div>
      </figcaption>
    </figure>)
  }
}

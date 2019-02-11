import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IConstant, IimageArrange, ImageData, IState } from '../interface';

import ImageDatas from './../data/imageDatas'
import { get30DegRandom, getRangeRandom } from './../utils/index'
import ControllerUnit from './controller-unit';
import ImgFigure from './Img-figure';

const imageDatas: ImageData[] = ImageDatas.map((item) => {
  item.imageURL = require(`../images/${item.fileName}`);
  return item;
})

export default class AppComponent extends React.Component{
  public Constant: IConstant;
  public stageDom: any; 
  public imgFigure0: any;
  public state: IState; 
  
  constructor(props: any) {
    super(props);
    this.Constant= {
      centerPos:{
        left:0,
        top:0
      },
      hPosRange:{// 水平方向的取值范围
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{ // 垂直方向的取值范围
        topY:[0,0],
        x:[0,0],
      }
    }
    this.state = {
      imgsArrangeArr: []
    }
  }

  public rearrange = (centerIndex: number) => {
    const { imgsArrangeArr } = this.state;
    const { Constant } = this;
    const { centerPos, hPosRange, vPosRange,  } = Constant;
    const { leftSecX: hPosRangeLeftSecX, rightSecX: hPosRangeRightSecX, y: hPosRangeY } = hPosRange;

    const { topY : vPosRangeTopY, x: vPosRangeX  } = vPosRange;

    let imgsArrangeTopArr: IimageArrange[] = [];
    const topImgNum: number = Math.floor(Math.random() * 2);
    let topImgSpliceIndex: number = 0;

    const imgsArrangeCenterArr: IimageArrange[] = imgsArrangeArr.splice(centerIndex, 1);

    // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
    imgsArrangeCenterArr[0] = {
      isCenter: true,
      isInverse: false,
      pos: centerPos,
      rotate: "0",
    };

    // 取出要布局的上侧的图片信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

    // 布局位于上侧的图片
    // 布局位于上侧的图片
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index] = {
        isCenter: false,
        isInverse: false,
        pos: {
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]),
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        },
        rotate: get30DegRandom(),
      };
    });

    // 布局左右两侧的图片
    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null;
      // 前半部分布局左边， 右半部分布局右边
      if (i < k) {
          hPosRangeLORX = hPosRangeLeftSecX;
      } else {
          hPosRangeLORX = hPosRangeRightSecX;
      }
      imgsArrangeArr[i] = {
        isCenter: false,
        isInverse: false,
        pos: {
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1]),
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        },
        rotate: get30DegRandom(),
      };
    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
    this.setState({
      imgsArrangeArr
    });
  }
  /*
   * 利用arrange函数， 居中对应index的图片
   * @param index, 需要被居中的图片对应的图片信息数组的index值
   * @returns {Function}
   */
  public center = (index: number) => {
    return () => {
      this.rearrange(index);
    }
  }
 /* 
	*  翻转图片
	*  @param index 传入当前被执行 inverse 操作的图片 对应的图片信息数组的index值
	*  @returns {Function} 这是一个闭包函数，其内return一个真正待被执行的函数
  **/
  
  public inverse = (index: number) => {
    return () => {
      const { imgsArrangeArr } = this.state;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
				imgsArrangeArr
			});
    }
  }

  public render() {
    const controllerUnits: React.ReactNode[] = []
    const imgFigures: React.ReactNode [] = [];
    const { imgsArrangeArr } = this.state;
    imageDatas.forEach((value: ImageData, index) => {
      if(!imgsArrangeArr[index]) {
        imgsArrangeArr[index] = {
          isCenter: false,
          isInverse: false,
          pos: {
            left: 0,
            top: 0,
          },
          rotate: "",
        }
      }
      if(!index) {
        imgFigures.push(
          <ImgFigure 
            imageData={value} 
            arrange = {imgsArrangeArr[index]} 
            center = {this.center(index)}
            inverse = {this.inverse(index)}
            ref={(imgFigure) => {
              this['imgFigure'+index] = imgFigure;
            }} 
            key={index}/>
        );
      } else {
        imgFigures.push(
          <ImgFigure 
            imageData={value} 
            arrange = {imgsArrangeArr[index]} 
            center = {this.center(index)}
            inverse = {this.inverse(index)}
            key={index}/>
        );
      }
      controllerUnits.push(
        <ControllerUnit 
          arrange = {imgsArrangeArr[index]}
          key = {index}
          center = {this.center(index)}
          inverse = {this.inverse(index)}
        />
      );
    });

    return (
      <section
        className="stage"
        ref={(stageRef) => {
        this.stageDom = stageRef;
        }}
      >
          <section className="img-sec">
              {imgFigures}
          </section>
          <nav className="controller-nav">
              {controllerUnits}
          </nav>
       </section>
   );
  }

  // 组件加载完成后 初始化 每个图片组件的位置范围
  public componentDidMount() {
    const stageDom = this.stageDom;
    const { scrollWidth: stageW, scrollHeight: stageH } = stageDom;
    const halfStageW = Math.ceil(stageW/2);
    const halfStageH = Math.ceil(stageH/2);
    // 拿到imgFigureDow  的大小

    const imgFigureDOM: any = ReactDOM.findDOMNode(this.imgFigure0);
    
    const imgW: number = imgFigureDOM ? imgFigureDOM.scrollWidth : 0;
    const imgH: number = imgFigureDOM ? imgFigureDOM.scrollHeight : 0;
    const halfImgW = Math.ceil(imgW/2);
    const halfImgH = Math.ceil(imgH/2);

    // 计算中心图片的位置点
		this.Constant.centerPos = {
			left:halfStageW - halfImgW,
			top:halfStageH - halfImgH
		}

    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    this.rearrange(0);
  }
}
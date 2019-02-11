import * as React from 'react';

import { Iarrange } from '../interface';

export interface IControllerUnitProps {
  arrange: Iarrange
  inverse: () => void;
  center: () => void;
}

// 控制组件
export default class ControllerUnit extends React.PureComponent<IControllerUnitProps>{

  public handleClick: React.MouseEventHandler = (e):void => {
    // 如果点击的是当前正在选中状态的按钮，则翻转图片，否则对应的图片居中
		if(this.props.arrange.isCenter){
			this.props.inverse();
		} else {
			this.props.center();
		}
		e.preventDefault();
		e.stopPropagation();
  }

  public render() {
    let controllerUnitClassName = "controller-unit";
    // 如果对应的是居中的图片，显示控制按钮的居中状态
		if(this.props.arrange.isCenter){
			controllerUnitClassName += " is-center";
			// 如果 同时对应的是翻转图片，显示控制按钮的翻转状态
			if(this.props.arrange.isInverse){
				controllerUnitClassName += " is-inverse";
			}
		}
    return  (
			<span className={controllerUnitClassName} onClick={this.handleClick}/>
		);
  }
}
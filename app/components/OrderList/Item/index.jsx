import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.scss'

export default class Item extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render(){
    const data = this.props.data;
    return (
      <div className="order-item-container">
          <div className="clear-fix">
              <div className="order-item-img float-left">
                  <img src={data.img}/>
              </div>
              <div className="order-item-comment float-right">
                  <button className="btn">评价</button>
              </div>
              <div className="order-item-content">
                  <span>商户：{data.title}</span>
                  <span>数量：{data.count}</span>
                  <span>价格：￥{data.price}</span>
              </div>
          </div>
          
      </div>
    );
  }
}
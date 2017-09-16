import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.scss';
import Item from './Item'

export default class List extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
  }
  render(){
    const {data} = this.props;
    return (
      <div className="list-container">
          {this.props.data.map((item, index) => {
              return <Item key={index} data={item}/>
          })}
      </div>
    );
  }
}
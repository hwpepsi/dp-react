import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.scss';

export default class Star extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render(){
    let star = this.props.star || 0;
    if(star > 5){
        star = star % 5;
    }
    return (
      <div className="star-container">
        {[1,2,3,4,5].map((item,index)=>{
          let lightClass = star >=item ? ' light' : '';
          return <i key={index} className={'icon-star-full' + lightClass}></i>
        })
       }
      </div>
    );
  }
}
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.scss';

export default class Header extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.clickHandle = this.clickHandle.bind(this);
  }
  render(){
    return (
      <div id="common-header">
          <span className="back-icon" onClick={this.clickHandle}>
              <i className="icon-chevron-left"></i>
          </span>
          <h1>{this.props.title}</h1>
      </div>
    );
  }

  clickHandle(){
    window.history.back();
  }
}
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PropTypes from 'prop-types';

import './style.scss';

export default class Header extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.clickHandle = this.clickHandle.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render(){
    return (
      <div id="common-header">
          <span className="back-icon" onClick={this.clickHandle}>
              <i className="icon-arrow-left2"></i>
          </span>
          <h1>{this.props.title}</h1>
      </div>
    );
  }

  clickHandle(){
    const backRouter = this.props.backRouter
    if(backRouter){
      this.context.router.history.push(backRouter)
    }else{
      window.history.back();
    }
    
  }
}
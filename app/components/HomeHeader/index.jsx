import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.scss'

class HomeHeader extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
  }
  render(){
    return (
        <div id="home-header" className="clear-fix">
            <div className="home-header-left float-left">
                <span>{this.props.cityName}</span>
                &nbsp;
                <i className="icon-angle-down"></i>
                
            </div>
            <div className="home-header-right float-right">
                
                    <i className="icon-user"></i>
               
            </div>
            <div className="home-header-middle">
                <div className="search-container">
                    <i className="icon-search"></i>
                    &nbsp;
                    
                </div>
            </div>
        </div>
      
    );
  }
}

export default HomeHeader
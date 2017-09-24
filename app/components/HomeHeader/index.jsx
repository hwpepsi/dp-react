import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router-dom'

import './style.scss'

import SearchInput from '../SearchInput'

import PropTypes from 'prop-types';

class HomeHeader extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.enterHandle = this.enterHandle.bind(this);
    this.state = {
        kwd:''
    }
    
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  
  render(){
    return (
        <div id="home-header" className="clear-fix">
            <div className="home-header-left float-left">
                <Link to="/city">
                <span>{this.props.cityName}</span>
                &nbsp;
                <i className="icon-angle-down"></i>
                </Link>
            </div>
            <div className="home-header-right float-right">
                
                    <i className="icon-user"></i>
               
            </div>
            <div className="home-header-middle">
                <div className="search-container">
                    <i className="icon-search"></i>
                    &nbsp;
                    <SearchInput value="" enterHandle={this.enterHandle}/>
                </div>
            </div>
        </div>
      
    );
  }

  enterHandle(value) {
        this.context.router.history.push('/search/all/' + encodeURIComponent(value));
    }


}

export default HomeHeader
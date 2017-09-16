import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userInfoAct from '../../actions/actlist';

import localStore from '../../utils/localStore';
import {CITYNAME} from '../../config/keysDefine';

import Header from '../../components/Header';
import CurrentCity from '../../components/CurrentCity';
import CityList from '../../components/CityList';

import PropTypes from 'prop-types';

class City extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.changeCity = this.changeCity.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  render(){
    return (
      <div>
        <Header title="选择城市"/>
        <CurrentCity cityName={this.props.userinfo.cityName}/>
        <CityList changeFn={this.changeCity}/>
      </div>
    );
  }

  changeCity(newCity){
    if(newCity == null){
      return
    }

    //修改redux
    const userinfo = this.props.userinfo;
    userinfo.cityName = newCity;
    this.props.userInfoActions.update(userinfo);

    //修改localStorage
    localStore.setItem(CITYNAME ,newCity);

    //跳转到首页
    //this.context.router.history.push("/");
    console.log(this.context.router);
    this.context.router.history.push("/");

  }
  componentDidMount(){
    //console.log(this.props.userinfo);
    //console.log(this.props.userInfoActions)

  }
}

function mapStateToProps(state){
  return{
    userinfo:state.userinfo
  }
}

//将action作为属性传给react
function mapDispatchToProps(dispatch){
  return{
    userInfoActions:bindActionCreators(userInfoAct,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(City);
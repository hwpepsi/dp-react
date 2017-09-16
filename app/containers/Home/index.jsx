import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import HomeHeader from '../../components/HomeHeader';
import Category from '../../components/Category';
import Ad from './subpage/Ad';
import List from './subpage/List';

import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux'

//import * as userinfoActions from '../../actions/actlist'
import {get} from '../../axios/get'

class Home extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state={
      data:''
    }
  }

  
  render(){
    return (
      <div>
        <HomeHeader cityName={this.props.userinfo.cityName}/>
        <Category />
        <div style={{height: '15px'}}>{/* 分割线 */}</div>
        <Ad />
        <List cityName={this.props.userinfo.cityName}/>
      </div>
    );
  }

  componentDidMount() {
    get('/api/homead').then((res)=>{
      //console.log(res.data[0]);
      this.setState({
        data:res.data[0]
      })
    })
  }


}


function mapStateToProps(state){
  return{
    userinfo:state.userinfo
  }
}

function mapDispatchToProps(dispatch){
  return {
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
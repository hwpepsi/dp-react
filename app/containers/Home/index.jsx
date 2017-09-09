import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import * as userinfoActions from '../../actions/actlist'


class Home extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.changeData = this.changeData.bind(this)
  }

  changeData() {
    this.props.userActions.updateCityName({
      userid:'hw',
      city:'changsha'
    })
  }
  render(){
    return (
      <div>
        <p>{this.props.user.userid}</p>
        <p>{this.props.user.city}</p>
        <p onClick={this.changeData}>change</p>
      </div>
    );
  }

  componentDidMount() {
    this.props.userActions.login({
      userid:'abc',
      city:'beijng'
    })
  }


}


function mapStateToProps(state){
  return{
    user:state.userinfo
  }
}

function mapDispatchToProps(dispatch){
  return {
    userActions:bindActionCreators(userinfoActions,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
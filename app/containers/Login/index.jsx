import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import * as userinfoActionsFile from '../../actions/actlist';

import Header from '../../components/Header';
import LoginComponent from '../../components/Login';

import PropTypes from 'prop-types';

class Login extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.doCheck = this.doCheck.bind(this);
    this.goUserPage = this.goUserPage.bind(this);
    this.loginHandle = this.loginHandle.bind(this);
    this.state = {
      checking:true
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render(){
    return (
      <div>
        <Header title="登录"/>
        {
            // 等待验证之后，再显示登录信息
            this.state.checking
            ? <div>{/* 等待中 */}</div>
            : <LoginComponent loginHandle={this.loginHandle}/>
        }
      </div>
    );
  }

  componentDidMount(){
    this.doCheck();
    console.log(this.props.userinfo);
  }

  doCheck(){
    const userinfo = this.props.userinfo;
    if(userinfo.username){
      //已登录
      this.goUserPage();
    }else{
      //未登录
      this.setState({
          checking: false
      })
    }
  }

  //登录成功后的处理
  loginHandle(username){
    //保存用户名
    const actions = this.props.userInfoActions;
    let userinfo = this.props.userinfo;
    userinfo.username = username;
    actions.update(userinfo);

    //跳转链接
    const params = this.props.match.params;
    console.log(params);
    const router = params.router;
    if(router){
      //跳转到指定页面
      this.context.router.history.push(router);
      console.log(111);
    }else{
      //跳转到默认页面————即用户中心页面
      this.goUserPage()
    }
  }


  goUserPage(){
    //用户中心页
    this.context.router.history.push('/User');
  }

}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userinfoActionsFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
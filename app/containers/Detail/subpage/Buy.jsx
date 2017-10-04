import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BuyAndStore from '../../../components/BuyAndStore';

import * as storeActionsFromFile from '../../../actions/collectlist'

import PropTypes from 'prop-types';

class Buy extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.storeHandle = this.storeHandle.bind(this);
    this.buyHandle = this.buyHandle.bind(this);
    this.loginCheck = this.loginCheck.bind(this);
    this.checkStoreState = this.checkStoreState.bind(this);
    this.state = {
        isStore: false
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render(){
    return (
      <div>
        <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle} storeHandle={this.storeHandle}/>
      </div>
    );
  }

  componentDidMount(){
    //console.log(123,this.props.store)
    //console.log(456,this.props.storeActions)
    this.checkStoreState()
  }
  //检验当前商户是否被收藏
  checkStoreState(){
    const id = this.props.id;
    const store = this.props.store;

    //只要一个满足即可
    store.some(item =>{//some()方法用于检测数组中的元素是否满足指定条件（函数提供）。
      if(item.id === id){
        this.setState({
          isStore:true
        })
        //跳出循环
        return true
      }
    })
  }

  //购买事件
  buyHandle(){
    //验证登录
    const loginFlag = this.loginCheck();
    if(!loginFlag){//返回的是false,未登录
      return
    }
    //购买流程,省略...

    //跳转到用户主页
    this.context.router.history.push('/User');
  }

  //收藏事件
  storeHandle(){
    const loginFlag = this.loginCheck();
    if(!loginFlag){//返回的是false,未登录
      return
    }

    const id = this.props.id;
    const storeActions = this.props.storeActions;
    if(this.state.isStore){
      //当前商户已经被收藏,点击时取消收藏
      storeActions.rm({id:id});
    }else{
      //当前商户未被收藏，点击时就要执行收藏
      storeActions.add({id:id});
    }

    //修改状态
    this.setState({
      isStore:!this.state.isStore
    })

  }

  //验证登录
  loginCheck(){
    const id = this.props.id
    const userinfo = this.props.userinfo;
    if(!userinfo.username){
      //没有登录，跳转到登录页面
      this.context.router.history.push('/Login/' + encodeURIComponent('/detail/' + id));
      return false
    }
    return true
  }
}


function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)
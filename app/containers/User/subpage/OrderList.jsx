import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.scss';

import OrderListComponent from '../../../components/OrderList'

import {getOrderListData ,postComment} from '../../../axios/user/orderlist'

export default class OrderList extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    //this.submitComment = this.submitComment.bind(this);
    this.state={
      data:[]
    }
  }
  render(){
    return (
      <div className="order-list-container">
          <h2>您的订单</h2>
          {
              this.state.data.length
              ? <OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
              : <div>{/* loading */}</div>
          }
      </div>
    );
  }

  componentDidMount(){
    const username = this.props.username;
    if(username){
      this.loadOrderList(username);
    }
  }

  loadOrderList(user){
    const res = getOrderListData(user);
    res.then(res =>{
      this.setState({
          data: res.data
      })
    })
  }

  // 提交评价
  submitComment(id , value, callback) {
      const result = postComment(id, value)
      result.then(res=> {
          console.log(res.data);
          if (res.data.errno === 0) {
              // 已经评价，修改状态
              callback()
          }
      }
      )
  }


}
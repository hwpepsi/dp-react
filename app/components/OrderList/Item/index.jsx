import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

//import { postComment } from '../../../axios/user/orderlist.js'
import './style.scss';
import Star from '../../Star'

export default class Item extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      commentState: ''//0-未评价,1-评价中,2-已评价
    }
    this.showComment = this.showComment.bind(this);
    this.submitCommentHandle = this.submitCommentHandle.bind(this);
    this.hideComment = this.hideComment.bind(this);
    //this.starClickCallback = this.starClickCallback.bind(this);
    this.commentOk = this.commentOk.bind(this);
  }
  render(){
    const data = this.props.data;
    return (
      <div className="order-item-container">
          <div className="clear-fix">
              <div className="order-item-img float-left">
                  {/*<img src={data.img}/>*/}
              </div>
              <div className="order-item-comment float-right">
                  {
                    this.state.commentState === 0
                    // 未评价
                    ? <button className="btn" onClick={this.showComment}>评价</button>
                    :this.state.commentState === 1
                    // 评价中
                    ? ''
                    // 已经评价
                    : <button className="btn unseleted-btn">已评价</button>
                  }
              </div>
              <div className="order-item-content">
                  <span>商户：{data.title}</span>
                  <span>数量：{data.count}</span>
                  <span>价格：￥{data.price}</span>
              </div>
          </div>
          {
              // “评价中”才会显示输入框
              this.state.commentState === 1
              ? <div className="comment-text-container">
                  <textarea style={{width: '100%', height: '80px'}} className="comment-text" ref="commentText"></textarea>
                  {/*<div style={{paddingTop: '10px', paddingBottom: '10px'}}>
                      <Star star="0" clickCallback={this.starClickCallback}/>
                  </div>*/}
                  <button className="btn" onClick={this.submitCommentHandle}>提交</button>
                  &nbsp;
                  <button className="btn unseleted-btn" onClick={this.hideComment}>取消</button>
              </div>
              : ''
          }
      </div>
    );
  }

  componentDidMount(){
    this.setState({
      commentState:this.props.data.commentState
    })
  }

  showComment(){
    this.setState({
      commentState:1
    })
  }
  submitCommentHandle(){
    console.log('submit')
    const submitComment = this.props.submitComment
    const id = this.props.data.id;
    const commentTextDom = this.refs.commentText;
    const value = commentTextDom.value.trim();

    if(!value){
      return
    }

    submitComment(id,value,this.commentOk);
  }

  commentOk() {
    this.setState({
      commentState:2
    })
  }

  hideComment(){
    this.setState({
      commentState:0
    })
  }

  //starClickCallback(){

  //}
}
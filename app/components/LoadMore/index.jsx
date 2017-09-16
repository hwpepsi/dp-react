import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.scss';

export default class LoadMore extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.loadMoreHandle = this.loadMoreHandle.bind(this);
  }
  render(){
    return (
      <div className="load-more" ref="wrapper">
          {
            this.props.isLoadingMore
            ?<span>加载中</span>
            :<span onClick={this.loadMoreHandle}>加载更多</span>
          }
      </div>
    );
  }

  loadMoreHandle(){
    //执行loadMoreData函数
    this.props.loadMoreFn();
  }

  componentDidMount() {
    const loadMoreFn = this.props.loadMoreFn;
    const wrapper = this.refs.wrapper;
    console.log(wrapper);
    //console.log(456);
    //节流
    let timeoutId;
    function callback() {
      const top = wrapper.getBoundingClientRect().top;
      //console.log(top);
      const windowHeight = window.screen.height;
      //console.log(windowHeight);
      if (top && top < windowHeight) {
          // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
          loadMoreFn()
      }
    }
    window.addEventListener('scroll',() => {
      if(this.props.isLoadingMore){
        return
      }
      //console.log(123);
      if(timeoutId){
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(callback,50);


    },false);
  }


}
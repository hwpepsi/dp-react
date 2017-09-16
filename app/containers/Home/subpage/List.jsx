import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {getListData} from '../../../axios/home/home';
import ListComponent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';

import './style.scss'

export default class List extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.loadFirstPageData = this.loadFirstPageData.bind(this);
    this.resultHandle = this.resultHandle.bind(this);
    this.loadMoreData = this.loadMoreData.bind(this);
    this.state={
      data:[], //存储列表信息
      hasMore:false ,//记录当前状态下，还有没有更多数据可供加载
      isLoadingMore:false, //记录当前状态下，是加载中，还是点击加载更多
      page:1 //下一页的页码
    }
  }
  render(){
    return (
      <div>
        <h2 className="home-list-title">猜你喜欢</h2>
        {
            this.state.data.length
            ? <ListComponent data={this.state.data}/>
            : <div>加载中...</div>
        }
        {
            this.state.hasMore
            ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData}/>
            : ''
        }
      </div>
    );
  }

  componentDidMount() {
    //获取首页数据
    this.loadFirstPageData();
    
  }


  //获取首页数据
  loadFirstPageData(){
    const cityName = this.props.cityName;
    const result = getListData(cityName,0);

    this.resultHandle(result);
  }

  //加载更多数据
  loadMoreData(){
    //用到this.resultHandle

    //记录状态
    this.setState({
      isLoadingMore:true
    })

    const cityName=this.props.cityName
    const page = this.state.page
    const result = getListData(cityName,page);
    this.resultHandle(result);

    //增加page
    this.setState({
      page:page+1,
      isLoadingMore:false
    })

  }

  //数据处理
  resultHandle(result){
    result.then((res) => {
      console.log(res.data);
      const hasMore = res.data.hasMore;
      const data = res.data.data;

      this.setState({
        hasMore:hasMore,
        data:this.state.data.concat(data)
      })
    })
  }

}
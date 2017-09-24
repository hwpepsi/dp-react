import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux'

import { getSearchData } from '../../../axios/search/search'

import ListComponent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';

//import './style.scss'

// 初始化一个组件的 state
const initialState = {
    data: [],
    hasMore: false,
    isLoadingMore: false,
    page: 0
}

class SearchList extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.loadFirstPageData = this.loadFirstPageData.bind(this);
    this.resultHandle = this.resultHandle.bind(this);
    this.loadMoreData = this.loadMoreData.bind(this);
    this.state=initialState;
  }
  render(){
    return (
      <div>
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
    const cityName=this.props.userinfo.cityName
    const keyword = this.props.keyword || ''
    const category = this.props.category
    const result = getSearchData(0,cityName,category,keyword);

    this.resultHandle(result);
  }

  //加载更多数据
  loadMoreData(){
    //用到this.resultHandle

    //记录状态
    this.setState({
      isLoadingMore:true
    })

    const cityName=this.props.userinfo.cityName
    const page = this.state.page
    const keyword = this.props.keyword || ''
    const category = this.props.category
    const result = getSearchData(page,cityName,category,keyword);

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
      console.log(res);
      const hasMore = res.data.hasMore;
      const data = res.data.data;

      this.setState({
        hasMore:hasMore,
        data:this.state.data.concat(data)
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
      const keyword = this.props.keyword
      const category = this.props.category

      // 搜索条件完全相等时，忽略。重要！！！
      if (keyword === prevProps.keyword && category === prevProps.category) {
          return
      }

      // 重置 state
      this.setState(initialState)

      // 重新加载数据
      this.loadFirstPageData()
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
)(SearchList)
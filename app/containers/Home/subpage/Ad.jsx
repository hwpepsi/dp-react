import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {getAdData} from '../../../axios/home/home';
import HomeAd from '../../../components/HomeAd'

class Ad extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state={
      data:[]
    }
  }
  render(){
    return (
      <div>
        {
          this.state.data.length
          ?<HomeAd data={this.state.data}/>
          :<div>加载中...</div>
        }
      </div>
    );
  }

  componentDidMount(){
    const result = getAdData();
    result.then((res) =>{
      //console.log(res.data);
      const addata = res.data
      if(addata.length){
        this.setState({
          data:addata
        })
      }
    })
    //console.log(result);
  }
}

export default Ad
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {getInfoData} from '../../../axios/detail/detail';
import DetailInfo from '../../../components/DetailInfo'

export default class Info extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
        info: false
    }
  }
  render(){
    return (
      <div>
          {
              this.state.info
              ? <DetailInfo data={this.state.info}/>
              : ''
          }
      </div>
    );
  }

  componentDidMount(){
    let id = this.props.id;
    let result = getInfoData(id);
    result.then((res)=>{
      this.setState({
          info: res.data
      })
    })
  }

}
import React,{Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import SearchHeader from '../../components/SearchHeader'
import SearchList from './subpage/List'
export default class NotFound extends Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
  }
  render(){
    let params = this.props.match.params;
    return (
      <div>
        <SearchHeader keyword={params.keyword}/>
        <SearchList keyword={params.keyword} category={params.category}/>
      </div>
    );
  }

  componentDidMount() {
    //const params = this.props.params;
    console.log(this.props.match.params);
  }
}
import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import localStore from '../utils/localStore';
import {CITYNAME} from '../config/keysDefine';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userInfoAct from '../actions/actlist'

import Home from '../containers/Home';
import User from '../containers/User';
import Search from '../containers/Search';
import Detail from '../containers/Detail';
import City from '../containers/City';
import NotFound from '../containers/404Page';

class App extends Component{
	constructor(props, context){
	  super(props, context);
	  this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	  this.state = {
	    initDone: false
	  }
	}
	render() {
		let Routes = (
		  <Switch>
		    <Route path='/' exact component={Home}/>
		    <Route path='/user'  component={User}/>
		    <Route path='/search'  component={Search}/>
		    <Route path='/detail'  component={Detail}/>
		    <Route path='/city'  component={City}/>
		    <Route component={NotFound}/>
		  </Switch>
		);
		return(
			<Router>
			    <div>
			    {
			    	this.state.initDone
			    	?Routes
			    	:<div>加载中...</div>
			    }
			    </div>
			  </Router>
		)
	}

	componentDidMount() {
		//从localstorage里面获取城市
		let cityName = localStore.getItem(CITYNAME);
		console.log(cityName); //null
		if(cityName == null){
			cityName = '北京'
		}

		this.props.userInfoActions.update({
			cityName:cityName
		})
		this.setState({
			initDone:true
		})
	}


}

function mapStateToProps(state){
	return{

	}
}

//将action作为属性传给react
function mapDispatchToProps(dispatch){
	return{
		userInfoActions:bindActionCreators(userInfoAct,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
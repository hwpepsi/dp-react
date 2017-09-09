import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import PureRenderMixin from 'react-addons-pure-render-mixin';

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
	}
	render() {
		return(
			<Router>
			    <div>
			    <Switch>
			      <Route exact path="/" component={Home}/>
			      <Route path="/user" component={User}/>
			      <Route path="/search" component={Search}/>
			      <Route path="/detail" component={Detail}/>
			      <Route path="/city" component={City}/>
			      <Route  component={NotFound}/>
			    </Switch>
			    </div>
			  </Router>
		)
	}
}

export default App;
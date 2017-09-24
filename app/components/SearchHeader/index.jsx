import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { hashHistory } from 'react-router'

import SearchInput from '../SearchInput'

import './style.scss';

import PropTypes from 'prop-types';

class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
        this.enterHandle = this.enterHandle.bind(this);
    }

    static contextTypes = {
      router: PropTypes.object.isRequired
    };

    render() {
        return (
            <div id="search-header" className="clear-fix">
                <span className="back-icon float-left" onClick={this.clickHandle}>
                    <i className="icon-arrow-left2"></i>
                </span>
                <div className="input-container">
                    <i className="icon-search"></i>
                    &nbsp;
                    <SearchInput value={this.props.keyword || ''} enterHandle={this.enterHandle}/>
                </div>
            </div>
        )
    }
    clickHandle() {
        window.history.back()
    }
    enterHandle(value) {
        this.context.router.history.push('/search/all/' + encodeURIComponent(value));
    }
}

export default SearchHeader
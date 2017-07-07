//  包裹Cat

import React,{Component} from 'react';
export default class CatWrapper extends Component {

    render() {
        return (
            <div className="cat-wrapper">
                <li>{this.props.name}</li>
            </div>
        );
    }
}
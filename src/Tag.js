import React,{Component} from 'react';
import NewCats from './NewCats';
import NewProduct from './NewProduct';
export default class Tag extends Component {

    render() {
        return (
            <div className="class-name">
                {/*<NewCats />*/}
                <NewProduct />
            </div>
        );
    }
}
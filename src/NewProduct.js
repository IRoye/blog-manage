//  添加新的标签
import React, {Component} from 'react';
import axios from 'axios';
import config from './config/config';
import Chip from 'material-ui/Chip';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import CatWrapper from './components/CatWrapper';
import CatWrapperStyle from './style/CatWrapperStyle.scss';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
class NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cats: [],
        }
    }
componentWillMount() {
    this.getCats();
}
     getCats() {
  axios.get(`${config.host}/catList`)
    .then((res)=>{
      console.log(res.data.cats);
      this.setState({cats:res.data.cats})
    })
    .catch(err=>console.log(err))
     }

       handleSubmit(e) {
 
  e.preventDefault();
  console.log(this.refs.catId.value);
  let product = {
              name: this.refs.name.value,
              summary: this.refs.summary.value,
              price: this.refs.price.value,
              poster: this.refs.poster.value,
              cat: this.refs.catId.value
          };
  console.log(product);
  axios.post(`${config.host}/product/new`, product)
  .then((res) => console.log(res))
    .catch((err) => console.log(err))
    }

    render() {
        
       let optionList = this.state.cats.map((item, i) => {
        return(
          <option value={item._id} key={i}>
            {item.tagName}
          </option>)
      });

        return (
            <div className="new-product">
                <span>新建商品</span>
            <form onSubmit={this.handleSubmit.bind(this)}>
            <p>
            name
            <input ref='name' type="text" />
            </p>
            <p>
            summery
            <input ref='summary' type="text" />
            </p>
            <p>
            price:
            <input ref='price' type="text" />
            </p>
            <p>
            poster:
            <input ref='poster' type="text" />
            </p>
            <p>
            <select name="catId" ref="catId">
              { optionList }
            </select>
            </p>
            <p>
              <input type='submit' />
            </p>
            </form>

            </div>
        );
    }
}

export default NewProduct;
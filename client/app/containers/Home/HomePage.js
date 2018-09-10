import React, { Component } from 'react';
import 'whatwg-fetch';
import CategoryList from '../cat/CategoryList';

class HomePage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      categories: this.createCatList(),
      cats: []
    };

    this.createCatList = this.createCatList.bind(this);
    this.getCats = this.getCats.bind(this);

    this.getCats();
  }

  // create component will mount function

  getCats() {
    fetch('https://api.thecatapi.com/api/images/get?format=json&results_per_page=10&size=small&type=png')
      .then(res => res.json())
      .then(json => {
        if (json && json.length > 0) {
          // complete logic
          this.setState({
            cats: json
          });
        } else {
          // fail logic
          console.log("ERROR");
          this.setState({

          });
        }
      });
  }

  createCatList() {
    let catList = [];
    for (let i = 1; i <= 250; i++) {
      catList.push({
        imageUrl: "http://placehold.it/2048&text=Item"+i,
        title: "Item "+i,
        desc: "This is the description for Item "+i
      });
    }
    return catList;
  }

  render() {
    return(
      <div>
        <h1>Categories</h1>
        <CategoryList
          categories={this.state.categories}
          cats={this.state.cats}/>
      </div>
    );
  }
}

export default HomePage;

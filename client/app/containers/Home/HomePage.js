import React, { Component } from 'react';
import CategoryList from '../cat/CategoryList';

class HomePage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      categories: this.createCatList()
    };

    this.createCatList = this.createCatList.bind(this);
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
    console.log(this.state.catList);
    return(
      <div>
        <h1>Categories</h1>
        <CategoryList categories={this.state.categories}/>
      </div>
    );
  }
}

export default HomePage;

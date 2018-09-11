import React, { Component } from 'react';
import 'whatwg-fetch';
import CatList from '../components/CatList';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cats: []
    };

    this.createCatList = this.createCatList.bind(this);
    this.getCats = this.getCats.bind(this);
  }

  componentDidMount() {
    this.getCats();
  }

  getCats() {
    fetch('https://api.thecatapi.com/api/images/get?format=json&results_per_page=10&size=small&type=png')
      .then(res => res.json())
      .then(json => {
        if (json && json.length > 0) {
          // success logic
          let cats = this.processCatResponse(json);
          this.setState({
            cats: cats
          });
        } else {
          // fail logic
          console.log("ERROR");
        }
      });
  }

  processCatResponse(cats) {
    let catList = [];
    for (let i = 0; i < cats.length; i++) {
      catList.push({
        id: cats[i].id,
        imageUrl: cats[i].url,
        title: "Image "+ (i+1),
        desc: "This is the description for Image "+ (i+1) +" - it's a really cool image! Don't you agree?"
      });
    }
    return catList;
  }

  /*
    Function for generating mock up data as per requirements Task 1: Function 2
   */
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
        <CatList
          cats={this.state.cats}/>
      </div>
    );
  }
}

export default HomePage;

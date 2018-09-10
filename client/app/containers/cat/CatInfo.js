import React, { Component } from 'react';
import Header from '../common/Header';

class CatInfo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      cat: props.location.state.cat
    };

    this.playMeow = this.playMeow.bind(this);
  }

  playMeow() {
    const meow = new Audio();
    meow.src = "http://soundbible.com/mp3/Cat Meow-SoundBible.com-1977450526.mp3";
    meow.play();
  }

  render() {
    const { cat } = this.state;

    return (
      <div>
        <Header/>
        <div className="row">
          <div className="col-md-6">
            <img src={cat.imageUrl} alt="Cat" width="400" height="350"/>
          </div>
          <div className="col-md-6">
              <h1>{cat.title}</h1>
              <h4>{cat.desc}</h4>
              <br/>
              <button className="btn btn-primary" onClick={this.playMeow}>Hear me Meow</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CatInfo;

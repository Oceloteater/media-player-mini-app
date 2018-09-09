import React, { Component } from 'react';
import 'whatwg-fetch';
import { getFromStorage, setFromStorage } from '../../utils/storage';
import Form from '../account/Form';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      signUpError: "",
      LoginError: "",
      token: ""
    };
  }

  componentDidMount() {
    const token = getFromStorage("test string");
    if (token) {
      // verify
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      // not logged in
      this.setState({
        isLoading: false
      })
    }
  }

  // GET
  // fetch('/api/counters')
  //   .then(res => res.json())
  //   .then(json => {
  //     this.setState({
  //       counters: json
  //     });
  //   });

  // POST
  // fetch('/api/counters', { method: 'POST' })
  //   .then(res => res.json())
  //   .then(json => {
  //     let data = this.state.counters;
  //     data.push(json);
  //
  //     this.setState({
  //       counters: data
  //     });
  //   });


  render() {
    const { token, isLoading } = this.state;
    if (isLoading) {
      return <div><p>Loading...</p></div>
    }
    if (!token) {
      return (
        <div>
          <p>Sign Up</p>
          <p>Sign In</p>
          <Form/>
        </div>
      );
    }
    return (
      <div>
        <p>Account</p>
      </div>
    );
  }
}

export default Home;

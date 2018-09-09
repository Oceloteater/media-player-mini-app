import React, { Component } from 'react';
import 'whatwg-fetch';
import { getFromStorage, setFromStorage } from '../../utils/storage';
import LoginForm from '../account/LoginForm';
import SignUpForm from '../account/SignUpForm';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signUp: {
        error: "",
        username: "",
        password: "",
        email: ""
      },
      login: {
        error: "",
        username: "",
        password: ""
      }
    };
    this.updateSignUpState = this.updateSignUpState.bind(this);
    this.updateLoginState = this.updateLoginState.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onLogin = this.onLogin.bind(this);

  }

  componentDidMount() {
    console.log(this.state);
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

  updateSignUpState(event) {
    const field = event.target.name;
    let signUp = this.state.signUp;
    signUp[field] = event.target.value;

    return this.setState({signUp: signUp});
  }

  updateLoginState(event) {
    const field = event.target.name;
    let login = this.state.login;
    login[field] = event.target.value;

    return this.setState({login: login});
  }

  onSignUp(event) {
    const { username, password, email } = this.state.signUp;

    this.setState({
      isLoading: true
    });

    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      })
    }).then(res => res.json())
      .then(json => {
        let signUp = this.state.signUp;
        signUp.error = json.message;
        if (json.success) {
          this.setState({
            signUp: signUp,
            isLoading: false
          });
          console.log("SUCCESS");
        } else {
          this.setState({
            signUp: signUp,
            isLoading: false
          });
          console.log("FAILURE");
        }
      });
  }

  onLogin(event) {
    const { username, password } = this.state.login;

    this.setState({
      isLoading: true
    });

    fetch('/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => res.json())
      .then(json => {
        let login = this.state.login;
        login.error = json.message;
        if (json.success) {
          this.setState({
            login: login,
            isLoading: false
          });
          console.log("SUCCESS");
        } else {
          this.setState({
            login: login,
            isLoading: false
          });
          console.log("FAILURE");
        }
      });
  }


  // GET
  // fetch('/api/counters')
  //   .then(res => res.json())
  //   .then(json => {
  //     this.setState({
  //       counters: json
  //     });
  //   });


  render() {
    const { token, isLoading, login } = this.state;

    if (isLoading) {
      return <div><p>Loading...</p></div>
    }

    if (!token) {
      return (
        <div>
          <LoginForm
            login={this.state.login}
            onChange={this.updateLoginState}
            onLogin={this.onLogin}/>
          <SignUpForm
            signUp={this.state.signUp}
            onChange={this.updateSignUpState}
            onSignUp={this.onSignUp}/>
          {
            (login.error) ? (
              <p>{login.error}</p>
            ) : (null)
          }
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

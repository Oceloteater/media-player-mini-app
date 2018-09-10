import React, { Component } from 'react';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../../utils/storage';
import LoginForm from '../account/LoginForm';
import SignUpForm from '../account/SignUpForm';
import Header from '../common/Header';

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
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    const storage = getFromStorage("simfy_login");
    if (storage && storage.token) {
      const { token } = storage;
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
          signUp.username = "";
          signUp.password = "";
          signUp.email = "";
          this.setState({
            signUp: signUp,
            isLoading: false
          });
          console.log("SIGN UP SUCCESS");
        } else {
          this.setState({
            signUp: signUp,
            isLoading: false
          });
          console.log("SIGN UP FAILURE");
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
          setInStorage("simfy_login", { token: json.token});
          // login.username = "";
          // login.password = "";
          this.setState({
            login: login,
            isLoading: false,
            token: json.token
          });
          console.log("LOGIN SUCCESS");
        } else {
          this.setState({
            login: login,
            isLoading: false
          });
          console.log("LOGIN FAILURE");
        }
      });
  }

  onLogout() {
    this.setState({
      isLoading: true
    });
    const storage = getFromStorage("simfy_login");
    if (storage && storage.token) {
      const { token } = storage;
      // verify
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            let login = this.state.login;
            login.error = "";
            this.setState({
              token: "",
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

  render() {
    const { token, isLoading, login } = this.state;
    if (isLoading) {
      return <div><p>Loading...</p></div>
    }
    if (!token) {
      return (
        <div>
        <Header/>
        <div className="row">
          <div className="col-md-6">
            <LoginForm
              login={this.state.login}
              onChange={this.updateLoginState}
              onLogin={this.onLogin}/>
          </div>
          <div className="col-md-6">
            <SignUpForm
              signUp={this.state.signUp}
              onChange={this.updateSignUpState}
              onSignUp={this.onSignUp}/>
          </div>
          {
            (login.error) ? (
              <p>{login.error}</p>
            ) : (null)
          }
        </div>
        </div>
      );
    }
    return (
      <div>
        <Header
          username={this.state.login.username}/>

        <p>Account - Logged in</p>
        <button className="btn btn-primary" type="button" onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}

export default Home;

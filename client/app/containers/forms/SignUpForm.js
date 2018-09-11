import React from 'react';

const SignUpForm = ({signUp, onChange, onSignUp}) => {
    return (
        <div className="form-group">
            <form className="form-signin">
                <h3>Sign up to register</h3>
                <input
                    name="username"
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    value={signUp.username}
                    onChange={onChange}/>
                <br/>

                <input
                    name="password"
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={signUp.password}
                    onChange={onChange}/>
                <br/>

                <input
                    name="email"
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={signUp.email}
                    onChange={onChange}/>
                <br/>

                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={onSignUp}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;

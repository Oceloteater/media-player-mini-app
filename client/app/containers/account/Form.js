import React from 'react';

const Form = () => {
  return (
    <div>
      <form>
        <h1>Sign In</h1>
        <input
          name="username"
          placeholder="Username"
          label="Username"/>

        <input
          name="password"
          placeholder="Password"
          label="Password"/>

        <button type="submit">SUBMIT</button>
      </form>
      <br/>
      <form>
        <h1>Sign Up</h1>
        <input
          name="username"
          placeholder="Username"
          label="Username"/>

        <input
          name="password"
          placeholder="Password"
          label="Password"/>

        <input
          name="email"
          placeholder="Email"
          label="Email"/>

        <button type="submit">SUBMIT</button>
        </form>
    </div>
  );
};

export default Form;

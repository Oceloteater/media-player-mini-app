import React from 'react';

const LoginForm = ({login, onChange, onLogin}) => {
   return (
       <div className="form-group">
         <form className="form-signin">
           <h3>Please login</h3>
           <input
             name="username"
             className="form-control"
             type="text"
             placeholder="Username"
             value={login.username}
             onChange={onChange}/>
           <br/>

           <input
             name="password"
             className="form-control"
             type="password"
             placeholder="Password"
             value={login.password}
             onChange={onChange}/>
           <br/>

           <button
             className="btn btn-primary"
             type="button"
             onClick={onLogin}>
             Login
           </button>
         </form>
       </div>
   );
};

export default LoginForm;

import React from 'react';

 const LoginForm = () => {
   return (
     <div className="form-inline text-center">
       <div className="form-group">
         <form className="form-signin">
           <h1 className="h3 mb-3 font-weight-normal">Please login</h1>
           <input
             name="username"
             className="form-control"
             type="text"
             placeholder="Username"
             label="Username"/>
           <br/>
           <input
             name="password"
             className="form-control"
             type="password"
             placeholder="Password"
             label="Password"/>
           <br/>
           <button
             className="btn btn-primary"
             type="button">Login</button>

         </form>
       </div>
     </div>
   );
};

export default LoginForm;

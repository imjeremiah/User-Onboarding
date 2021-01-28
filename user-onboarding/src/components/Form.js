import React from "react";

export default function Form(props) {
    const { formValues, change, submit, disabled, errors } = props;
    return (
        <div>
        <form onSubmit={submit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={change}
            />
            <p>{errors.name}</p> 
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={change}
            /> 
           <p>{errors.email}</p>         
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={change}
            />   
            <p>{errors.password}</p>        
          </label>
          <label>
          Agree to Terms<input type="checkbox" name="terms" onChange={change}/> 
          </label>
          <button disabled={disabled}>Submit</button>
        </form>
      </div>
    );
  }
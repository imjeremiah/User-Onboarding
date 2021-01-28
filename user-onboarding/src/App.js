
import React, {useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import UserList from './components/List';
import * as yup from 'yup';
import formSchema from './validation/formSchema';
import axios from 'axios';

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
};

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
};
const initialUsers = [];
const initialDisabled = true;

function App() {
  
  const [formValues, setFormValues] = useState(initialFormValues);
  const [user, setUser] = useState(initialUsers);
  const [errors, setErrors] = useState(initialFormErrors); 
  const [disabled, setDisabled] = useState(initialDisabled);

  const change = evt => {
  const { name, value } = evt.target;
  validate(name, value);
  setFormValues({ ...formValues, [name]: 
    evt.target.type === "checkbox" ? evt.target.checked : evt.target.value,
  });
};
 
 const submit = evt => {
  evt.preventDefault();
 
  axios
    .post("https://reqres.in/api/users", formValues)
    .then((res) => {
      setUser([res.data, ...user]);
    console.log(res.data);
  }).catch((err) => {
    console.log(err);
});

  const newUser = {
    name: formValues.name.trim(),
    email: formValues.email.trim(),
    password: formValues.password.trim(),
  };
  setUser([...user, newUser]); 
  setFormValues(initialFormValues);
};

const validate = (name, value) => {
  yup
    .reach(formSchema, name)
    .validate(value)
    .then(() => {
      setErrors({ 
        ...errors, 
        [name]: "" });
    })
    .catch((err) => {
      setErrors({ 
        ...errors, 
        [name]: err.errors[0],
      }); 
    });
};

useEffect(() => {
  formSchema.isValid(formValues).then((valid) => {
    setDisabled(!valid);
  });
}, [formValues]);

   return (
    <div className="App">
      <Form 
      formValues={formValues} 
      change={change} 
      submit={submit} 
      disabled={disabled} 
      errors={errors}/>
      <UserList 
      tList={user} 
      key={user.id}/>
    </div>
  );
}

export default App;
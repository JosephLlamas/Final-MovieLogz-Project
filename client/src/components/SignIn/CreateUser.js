import React from 'react'
import styled from "styled-components";
import { UserContext } from '../UserContext';
import {useState,useContext} from "react";
import {useNavigate} from "react-router-dom"

const createUser={
  firstName:"",
  lastName:"",
  email:"",
  password:"",
  confirmPassword:""
}

const CreateUser = () => {

const navigate =useNavigate();
const [user, setUser]=useState(createUser);
const [error, setError] =useState();
const {currentUser ,setCurrentUser} = useContext(UserContext);

const handleSubmit = (event) =>{
  event.preventDefault();
  fetch("/addUser",{
   method: "POST",
   headers:{
       Accept:"application/json",
       "Content-Type": "application/json",
   },
   body: JSON.stringify({
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email,
    password:user.password,
    confirmPassword:user.confirmPassword,
   })
  } )
   .then((res)=>res.json())
   .then((data)=>{
    if (data.status === 404){
     setError(data.error);
    }else{
      localStorage.setItem("user",JSON.stringify(data.data));
      setCurrentUser(data.data);
      navigate("/");
    }
   })
.catch((error)=>{
alert(error);
});
console.log(currentUser);
};

  return (
    <div>
    <form onSubmit={(event)=> handleSubmit(event,user)}>
    <input
              type="text"
              placeholder="First Name"
              label={"firstName"}
              value={user.firstName}
              required={true}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              label="lastName"
              value={user.lastName}
              required={true}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              label={"email"}
              value={user.email}
              required={true}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="password"
              label={"password"}
              value={user.password}
              required={true}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="comfirm password"
              label={"confirmPassword"}
              required={true}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            /> 
      <button type="submit"> createUser</button>

    </form>
    </div>
  )
}

export default CreateUser;
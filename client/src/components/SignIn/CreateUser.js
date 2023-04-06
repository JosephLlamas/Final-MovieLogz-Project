import React from "react";
import styled from "styled-components";
import { UserContext } from "../UserContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const createUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const CreateUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(createUser);
  const [error, setError] = useState();
  const { setCurrentUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/addUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          setError(data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(data.data));
          setCurrentUser(data.data);
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={(event) => handleSubmit(event, user)}>
        <Input
          type="text"
          placeholder="First Name"
          label={"firstName"}
          value={user.firstName}
          required={true}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Last Name"
          label="lastName"
          value={user.lastName}
          required={true}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          label={"email"}
          value={user.email}
          required={true}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="password"
          label={"password"}
          value={user.password}
          required={true}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Input
          type="password"
          placeholder="confirm password"
          label={"confirmPassword"}
          required={true}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
        />
        <Button type="submit"> createUser</Button>
      </Form>
    </Wrapper>
  );
};

export default CreateUser;

const Form = styled.form`
  margin-top: 50px;
  background: orange;
  border: 1px solid orange;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 500px;
  padding: 30px 50px;
`;

const Wrapper = styled.div`
  background: orange;
  height: calc(100vh - 20px);
`;
const Button = styled.button`
  background-color: red;
  color: black;
  font-family: sans-serif;
  font-size: 20px;
  margin: 20px 0px;
  border-radius: 20px;
`;

const Input = styled.input`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

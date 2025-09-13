import React, { useEffect, useState } from "react";
import "../styles/Login.scss"
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import './LoginPage.css'
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [containermove , setcontainermove] = useState(false);
  const dispatch = useDispatch()

  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch ("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      
      /* Get data after fetching */
      const loggedIn = await response.json()
      // console.log(response)
      if (response.ok === true) {
        dispatch (
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
        // alert("incorrect email or password try again")
      }
      else{
        setEmail("");
        setPassword("");
        setcontainermove(true);
        
      }
      setTimeout(() => {
        setcontainermove(false);
      }, 500);
      
    } catch (err) {
      console.log("Login failed", err.message)
    }
  }
     
  return (
    <div className="login ">
      <div className={`login_content ${containermove ? 'loginformcontainer':""}`}>
        <form className="login_content_form " onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        {/* <a href="/register">Don't have an account? Sign In Here</a> */}
        <Link to={"/register"}>Already have an account? Log In Here</Link> 

      </div>
    </div>
  );
};

export default LoginPage;

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
//import { response } from "express";
const dotenv = require('dotenv');
dotenv.config();


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            fetch("${process.env.api_url}/login/", {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {return res.json()})
                .then((data) => {
                    if(data=="exist"){
                        //console.log('Logged in')
                        navigate('/signup')
                    }
                    else if(data=="notexist"){
                        alert("User have not sign up")
                    }
                    else if(data=="wrongpass"){
                        alert("Wrong password")
                    }
                })
            setEmail('');
            setPassword('');
        }
        catch(e){
            console.log(e);
    
        }
    } 

    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1> Login </h1>
                <input type="email" onChange={(e) => { setEmail(e.target.value)}} placeholder="Email:" name="email"/>
                <input type="password" onChange={(e) => { setPassword(e.target.value)}} placeholder="Pass:" name="password"/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
import { useState } from "react"
import { useNavigate } from "react-router-dom";
//const PORT = 3000;
//import { response } from "express";

function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const navigate = useNavigate();

    const handleLogin = (e) => {
        try {
            e.preventDefault();
            fetch("https://test4-nymeria-starks-projects.vercel.app/login/", {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => {return res.json()})
                .then((data) => {
                    console.log(data)
                    if(data._id){
                        console.log('through')
                        navigate('/homepage', {
                            state: {
                                userID: data._id
                            }
                        })
                        
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

    const handleSignup = (e) => {
        try {
            e.preventDefault();
            fetch("https://test4-nymeria-starks-projects.vercel.app/signup/", {
                method: 'POST',
                body: JSON.stringify({username, email, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {return res.json()})
                .then((data) => {
                    if(data != 'existed'){
                        navigate('/homepage', {
                            state: {
                                userID: data._id,
                                recent: ''
                            }
                        })
                        
                    }
                    else {
                        alert("Account with same email existed")
                    }
                })
            setUsername('');
            setEmail('');
            setPassword('');
        }
        catch(e){
            console.log(e);
    
        }
    } 

    

    return (
        <div className="screen">
            <div className="auth">
                <div className="auth-login">
                    <form onSubmit={handleLogin}>
                        <h1 className="auth-login-div1"> Login </h1>
                        <h1 className="auth-login-div2">
                            Email
                            <input type="email" className="auth-login-input" onChange={(e) => { setEmail(e.target.value)}} placeholder="Email:" name="email"/>
                            Password
                            <input type="password" className="auth-login-input" onChange={(e) => { setPassword(e.target.value)}} placeholder="Pass:" name="password"/>
                        </h1>
                        <button type="submit" className="auth-login-btn">Login</button>
                    </form>
                </div>
                <div className="auth-signup">
                    <form onSubmit={handleSignup}>
                        <h1 className="auth-signup-div1"> Signup </h1>
                        <h1 className="auth-signup-div2">
                            Username
                            <input type="text" className="auth-signup-input" onChange={(e) => { setUsername(e.target.value)}} placeholder="Username:" name="username"/>
                            Email
                            <input type="email" className="auth-signup-input" onChange={(e) => { setEmail(e.target.value)}} placeholder="Email:" name="email"/>
                            Password
                            <input type="password" className="auth-signup-input" onChange={(e) => { setPassword(e.target.value)}} placeholder="Pass:" name="password"/>
                        </h1>
                        <button type="submit" className="auth-signup-btn">Signup</button>
                    </form>
                </div>
                <img src="/images/logo_transparent.png" className="auth-logo"></img>
            </div>
        </div>
    )
}

export default Login
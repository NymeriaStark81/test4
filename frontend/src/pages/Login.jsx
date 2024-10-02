import { useState } from "react"
import { useNavigate } from "react-router-dom";
//const PORT = 3000;
//import { response } from "express";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            fetch("http://localhost:3000/login/", {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {return res.json()})
                .then((data) => {
                    if(data._id){
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

    

    return (
        <div className="auth">
            <div className="auth-login">
                <form onSubmit={handleSubmit}>
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
                <form>
                    <h1 className="auth-signup-div1"> Signup </h1>
                    <h1 className="auth-signup-div2">
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
    )
}

export default Login
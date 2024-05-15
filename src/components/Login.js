import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: ""});
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit= async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:5000/api/v1/auth/login`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: credentials.email, password: credentials.password}), // body data type must match "Content-Type" header
            });
            const json = await response.json();
            console.log(json)
    
            if(json.success){
                localStorage.setItem("token", json.authtoken);
                navigate('/');
                props.showAlert("Login Successfull", "success")
            }
            else{
                // alert(json.message);
                props.showAlert(json.error, "danger")
            }
        }
        catch(error){
            props.showAlert("Error! try after some time", "danger")
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' id="email" onChange={onChange} aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" onChange={onChange} minLength={5} required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    )
}

export default Login
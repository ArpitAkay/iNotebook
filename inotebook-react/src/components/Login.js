import React, { useContext, useState } from 'react'
import WebServiceInvokerRest from '../util/WebServiceInvokerRest';
import AlertContext from '../context/alert/AlertContext';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const Login = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const alertValue = useContext(AlertContext);

    const navigate = useNavigate();

    const authValue = useContext(AuthContext);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        let requestBody = {
            email: credentials.email,
            password: credentials.password
        }
        let response = await WebServiceInvokerRest("api/auth/login", "POST", null, null, requestBody);
        console.log(response);
        if(response.status === 200) {
            //redirect
            authValue.updateAuth(true, response.data.authToken)
            navigate("/")
        }
        else {
            let str = "";
            response.data.error.forEach((err) => {
                str += err.msg + " ";
            })
            alertValue.showAlert("danger", str);
        }
        setCredentials({email: "", password: ""})
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    return (
        <div className="container d-flex justify-content-center">
            <form onSubmit={handleLoginSubmit}>
                <h4 className="my-5">Login to continue to iNotebook</h4>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <div className="d-flex justify-content-center">
                    <button disabled={credentials.email.length === 0 || credentials.password.length === 0} type="submit" className="btn btn-primary mx-2">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login

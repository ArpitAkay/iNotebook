import React, { useContext, useState } from 'react'
import WebServiceInvokerRest from '../util/WebServiceInvokerRest';
import AlertContext from '../context/alert/AlertContext';

const SignUp = () => {

    const alertValue = useContext(AlertContext);

    const [signUpDetail, setSignUpDetail] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    })

    const onChange = (e) => {
        setSignUpDetail({ ...signUpDetail, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (signUpDetail.password !== signUpDetail.cpassword) {
            alertValue.showAlert("danger", "Your password and confirm password should be same");
            return;
        }

        let requestBody = {
            name: signUpDetail.name,
            email: signUpDetail.email,
            password: signUpDetail.password
        }

        let response = await WebServiceInvokerRest("api/auth/createuser", "POST", null, null, requestBody);

        if (response.status === 200) {
            alertValue.showAlert("success", "Signup successful");
        }
        else {
            let str = "";
            response.data.error.forEach((err) => {
                str += err.msg + " ";
            });

            alertValue.showAlert("danger", str);
        }
        setSignUpDetail({ name: "", email: "", password: "", cpassword: "" });
    }

    return (
        <div className="container d-flex justify-content-center">
            <form onSubmit={onSubmit}>
                <h4 className="my-5">Create an account to use iNotebook</h4>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={signUpDetail.name} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={signUpDetail.email} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={signUpDetail.password} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={signUpDetail.cpassword} onChange={onChange} minLength={5} required />
                </div>
                <div className="d-flex justify-content-center">
                    <button disabled={signUpDetail.name.length === 0 || signUpDetail.email.length === 0 || signUpDetail.password.length === 0 || signUpDetail.cpassword.length === 0} type="submit" className="btn btn-primary mx-2">Signup</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp

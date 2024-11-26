import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const handleLogin = (email, password) => {
    return axios.post('https://fed-medical-clinic-api.vercel.app/login', {
        email, password
    })
        .then((response) => {
            console.log(response);
            localStorage.setItem('token', response.data.token)
        })
        .catch((error) => {
            console.error(error);
        });
}

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {

        e.preventDefault();

        handleLogin(form.email, form.password)
            .then(() => {
                navigate('/');
            })
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form>
            <input onChange={handleChange} value={form.email} type="email" name="email" placeholder="joe.bloggs@email.com" />
            <br />
            <input onChange={handleChange} value={form.password} type="password" placeholder="password" name="password" />
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}


export default LoginForm;

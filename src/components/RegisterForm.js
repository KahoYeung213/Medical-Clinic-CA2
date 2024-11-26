import axios from "axios";
import { useState } from "react";
import { handleLogin } from "./LoginForm";
import { useNavigate } from "react-router-dom";


const RegisterForm = (props) => {
    const navigate = useNavigate();


    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://fed-medical-clinic-api.vercel.app/register', form)
            .then((response) => {
                console.log(response);

                localStorage.setItem('user', JSON.stringify(response.data.user));
                handleLogin(form.email, form.password)
                    .then(() => {
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form>
        <input onChange={handleChange} value={form.first_name} type="text" name="first_name" placeholder="First Name" />
        <input onChange={handleChange} value={form.last_name} type="text" name="last_name" placeholder="Last Name" />
        <input onChange={handleChange} value={form.email} type="email" name="email" placeholder="joe.bloggs@email.com" />
        <input onChange={handleChange} value={form.password} type="password" placeholder="password" name="password" />
        <button onClick={handleSubmit}>Submit</button>
    </form>
    );
}

export default RegisterForm;
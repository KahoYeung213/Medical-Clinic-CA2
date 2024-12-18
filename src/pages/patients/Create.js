import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        date_of_birth: ''
    });

    const handleSubmit = () => {
        axios.post(`https://fed-medical-clinic-api.vercel.app/patients`, form, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                navigate(`../${res.data.id}`, {relative: 'path'});
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Create Patient</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Phone No."
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="date"
                        placeholder="Date of Birth"
                        name="date_of_birth"
                        value={form.date_of_birth}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={handleSubmit}
                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Create;
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        specialisation: 'Dermatologist'
    });

    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setForm(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id, token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        axios.patch(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, form, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                navigate(`/doctors/${id}`, { relative: 'path', replace: true });
            })
            .catch((err) => {
                console.error('Error response:', err.response);
                if (err.response && err.response.status === 404) {
                    setError('Doctor not found. Please check the doctor ID.');
                } else if (err.response && err.response.status === 422) {
                    setError('Unprocessable content. Please check your input.');
                } else {
                    setError('An error occurred. Please try again.');
                }
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
                <h2 className="text-2xl font-bold mb-4">Edit Doctor</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
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
                        <select
                            name="specialisation"
                            value={form.specialisation}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="Podiatrist">Podiatrist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Psychiatrist">Psychiatrist</option>
                            <option value="General Practitioner">General Practitioner</option>

                        </select>
                        <button
                            type="submit"
                            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
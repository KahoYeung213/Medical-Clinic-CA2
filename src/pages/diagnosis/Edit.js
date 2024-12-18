import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [form, setForm] = useState({
        patient_id: '',
        condition: '',
        diagnosis_date: ''
    });

    const [patients, setPatients] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/patients', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setPatients(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, {
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

        const formData = {
            ...form,
            patient_id: parseInt(form.patient_id, 10),
        };

        axios.patch(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                navigate(`/diagnoses/${id}`, { relative: 'path', replace: true });
            })
            .catch((err) => {
                console.error('Error response:', err.response);
                if (err.response && err.response.status === 404) {
                    setError('Diagnosis not found. Please check the diagnosis ID.');
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
                <h2 className="text-2xl font-bold mb-4">Edit Diagnosis</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <select
                            name="patient_id"
                            value={form.patient_id}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Patient</option>
                            {patients.map(patient => (
                                <option key={patient.id} value={patient.id}>
                                    {patient.first_name} {patient.last_name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Condition"
                            name="condition"
                            value={form.condition}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="date"
                            placeholder="Diagnosis Date"
                            name="diagnosis_date"
                            value={form.diagnosis_date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
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
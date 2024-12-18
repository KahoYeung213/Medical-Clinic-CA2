import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [form, setForm] = useState({
        patient_id: '',
        condition: '',
        diagnosis_date: ''
    });

    const [patients, setPatients] = useState([]);

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
    }, [token]);

    const handleSubmit = () => {
        const formData = {
            ...form,
            patient_id: parseInt(form.patient_id, 10),
        };

        axios.post(`https://fed-medical-clinic-api.vercel.app/diagnoses`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                navigate(`../${res.data.id}`, {relative: 'path'});
            })
            .catch((err) => {
                console.error('Error creating diagnosis:', err);
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
                <h2 className="text-2xl font-bold mb-4">Create Diagnosis</h2>
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [form, setForm] = useState({
        doctor_id: '',
        patient_id: '',
        diagnosis_id: '',
        medication: '',
        dosage: '',
        start_date: '',
        end_date: ''
    });

    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [diagnose, setDiagnoses] = useState([]);

    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/doctors', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setDoctors(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

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

            axios.get('https://fed-medical-clinic-api.vercel.app/diagnoses', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setDiagnoses(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!form.doctor_id || !form.patient_id || !form.diagnosis_id || !form.medication || !form.dosage || !form.start_date || !form.end_date) {
            setError('Please fill in all required fields.');
            return;
        }

        // Convert doctor_id and patient_id to integers
        const formData = {
            ...form,
            doctor_id: parseInt(form.doctor_id, 10),
            patient_id: parseInt(form.patient_id, 10),
            diagnosis_id: parseInt(form.diagnosis_id, 10),
        };

        // Log the form data to check the format
        console.log('Form data:', formData);

        axios.post(`https://fed-medical-clinic-api.vercel.app/prescriptions`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                navigate(`../${res.data.id}`, { relative: 'path' });
            })
            .catch((err) => {
                console.error('Error response:', err.response);
                if (err.response && err.response.status === 422) {
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
            <h1 className="text-2xl font-bold mb-4">Create Appointment</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Doctor</label>
                    <select
                        name="doctor_id"
                        value={form.doctor_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="">Select a doctor</option>
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                                Dr. {doctor.last_name} (ID: {doctor.id})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Patient</label>
                    <select
                        name="patient_id"
                        value={form.patient_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="">Select a patient</option>
                        {patients.map(patient => (
                            <option key={patient.id} value={patient.id}>
                                {patient.first_name} {patient.last_name} (ID: {patient.id})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <h3 className="block text-gray-700">Prescription Dates</h3>
                    <br/>

                    <p>Start Date</p>
                    <input
                        type="date"
                        name="start_date"
                        value={form.start_date}
                        onChange={handleChange}
                        className="w-50 my-2 px-3 py-2 border rounded"
                    />
                    <p>End Date</p>
                    <input
                        type="date"
                        name="end_date"
                        value={form.end_date}
                        onChange={handleChange}
                        className="w-50 px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Diagnosis</label>
                    <select
                        name="diagnosis_id"
                        value={form.diagnosis_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="">Select a diagnosis</option>
                        {diagnose.map(diagnosis => (
                            <option key={diagnosis.id} value={diagnosis.id}>
                                {diagnosis.condition} (ID: {diagnosis.id})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Medication</label>
                    <input
                        type="text"
                        name="medication"
                        value={form.medication}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Dosage</label>
                    <input
                        type="text"
                        name="dosage"
                        value={form.dosage}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>  
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Create;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Index = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get('https://fed-medical-clinic-api.vercel.app/prescriptions', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPrescriptions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchDoctors = async () => {
            try {
                const response = await axios.get('https://fed-medical-clinic-api.vercel.app/doctors', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setDoctors(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPrescriptions();
        fetchDoctors();
    }, [token]);

    const handleDelete = (id) => {
        if (!token) {
            alert('Unauthorised! Login to delete');
            return;
        }

        axios.delete(`https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setPrescriptions(prescriptions.filter(prescription => prescription.id !== id));
                console.log('Deleted prescription:', response.data);
            })
            .catch(error => {
                console.error('Error deleting prescription:', error);
            });
    };

    const getDoctorName = (id) => {
        const doctor = doctors.find(doc => doc.id === id);
        return doctor ? `Dr. ${doctor.last_name}` : 'Unknown Doctor';
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Prescriptions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {prescriptions.map(prescription => (
                    <div className="flex flex-col items-start justify-between mb-5 p-4 border rounded shadow" key={prescription.id}>
                        <h2 className="text-xl">{getDoctorName(prescription.doctor_id)}</h2>
                        <p>Patient ID: {prescription.patient_id}</p>
                        <p>Medication: {prescription.medication}</p>
                        <button className="mt-4 p-2 bg-red-500 rounded-lg text-white" onClick={() => handleDelete(prescription.id)}>
                            Delete 🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;
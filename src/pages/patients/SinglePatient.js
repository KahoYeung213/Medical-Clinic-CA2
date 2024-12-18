import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SinglePatient = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setPatient(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id, token]);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Unauthorised! Login to delete');
            return;
        }

        axios.delete(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(`Deleted patient: ${id}`, response.data);
                navigate('/patients');
            })
            .catch(error => {
                console.error('Error deleting patient:', error);
            });
    };

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Patient Details</h1>
            <p>Name: {patient.first_name} {patient.last_name}</p>
            <p>Email: {patient.email}</p>
            <p>Phone: {patient.phone}</p>
            <p>Address: {patient.address}</p>
            <p>Date of Birth: {new Date(patient.date_of_birth).toLocaleDateString()}</p>
            <button className="mt-4 p-2 bg-red-500 rounded-lg text-white" onClick={() => handleDelete(patient.id)}>
                Delete 🗑️
            </button>
        </div>
    );
};

export default SinglePatient;
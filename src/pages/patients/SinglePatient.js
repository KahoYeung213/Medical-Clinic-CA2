import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

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

    const formatDate = (timestamp) => {
        const date = new Date(timestamp); // Convert to Date object
        return date.toLocaleDateString(); // Format the date as a string
    };

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
            <Link to={`edit`}>
                <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Edit Patient</button>
            </Link>
            <h1 className="text-2xl font-bold mb-4">Patient Details</h1>
            <p>Name: {patient.first_name} {patient.last_name}</p>
            <p>Email: {patient.email}</p>
            <p>Phone: {patient.phone}</p>
            <p>Address: {patient.address}</p>
            <p>Date of Birth: {formatDate(patient.date_of_birth)}</p>
            <button className="mt-4 p-2 bg-red-500 rounded-lg text-white" onClick={() => handleDelete(patient.id)}>
                Delete 🗑️
            </button>
        </div>
    );
};

export default SinglePatient;
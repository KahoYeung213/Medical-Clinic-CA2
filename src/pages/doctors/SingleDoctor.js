import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SingleDoctor = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setDoctor(response.data);
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

        axios.delete(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(`Deleted doctor: ${id}`, response.data);
                navigate('/doctors');
            })
            .catch(error => {
                console.error('Error deleting doctor:', error);
            });
    };

    if (!doctor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Doctor Details</h1>
            <p>Name: Dr. {doctor.first_name} {doctor.last_name}</p>
            <p>Email: {doctor.email}</p>
            <p>Phone: {doctor.phone}</p>
            <p>Specialisation: {doctor.specialisation}</p>
            <button className="mt-4 p-2 bg-red-500 rounded-lg text-white" onClick={() => handleDelete(doctor.id)}>
                Delete 🗑️
            </button>
        </div>
    );
};

export default SingleDoctor;
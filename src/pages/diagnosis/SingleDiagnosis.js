import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const SingleDiagnosis = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [diagnosis, setDiagnosis] = useState(null);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setDiagnosis(response.data);
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
    }, [id, token]);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Unauthorised! Login to delete');
            return;
        }

        axios.delete(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(`Deleted diagnosis: ${id}`, response.data);
                navigate('/diagnoses');
            })
            .catch(error => {
                console.error('Error deleting diagnosis:', error);
            });
    };

    if (!diagnosis) {
        return <div>Loading...</div>;
    }

    const getPatientName = (id) => {
        const patient = patients.find(pat => pat.id === id);
        return patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown Patient';
    };

    return (
        <div className="container mx-auto p-4">
            <Link to={`edit`}>
                <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Edit diagnosis</button>
            </Link>
            <h1 className="text-2xl font-bold mb-4">Diagnosis Details</h1>
            <p>Patient: {getPatientName(diagnosis.patient_id)}</p>
            <p>Condition: {diagnosis.condition}</p>
            <p>Date: {new Date(diagnosis.diagnosis_date).toLocaleDateString()}</p>
            <button className="mt-4 p-2 bg-red-500 rounded-lg text-white" onClick={() => handleDelete(diagnosis.id)}>
                Delete 🗑️
            </button>
        </div>
    );
};

export default SingleDiagnosis;
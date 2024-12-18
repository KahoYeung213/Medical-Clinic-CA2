import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const [diagnoses, setDiagnoses] = useState([]);
    const [patients, setPatients] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
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
                setDiagnoses(diagnoses.filter(diagnoses => diagnoses.id !== id));
                console.log(`Deleted diagnoses:${id}`, response.data);
            })
            .catch(error => {
                console.error('Error deleting diagnoses:', error);
            });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        return date.toLocaleDateString(); // Format the date as a string
    };

    const getPatientName = (id) => {
        const patient = patients.find(pat => pat.id === id);
        return patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown Patient';
    };

    return (
        <div className="ms-3">
            <Link to={`create`}>
                <button type="button" className="mt-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create diagnose</button>
            </Link>

            {diagnoses.map(diagnose => (
                <div className="mb-5" key={diagnose.id}>
                    <Link className="text-emerald-400" to={`/diagnoses/${diagnose.id}`}>
                        <h1 className="text-2xl">Patient: {getPatientName(diagnose.patient_id)}</h1>
                        <h1 className="text-2xl">Condition: {diagnose.condition}</h1>
                        <h1 className="text-2xl">Diagnosis Date: {formatDate(diagnose.diagnosis_date)}</h1>
                    </Link>
                    <button className="p-1 bg-red-500 rounded text-white" onClick={() => {
                        const confirmDelete = window.confirm('Are you sure?');
                        if (confirmDelete) {
                            handleDelete(diagnose.id);
                        }
                    }}>
                        Delete 🗑️
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Index;
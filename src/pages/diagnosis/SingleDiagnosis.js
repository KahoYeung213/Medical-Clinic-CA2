import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleDiagnosis = () => {
    const [diagnoses, setDiagnoses] = useState([]);
    const [patients, setPatients] = useState([]);
    const token = localStorage.getItem('token');
    const { id } = useParams();


    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, {
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

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        return date.toLocaleDateString(); // Format the date as a string
    };

    const getPatientName = (id) => {
        const patient = patients.find(pat => pat.id === id);
        return patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown Patient';
    };


    return diagnoses && (
        <div>
            <Link to={`edit`}>
                <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Edit diagnose</button>
            </Link>

            <h1 className="text-2xl">Patient: {getPatientName(diagnoses.patient_id)}</h1>
            <h1 className="text-2xl">Condition: {diagnoses.condition}</h1>
            <h1 className="text-2xl">diagnose Date: {formatDate(diagnoses.diagnosis_date)}</h1>


            
        </div>
    )
}

export default SingleDiagnosis;
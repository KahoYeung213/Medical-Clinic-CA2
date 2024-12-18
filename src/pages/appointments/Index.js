import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [setFilteredDoctors] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/appointments', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAppointments(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('https://fed-medical-clinic-api.vercel.app/doctors', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setDoctors(response.data);
                setFilteredDoctors(response.data); // Initialize filteredDoctors with all doctors
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

        axios.delete(`https://fed-medical-clinic-api.vercel.app/appointments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAppointments(appointments.filter(appointment => appointment.id !== id));
                console.log(`Deleted appointment:${id}`, response.data);
            })
            .catch(error => {
                console.error('Error deleting appointment:', error);
            });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        return date.toLocaleDateString(); // Format the date as a string
    };

    const getDoctorName = (id) => {
        const doctor = doctors.find(doc => doc.id === id);
        return doctor ? `Dr. ${doctor.last_name}` : 'Unknown Doctor';
    };

    const getPatientName = (id) => {
        const patient = patients.find(pat => pat.id === id);
        return patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown Patient';
    };

    return (
        <div className="ms-3">
            <Link to={`create`}>
                <button type="button" className="mt-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create appointment</button>
            </Link>

            {appointments.map(appointment => (
                <div className="mb-5" key={appointment.id}>
                    <Link className="text-emerald-400" to={`/appointments/${appointment.id}`}>
                        <h1 className="text-2xl">Doctor: {getDoctorName(appointment.doctor_id)}</h1>
                        <h1 className="text-2xl">Patient: {getPatientName(appointment.patient_id)}</h1>
                        <h1 className="text-2xl">Appointment Date: {formatDate(appointment.appointment_date)}</h1>
                    </Link>
                    <button className="p-1 bg-red-500 rounded text-white" onClick={() => {
                        const confirmDelete = window.confirm('Are you sure?');
                        if (confirmDelete) {
                            handleDelete(appointment.id);
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
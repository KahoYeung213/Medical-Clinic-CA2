import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Index = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('https://fed-medical-clinic-api.vercel.app/appointments', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAppointments(response.data);
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

        fetchAppointments();
        fetchDoctors();
    }, [token]);

    const handleDelete = (id) => {
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
                console.log('Deleted appointment:', response.data);
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Appointments</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {appointments.map(appointment => (
                    <div className="flex flex-col items-start justify-between mb-5 p-4 border rounded shadow" key={appointment.id}>
                        <h2 className="text-xl">{getDoctorName(appointment.doctor_id)}</h2>
                        <p>Patient ID: {appointment.patient_id}</p>
                        <p>Date: {formatDate(appointment.appointment_date)}</p>
                        <button className="mt-4 p-2 bg-red-500 rounded-lg text-white" onClick={() => handleDelete(appointment.id)}>
                            Delete 🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;
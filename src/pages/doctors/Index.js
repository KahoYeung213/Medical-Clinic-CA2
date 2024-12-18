import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FilterDoctor from '../../components/FilterDoctor';

const Index = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialisation, setSelectedSpecialisation] = useState('All');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('https://fed-medical-clinic-api.vercel.app/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        let filtered = doctors;
        if (selectedSpecialisation !== 'All') {
            filtered = filtered.filter(doctor =>
                doctor.specialisation === selectedSpecialisation
            );
        }

        if (searchTerm) {
            filtered = filtered.filter(doctor =>
                doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredDoctors(filtered);
    }, [searchTerm, selectedSpecialisation, doctors]);

    

    // async function deleteDoctor(id, token) {
    //     try {
    //         // Fetch all appointments and filter by doctor_id
    //         const appointmentsResponse = await axios.get(
    //             `https://fed-medical-clinic-api.vercel.app/appointments`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    
    //         const relatedAppointments = appointmentsResponse.data.filter(
    //             (appointment) => appointment.doctor_id === id
    //         );
    
    //         console.log('Filtered Appointments:', relatedAppointments);
    
    //         // Delete only related appointments
    //         if (relatedAppointments.length > 0) {
    //             for (const appointment of relatedAppointments) {
    //                 const deleteAppointmentUrl = `https://fed-medical-clinic-api.vercel.app/appointments/${appointment.id}`;
    //                 console.log('Deleting appointment at:', deleteAppointmentUrl);
    //                 await axios.delete(deleteAppointmentUrl, {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 });
    //             }
    //         }
    
    //         // Fetch all prescriptions and filter by doctor_id
    //         const prescriptionsResponse = await axios.get(
    //             `https://fed-medical-clinic-api.vercel.app/prescriptions`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    
    //         const relatedPrescriptions = prescriptionsResponse.data.filter(
    //             (prescription) => prescription.doctor_id === id
    //         );
    
    //         console.log('Filtered Prescriptions:', relatedPrescriptions);
    
    //         // Delete only related prescriptions
    //         if (relatedPrescriptions.length > 0) {
    //             for (const prescription of relatedPrescriptions) {
    //                 const deletePrescriptionUrl = `https://fed-medical-clinic-api.vercel.app/prescriptions/${prescription.id}`;
    //                 console.log('Deleting prescription at:', deletePrescriptionUrl);
    //                 await axios.delete(deletePrescriptionUrl, {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 });
    //             }
    //         }
    
    //         // Finally, delete the doctor
    //         const deleteDoctorUrl = `https://fed-medical-clinic-api.vercel.app/doctors/${id}`;
    //         console.log('Deleting doctor at:', deleteDoctorUrl);
    //         await axios.delete(deleteDoctorUrl, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    
    //         // Update the doctors list
    //         setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor.id !== id));
    //     } catch (error) {
    //         console.error('Error deleting doctor:', error);
    //         alert('Error deleting doctor. Please try again.');
    //     }
    // }
    
    


    // const handleDelete = (id) => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         alert('Unauthorised! Login to delete');
    //         return;
    //     }

    //     const confirmDelete = window.confirm('Are you sure? This will delete all related appointments and prescriptions.');
    //     if (!confirmDelete) {
    //         return;
    //     }

    //     deleteDoctor(id, token);
    // };

    return (
        <div className="container mx-auto p-4">
            <FilterDoctor
                setSearchTerm={setSearchTerm}
                setSelectedSpecialisation={setSelectedSpecialisation}
            />

<Link to={`create`}>
            <button type="button" class="mt-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create Doctor</button>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDoctors.map(doctor => (
                    <div className="flex flex-col items-start justify-between mb-5 p-4 border rounded shadow" key={doctor.id}>
                        <Link className="text-emerald-400" to={`/doctors/${doctor.id}`}>
                            <h1 className="text-xl">Dr. {doctor.last_name}</h1>
                        </Link>
                        <p>Specialisation: {doctor.specialisation}</p>
                        {/* <button className="mt-4 p-2 bg-red-500 rounded-lg text-white" onClick={() => handleDelete(doctor.id)}>
                            Delete 🗑️
                        </button> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Index;
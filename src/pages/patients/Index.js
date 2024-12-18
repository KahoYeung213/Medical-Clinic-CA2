import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';



const Index = () => {
    const [patients, setPatients] = useState([]);

    const {token} = useAuth();


    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/patients')
            .then(response => {
                setPatients(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleDelete = (id) => {
        if (!token) {
            alert('Unauthorised! Login to delete')
            return;
        }

        axios.delete(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);

            // Deleting succeeded, but has only updated festival in the DB
            // It won't update the state by itself. We'll handle that here, so the UI reflects the change
            // Again recall that state is *immutable* - we aren't modifying the original array (which is not allowed)
            // Filter is returning an entirely *new* array with an element filtered out
            setPatients(patients.filter((patient) => {
                return patient.id !==id;
            }))

        }).catch((err) => {
            console.error(err)
        })
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        return date.toLocaleDateString(); // Format the date as a string
    };

    return (
        <div className="ms-3">
            <Link to={`create`}>
            <button type="button" class="mt-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create Patient</button>
            </Link>


            {patients.map(patient => (
                
                <div className="mb-5" key={patient.id}>
                    
                    <Link className="text-emerald-400" to={`/patients/${patient.id}`}>
                        <h1 className="text-2xl">{patient.first_name} {patient.last_name}</h1>
                    </Link>

                    <h1 className="text-lg">Date of Birth: {formatDate(patient.date_of_birth)}</h1>


                    <button className="bg-red-500 rounded text-white" onClick={() => {
                            const confirmDelete = window.confirm('are you sure?')

                            if (confirmDelete) {
                                handleDelete(patient.id)
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
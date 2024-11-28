import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/useAuth';



const Index = () => {
    const [doctors, setDoctors] = useState([]);

    const {token} = useAuth();


    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/doctors')
            .then(response => {
                setDoctors(response.data);
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

        axios.delete(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);

            // Deleting succeeded, but has only updated festival in the DB
            // It won't update the state by itself. We'll handle that here, so the UI reflects the change
            // Again recall that state is *immutable* - we aren't modifying the original array (which is not allowed)
            // Filter is returning an entirely *new* array with an element filtered out
            setDoctors(doctors.filter((doctor) => {
                return doctor.id !=id;
            }))

        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <div>
            <Link to={`create`}>
            <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create Doctor</button>
            </Link>


            {doctors.map(doctor => (
                
                <div className="mb-5" key={doctor.id}>
                    <button onClick={() => {
                            const confirmDelete = window.confirm('are you sure?')

                            if (confirmDelete) {
                                handleDelete(doctor.id)
                            }
                        }}>
                            Delete 🗑️
                        </button>
                    <Link className="text-emerald-400" to={`/doctors/${doctor.id}`}>
                        <h1 className="text-xl">Dr.{doctor.last_name}</h1>
                    </Link>
                    <p>Specialisation: {doctor.specialisation}</p>
                </div>
            ))}
        </div>
    );

}

export default Index;
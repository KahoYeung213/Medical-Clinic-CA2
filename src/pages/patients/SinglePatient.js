import { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SinglePatient = (props) => {
    const token = localStorage.getItem('token')

    const [patient, setPatient] = useState(null)

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res)
                setPatient(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        return date.toLocaleDateString(); // Format the date as a string
    };

    return patient && (
        <div>
            <Link to={`edit`}>
            <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Edit Patient</button>
            </Link>
            <h1 className="text-2xl">Full Name: {patient.first_name} {patient.last_name}</h1>
            <h1 className="text-2xl">Phone No. {patient.phone}</h1>
            <h1 className="text-2xl">Email: {patient.email}</h1>
            <h1 className="text-2xl">Address: {patient.address}</h1>
            <h1 className="text-2xl">Date of Birth: {formatDate(patient.date_of_birth)}</h1>
        </div>
    )
}

export default SinglePatient;
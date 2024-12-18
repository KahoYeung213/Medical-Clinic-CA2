import { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SingleDoctor = (props) => {
    const token = localStorage.getItem('token')

    const [doctor, setDoctor] = useState(null)

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res)
                setDoctor(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    return doctor && (
        <div>
            <Link to={`edit`}>
            <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Edit Doctor</button>
            </Link>

            <h1 className="text-4xl mb-5">Dr.{doctor.last_name}</h1>
            <h2 className="text-2xl">First Name: {doctor.first_name}</h2>
            <h2 className="text-2xl">Last Name: {doctor.last_name}</h2>
            <h2 className="text-2xl">Specialisation: {doctor.specialisation}</h2>
            <h2 className="text-2xl">Email: {doctor.email}</h2>
            <h2 className="text-2xl">Phone No: {doctor.phone}</h2>


            <div>
            </div>
        </div>
    )
}

export default SingleDoctor;
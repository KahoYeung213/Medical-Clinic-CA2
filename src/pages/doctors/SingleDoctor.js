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
                Edit Doctor
            </Link>
            <h1>{doctor.first_name}</h1>
            <h2>{doctor.last_name}</h2>
            <div>
            </div>
        </div>
    )
}

export default SingleDoctor;
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

    return patient && (
        <div>
            <Link to={`edit`}>
                Edit patient
            </Link>
            <h1>{patient.first_name}</h1>
            <h2>{patient.last_name}</h2>
            <div>
            </div>
        </div>
    )
}

export default SinglePatient;
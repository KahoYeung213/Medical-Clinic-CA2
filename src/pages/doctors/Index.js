import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';


const Index = () => {
    const [doctors, setDoctors] = useState([]);

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



    return (
        <div>
            {doctors.map(doctor => (
                <div key={doctor.id}>
                    <Link to={`/doctors/${doctor.id}`}>
                        <h1>Dr.{doctor.last_name}</h1>
                    </Link>
                    <p>Specialisation: {doctor.specialisation}</p>
                </div>
            ))}
        </div>
    );

}

export default Index;
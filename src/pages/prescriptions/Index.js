import { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
    const [prescriptions, setPrescription] = useState([]);

    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/prescriptions')
        .then(response => {
            setPrescription(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    },[]);

    

    return (
        <div>
            <h1>All prescriptions</h1>
            {prescriptions.map(patient => (
                <div key={patient.id}>
                    <h3>Name: {patient.first_name} {patient.last_name}</h3>
                </div>
            ))}
        </div>
    );
    
}

export default Index;
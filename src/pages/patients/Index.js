import { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/patients')
        .then(response => {
            setPatients(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    },[]);

    

    return (
        <div>
            <h1>All Patients</h1>
            {patients.map(patient => (
                <div key={patient.id}>
                    <h3>Name: {patient.first_name} {patient.last_name}</h3>
                </div>
            ))}
        </div>
    );
    
}

export default Index;
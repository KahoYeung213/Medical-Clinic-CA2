import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const Edit = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const [form, setForm] = useState({})
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res)                
                setForm(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])



    const handleSubmit = () => {
        axios.patch(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, form, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                navigate(`/doctors/${id}`, { relative: 'path', replace: true })
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const handleChange = (e) => {
        setForm(({
            ...form,
            [e.target.name]: e.target.value
        }))
    }


    return (
        <div>
            <h1>Edit a Doctor</h1>
            <div>
                <input type='text' placeholder='First Name' name='first_name' value={form.first_name} onChange={handleChange} />
                <input type='text' placeholder='Last Name' name='last_name' value={form.last_name} onChange={handleChange} />
                <input type='text' placeholder='Email' name='email' value={form.email} onChange={handleChange} />
                <input type='text' placeholder='Phone No.' name='phone' value={form.phone} onChange={handleChange} />

                <select name='specialisation' onChange={handleChange}>
                    <option value='Podiatrist'>Podiatrist</option>
                    <option value='Dermatologist'>Dermatologist</option>
                    <option value='Pediatrician'>Pediatrician</option>
                    <option value='Psychiatrist'>Psychiatrist</option>
                </select>
                <button onClick={handleSubmit}>Submit</button>

            </div>
        </div>
    )
}

export default Edit;
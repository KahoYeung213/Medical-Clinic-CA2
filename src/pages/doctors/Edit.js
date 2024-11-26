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
        axios.get(`https://festivals-api.vercel.app/api/festivals/${id}`, {
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
        axios.put(`https://festivals-api.vercel.app/api/festivals/${id}`, form, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                navigate(`/festivals/${id}`, { relative: 'path', replace: true })
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
            <h1>Edit a festival</h1>
            <div>
                <input type='text' placeholder='Title' name='title' value={form.title} onChange={handleChange} />
                <input type='text' placeholder='Description' name='description' value={form.description} onChange={handleChange} />

                <select name='city' onChange={handleChange}>
                    <option value='dublin'>Dublin</option>
                    <option value='cork'>Cork</option>
                    <option value='galway'>Galway</option>
                    <option value='waterford'>Waterford</option>
                    <option value={form.city}>{form.city}</option>
                </select>

                <input value={form.start_date} type='date' name='start_date' onChange={handleChange} />

                <input value={form.end_date} type='date' name='end_date' onChange={handleChange} />

                <button onClick={handleSubmit}>Submit</button>

            </div>
        </div>
    )
}

export default Edit;
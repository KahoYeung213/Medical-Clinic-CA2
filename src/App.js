import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/useAuth";

//components
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute";
//pages
import DoctorsIndex from "./pages/doctors/Index";
import SingleDoctor from "./pages/doctors/SingleDoctor";
import CreateDoctor from "./pages/doctors/Create";
import EditDoctor from "./pages/doctors/Edit";


import PatientsIndex from "./pages/patients/Index";
import SinglePatient from "./pages/patients/SinglePatient";
import PrescriptionIndex from "./pages/prescriptions/Index";
import Home from "./pages/Home";

import './css/index.css';


const App = () => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Navbar setAuthenticated={setAuthenticated} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm setAuthenticated={setAuthenticated} />} />
                    <Route path="/register" element={<RegisterForm setAuthenticated={setAuthenticated} />} />

                    <Route path="/doctors" element={<DoctorsIndex />} />
                    <Route path="/doctors/:id" element={<SingleDoctor />} />

                    <Route path='/doctors/create' element={<CreateDoctor />} />
                    <Route path='/doctors/:id/edit' element={<EditDoctor />} />


                    <Route path="/patients" element={<PatientsIndex />} />
                    <Route path="/patients/:id" element={<SinglePatient />} />
                    <Route path="/prescriptions" element={<PrescriptionIndex />} />
                    {/* Add ProtectedRoute for routes that require authentication */}
                    <Route path="/protected" element={<ProtectedRoute authenticated={authenticated} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
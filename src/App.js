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

import AppointmentIndex from "./pages/appointments/Index";
import SingleAppointment from "./pages/appointments/SingleAppointment";
import CreateAppointment from "./pages/appointments/Create";
import EditAppointment from "./pages/appointments/Edit";

import PatientsIndex from "./pages/patients/Index";
import SinglePatient from "./pages/patients/SinglePatient";
import CreatePatient from "./pages/patients/Create";
import EditPatient from "./pages/patients/Edit";

import DiagnosesIndex from "./pages/diagnosis/Index";
import SingleDiagnosis from "./pages/diagnosis/SingleDiagnosis";
import CreateDiagnoses from "./pages/diagnosis/Create";
import EditDiagnoses from "./pages/diagnosis/Edit";

import Prescription from "./pages/prescriptions/Index";
import SinglePrescription from "./pages/prescriptions/SinglePrescription";
import CreatePrescription from "./pages/prescriptions/Create";
import EditPrescription from "./pages/prescriptions/Edit";

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
                    <Route path='/patients/create' element={<CreatePatient />} />
                    <Route path='/patients/:id/edit' element={<EditPatient />} />

                    <Route path="/appointments" element={<AppointmentIndex />} />
                    <Route path="/appointments/:id" element={<SingleAppointment />} />
                    <Route path='/appointments/create' element={<CreateAppointment />} />
                    <Route path='/appointments/:id/edit' element={<EditAppointment />} />

                    <Route path="/diagnoses" element={<DiagnosesIndex />} />
                    <Route path="/diagnoses/:id" element={<SingleDiagnosis />} />
                    <Route path='/diagnoses/create' element={<CreateDiagnoses />} />
                    <Route path='/diagnoses/:id/edit' element={<EditDiagnoses />} />

                    <Route path="/prescriptions" element={<Prescription />} />
                    <Route path="/prescriptions/:id" element={<SinglePrescription />} />
                    <Route path='/prescriptions/create' element={<CreatePrescription />} />
                    <Route path='/prescriptions/:id/edit' element={<EditPrescription />} />


                    <Route path="/prescriptions" element={<PrescriptionIndex />} />
                    {/* Add ProtectedRoute for routes that require authentication */}
                    <Route path="/protected" element={<ProtectedRoute authenticated={authenticated} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
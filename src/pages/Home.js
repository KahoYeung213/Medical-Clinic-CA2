import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center justify-center">
            <h1 className="text-violet-800 font-bold text-4xl mb-8">Home</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Link to="/doctors" className="w-40 bg-violet-300 rounded overflow-hidden shadow-lg mx-auto">
                    <div className="px-6 py-4">
                        <img className="w-100 h-32 object-cover mx-auto" src='/images/doctor.png' alt="doctor" />
                        <h3 className="text-center text-violet-800 font-bold text-lg mb-8">Doctors</h3>
                    </div>
                </Link>
                <Link to="/patients" className="w-40 bg-violet-300 rounded overflow-hidden shadow-lg mx-auto">
                    <div className="px-6 py-4">
                        <img className="w-100 h-32 object-cover mx-auto" src='/images/patient.png' alt="patients" />
                        <h3 className="text-center text-violet-800 font-bold text-lg mb-8">Patients</h3>
                    </div>
                </Link>
                <Link to="/appointments" className="w-40 bg-violet-300 rounded overflow-hidden shadow-lg mx-auto">
                    <div className="px-6 py-4">
                        <img className="w-100 h-32 object-cover mx-auto" src='/images/appointment.png' alt="appointment" />
                        <h3 className="text-center text-violet-800 font-bold text-lg mb-8">Appointments</h3>
                    </div>
                </Link>
                <Link to="/prescriptions" className="w-40 bg-violet-300 rounded overflow-hidden shadow-lg mx-auto">
                    <div className="px-6 py-4">
                        <img className="w-100 h-32 object-cover mx-auto" src='/images/prescription.png' alt="prescriptions" />
                        <h3 className="text-center text-violet-800 font-bold text-lg mb-8">Prescriptions</h3>
                    </div>
                </Link>
                <Link to="/diagnoses" className="w-40 bg-violet-300 rounded overflow-hidden shadow-lg mx-auto">
                    <div className="px-6 py-4">
                        <img className="w-100 h-32 object-cover mx-auto" src='/images/diagnosis.png' alt="diagnoses" />
                        <h3 className="text-center text-violet-800 font-bold text-lg mb-8">Diagnoses</h3>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Home;
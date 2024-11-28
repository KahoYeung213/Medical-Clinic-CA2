import '../css/index.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center justify-center">
            <h1 className="text-violet-800 font-bold text-4xl mb-8">Home</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Link to="/doctors" className="w-40 bg-violet-300 rounded overflow-hidden shadow-lg mx-auto">
                    <div className="px-6 py-4">
                        <img className="w-full" src='/images/doctor.png' alt="doctor" />
                        <h3 className="text-center text-violet-800 font-bold text-2xl mb-8">Doctors</h3>
                    </div>
                </Link>
                <Link to="/patients" className="w-40 bg-violet-300 rounded overflow-hidden shadow-lg mx-auto">
                    <div className="px-6 py-4">
                        <img className="w-full" src='/images/patient.png' alt="patients" />
                        <h3 className="text-center text-violet-800 font-bold text-2xl mb-8">Patients</h3>
                    </div>
                </Link>
                <Link to="/doctors" className="w-40 bg-violet-300 rounded overflow-hidden shadow-lg mx-auto">
                    <div className="px-6 py-4">
                        <img className="w-full" src='/images/doctor.png' alt="doctor" />
                        <h3 className="text-center text-violet-800 font-bold text-2xl mb-8">Doctors</h3>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Home;
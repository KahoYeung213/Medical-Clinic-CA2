import React from 'react';

const FilterDoctor = ({ setSearchTerm, setSelectedSpecialisation }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search by name"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded"
            />
            <select
                onChange={(e) => setSelectedSpecialisation(e.target.value)}
                className="ml-2 p-2 border rounded"
            >
                <option value="All">All Specialisations</option>
                <option value="General Practitioner">General Practitioner</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Podiatrist">Podiatrist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Psychiatrist">Psychiatrist</option>
            </select>
        </div>
    );
};

export default FilterDoctor;
import React, { useEffect, useState } from 'react';
import Person from './Person';
import './Personpage.css';
import axios from "axios";

const Personpage = ({apiKey}) => {
    const [users, setUsers] = useState([]); // Holds processed users
    const [loading, setLoading] = useState(true); // Tracks loading state
    const [error, setError] = useState(null); // Tracks errors

    useEffect(() => {
        const fetchData = () => {
            axios
                .get("https://cs-514-project-5-database.wl.r.appspot.com/findAllPeople") // Replace with your Google Cloud database endpoint
                .then((response) => {
                    setUsers(response.data); // Assuming the data is returned in `response.data`
                })
                .catch((err) => {
                    setError("Failed to load users");
                    console.error("Error fetching data:", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchData();
    }, []);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const NUM_COLUMNS = 4;
    const personsFlat = users.flat(); // Flatten the users array

// Calculate the number of rows
    const NUM_ROWS = Math.ceil(personsFlat.length / NUM_COLUMNS);

// Reshape into column-major order
    const persons2D = Array.from({ length: NUM_COLUMNS }, (_, colIdx) =>
        Array.from({ length: NUM_ROWS }, (_, rowIdx) => {
            const idx = rowIdx * NUM_COLUMNS + colIdx;
            return personsFlat[idx]; // Select the element in column-major order
        }).filter(Boolean) // Remove undefined values (for incomplete columns)
    );

    return (
        <div>
            <div className="horizontal-container">
                {persons2D.map((peopleArr, colIdx) => (
                    <div key={colIdx} className="">
                        {peopleArr.map((person, personIdx) => (
                            <Person
                                key={personIdx}
                                name={person.name}
                                imageUrl={person.imageUrl}
                                contribution={person.contribution}
                                importance={person.importance}
                                politicalInfluence={person.politicalInfluence}
                                apiKey={apiKey.toString()}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Personpage;

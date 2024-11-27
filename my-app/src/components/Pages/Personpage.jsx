import React, { useEffect, useState } from 'react';
import Person from './Person';
import './Personpage.css';
// import processNames from "./ParseWiki";
import userData from "./users.json";
import axios from "axios";

const Personpage = () => {
    const KEY = "demo";

    const [users, setUsers] = useState([]); // Holds processed users
    const [loading, setLoading] = useState(true); // Tracks loading state
    const [error, setError] = useState(null); // Tracks errors

    // useEffect(() => {
    //     try {
    //         // Simulate fetching names from the local file
    //         setUsers(userData);
    //     } catch (err) {
    //         setError("Failed to load users");
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);


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

// Reshape into row-major order
    const persons2D = Array.from({ length: NUM_ROWS }, (_, rowIdx) =>
        Array.from({ length: NUM_COLUMNS }, (_, colIdx) => {
            const idx = rowIdx * NUM_COLUMNS + colIdx;
            return personsFlat[idx]; // Select the element in row-major order
        }).filter(Boolean) // Remove undefined values (for incomplete rows)
    );

    return (
        <div>
            <div className="person-list">
                {persons2D.map((peopleArr, colIdx) => (
                    <div key={colIdx} className="horizontal-container">
                        {peopleArr.map((person, personIdx) => (
                            <Person
                                key={personIdx}
                                name={person.name}
                                imageUrl={person.imageUrl}
                                contribution={person.contribution}
                                importance={person.importance}
                                politicalInfluence={person.politicalInfluence}
                                apiKey={KEY.toString()}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Personpage;

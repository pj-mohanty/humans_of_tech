import React, { useState } from "react";
import axios from "axios";
import Person from "./Person"; // Ensure the correct path to the Person component
import './SearchName.css'; // Import the CSS file
import './parsewiki';
import processNames from "./parsewiki";

export function SearchName( {apiKey}) {
    const [users, setUsers] = useState([]); // Holds processed users
    const [loading, setLoading] = useState(false); // Tracks loading state
    const [error, setError] = useState(null); // Tracks errors
    const [name, setName] = useState(""); // User input
    const [personData, setPersonData] = useState(null); // Retrieved Person data

    const handleSearch = () => {
        setLoading(true); // Set loading to true when search starts
        setError(""); // Clear previous errors
        setPersonData(null); // Clear previous person data

        // Axios GET request to fetch Person data by name
        axios
            .get(`https://cs-514-project-5-database.wl.r.appspot.com/findByName?name=${name}`)
            .then(async (response) => {
                const data = response.data;
                if (data && data.length > 0) {
                    setUsers(data); // Set users if data is found
                } else {
                    console.log(`No data found for "${name}". Attempting to process using processNames().`);

                    const names = [name]; // Prepare name for processNames
                    try {
                        const processedNames = await processNames(names, apiKey);// Call processNames and wait for its completion
                        if (processedNames && processedNames.length > 0) {
                            setUsers(processedNames); // Set users with processed names
                        } else {
                            console.error("Error: No processed data returned for the name.");
                            setError(`No data found for "${name}" and unable to process further.`);
                        }
                    } catch (error) {
                        console.error("Error processing names:", error);
                        setError(`An error occurred while processing the name "${name}".`);
                    }
                }
            })
            .catch((err) => {
                setError("Failed to load users");
                console.error("Error fetching data:", err);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when request completes
            });
    };

    // Flatten users array and create 2D array for displaying in rows
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

    // Display loading or error messages
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Search for a Person</h1>
            <div className="search-input-container">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Update state on input change
                    placeholder="Enter name"
                    className="search-input"
                />
                <button
                    onClick={handleSearch} // Call handleSearch function when button is clicked
                    className="search-button"
                >
                    Search
                </button>
            </div>

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
                                apiKey={apiKey.toString()}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
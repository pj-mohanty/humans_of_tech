import React, { useEffect, useState } from 'react';
import Person from './Person';
import './Personpage.css';
// import processNames from "./ParseWiki";
import userData from "./users.json";

const Personpage = () => {
    const KEY = "demo";

    const [users, setUsers] = useState([]); // Holds processed users
    const [loading, setLoading] = useState(true); // Tracks loading state
    const [error, setError] = useState(null); // Tracks errors

    useEffect(() => {
        try {
            // Simulate fetching names from the local file
            setUsers(userData);
        } catch (err) {
            setError("Failed to load users");
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const NUM_COLUMNS = 4;
    const personsFlat = users.flat();
    const persons2D = Array.from({ length: NUM_COLUMNS }, (_, colIdx) =>
        personsFlat.filter((_, idx) => idx % NUM_COLUMNS === colIdx)
    );

    return (
        <div>
            <div className="person-list">
                {persons2D.map((peopleArr, colIdx) => (
                    <div key={colIdx} className="column">
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

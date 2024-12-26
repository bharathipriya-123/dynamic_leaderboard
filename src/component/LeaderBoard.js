
import React, { useState } from 'react';
import '../style/LeaderBoard.css';

export default function LeaderBoard() {
    const [user, setUser] = useState([
        { id: 1,
        name: 'BHARATHI', 
        score: 100, 
        country: 'SriLanka', 
        mobile: 9677878147, 
        ageGroup: 10 
        },
        { id: 2, 
        name: 'PRIYA',
        score: 120,
        country: 'Uk', 
        mobile: 789458785, 
        ageGroup: 15

        },
        { id: 3,
        name: 'JANANI',
        score: 150, 
        country: 'Dubai',
        mobile: 5478961235,
        ageGroup: 21
        },
        { id: 4,
        name: 'SHALINI',
        score: 170, 
        country: 'Usa',
        mobile: 9677878147,
        ageGroup: 30
        },
        { id: 5, 
        name: 'ZARA',
        score: 110, 
        country: 'India',
        mobile: 9677878147, 
        ageGroup: 25 
        },
    ]);

    const [filter, setFilter] = useState({ country: 'All', ageGroup: 'All' });

    
    const parseAgeGroup = (ageGroup) => {
        if (ageGroup === 'All') return [0, Infinity];
        const [min, max] = ageGroup.split('-').map(Number);
        return [min, max];
    };

    const filteredUsers = user
        .filter((user) => filter.country === 'All' || user.country === filter.country)
        .filter((user) => {
            const [min, max] = parseAgeGroup(filter.ageGroup);
            return user.ageGroup >= min && user.ageGroup <= max;
        })
        .sort((a, b) => b.score - a.score);

    const handleChallenge = (id) => {
        setUser((prevUsers) =>
            prevUsers.map((u) =>
                u.id === id ? { ...u, score: u.score + 10 } : u
            )
        );
    };

    return (
        <div>
            <h2>Dynamic LeaderBoard</h2>
            <div>
                <label htmlFor="country">
                    Country:
                    <select
                        name="country"
                        id="country"
                        onChange={(e) => setFilter({ ...filter, country: e.target.value })}
                    >
                        <option value="All">All</option>
                        <option value="Usa">USA</option>
                        <option value="Uk">UK</option>
                        <option value="India">INDIA</option>
                        <option value="Dubai">DUBAI</option>
                        <option value="SriLanka">SRILANKA</option>
                    </select>
                </label>

                <label htmlFor="age">
                    Age:
                    <select
                        name="agegroup"
                        id="age"
                        onChange={(e) => setFilter({ ...filter, ageGroup: e.target.value })}
                    >
                        <option value="All">All</option>
                        <option value="10-15">10-15</option>
                        <option value="16-20">16-20</option>
                        <option value="21-25">21-25</option>
                        <option value="26-30">26-30</option>
                        <option value="31-35">31-35</option>
                    </select>
                </label>
            </div>
            <ul>
                {filteredUsers.map((user, index) => (
                    <li
                        key={user.id}
                        className={`list ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}
                    >
                        <p>{user.name}</p>
                        <p>{user.score}</p>
                        <p>{user.country}</p>
                        <p>{user.mobile}</p>
                        <p>{user.ageGroup}</p>
                        <button onClick={() => handleChallenge(user.id)}>Challenge</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

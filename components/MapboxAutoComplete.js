
import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';

const MapboxAutoComplete = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        if (value.trim() !== '') {
            try {
                const apiKey = 'API KEY';
                const boundingBox = '68.1766451354, 6.753515625, 97.4025614766, 35.5044758006'; // Bounding box for India
                const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    value
                )}.json?country=US&access_token=${apiKey}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                const suggestions = data.features.map((feature) => feature.place_name);
                setSuggestions(suggestions);
            } catch (error) {
                console.error('Error fetching data:', error);
                console.log('Error fetching data:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a location in India"
                value={searchQuery}
                onChange={handleChange}
            />
            <ul>
                {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                ))}
            </ul>
        </div>
    );
};

export default MapboxAutoComplete;

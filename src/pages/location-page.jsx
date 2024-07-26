import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { gql, useApolloClient } from "@apollo/client";

// const GET_CHARACTERS_DETAIL = gql`
//     query {
//       character(id: ${id}) {
//         name
//         status
//         species
//         type
//         gender
//         origin {
//           name
//           type
//           dimension
//         }
//         location {
//           name
//         }
//         image
//         episode {
//           id
//           name
//         }
//       }
//     }
//   `;
export default function CharacterByLocation() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [locationKeys, setLocationKeys] = useState([]);

  const handleLocationClick = (locationKey) => {
    setSelectedLocation(locationKey);
    // Fetch characters for the selected location
    const storedCharacters =
      JSON.parse(localStorage.getItem(locationKey)) || [];
    setCharacters(storedCharacters);

    // Find all keys with the same value
    const locationValue = localStorage.getItem(locationKey);
    const keysWithSameValue = Object.keys(localStorage).filter(
      (key) => localStorage.getItem(key) === locationValue
    );
    setLocationKeys(keysWithSameValue);
  };

  useEffect(() => {
    // Fetch locations from local storage keys
    const storedLocations = Object.keys(localStorage)
      .filter((key) => key.startsWith("assignedLocation-"))
      .map((key) => ({
        key,
        value: localStorage.getItem(key),
      }));
    setLocations(storedLocations);
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <h1>Character by Location</h1>
        <ul>
          {locations.map((location, index) => (
            <li key={index} onClick={() => handleLocationClick(location.key)}>
              {location.value}
            </li>
          ))}
        </ul>
        {selectedLocation && (
          <div>
            <h2>Characters in {localStorage.getItem(selectedLocation)}</h2>
            <ul>
              {characters.map((character, index) => (
                <li key={index}>
                  <img
                    src={character.image}
                    alt={character.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                  {character.name}
                </li>
              ))}
            </ul>
            <h3>Keys with the same value:</h3>
            <ul>
              {locationKeys.map((key, index) => (
                <li key={index}>{key}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

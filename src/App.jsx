import { useEffect, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import CharacterCard from "./components/character-card";

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

function App() {
  const client = useApolloClient();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    client
      .query({ query: GET_CHARACTERS })
      .then((result) => {
        console.log(result.data.characters.results);
        setCharacters(result.data.characters.results);
      })
      .catch((error) => console.error(error));
  }, [client]);

  return (
    <div className="container">
      <h1 className="display-4 text-center">Rick and Morty Character List</h1>

      <div className="row justify-content-center gap-3">
        {characters.map((character, index) => (
          <CharacterCard key={index} character={character}></CharacterCard>
        ))}
      </div>
    </div>
  );
}

export default App;

import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CharacterDetailPage() {
  const [character, setCharacter] = useState({});
  const client = useApolloClient();
  const { id } = useParams();
  const GET_CHARACTERS_DETAIL = gql`
    query {
      character(id: ${id}) {
        name
        status
        species
        type
        gender
        origin {
          name
          type
          dimension
        }
        location {
          name
        }
        image
        episode {
          id
          name
        }
      }
    }
  `;

  useEffect(() => {
    client
      .query({ query: GET_CHARACTERS_DETAIL })
      .then((result) => {
        console.log(result.data.character);
        setCharacter(result.data.character);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(character);
  return (
    <div>
      {character.name ? (
        <>
          <h1>{character.name}</h1>
          <img src={character.image} alt={character.name} />
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Type: {character.type}</p>
          <p>Gender: {character.gender}</p>
          <p>Location : {character.location.name}</p>
          <p>Origin : {character.origin.name}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

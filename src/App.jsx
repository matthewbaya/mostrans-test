import { useEffect, useState } from "react";
import { gql, useApolloClient } from "@apollo/client";
import CharacterCard from "./components/character-card";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
      info {
        next
        prev
      }
    }
  }
`;

function App() {
  const client = useApolloClient();
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({ next: null, prev: null });
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching data
    client
      .query({ query: GET_CHARACTERS, variables: { page } })
      .then((result) => {
        console.log(result.data.characters.results);
        setCharacters(result.data.characters.results);
        setPageInfo(result.data.characters.info);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, [client, page]);

  const handleNextPage = () => {
    if (pageInfo.next) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageInfo.prev) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container">
      <h1 className="display-4 text-center">Rick and Morty Character List</h1>

      {loading ? ( // Display loading text when loading
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row justify-content-center gap-3">
          {characters.map((character, index) => (
            <CharacterCard key={index} character={character}></CharacterCard>
          ))}
        </div>
      )}

      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={!pageInfo.prev || loading}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={!pageInfo.next || loading}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

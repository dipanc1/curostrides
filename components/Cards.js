import { useQuery, gql } from '@apollo/client';
import client from '../pages/apollo/apollo-client';
import styles from '../styles/Home.module.css'

const QUERY = gql`
query RickandMorty {
  characters {
    results {
      name
      status
      id
      origin {
        id
        name
      }
      location {
        id
        name
      }
      gender
    }
  }
}
`;

export default function Cards() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2><a href="#loading" aria-hidden="true" class="aal_anchor" id="loading"><svg aria-hidden="true" class="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Loading...</h2>;
  }

  if (error){
    console.log(error);
    return null;
  }

  const characters = data.characters.results;

  return (
    <div className={styles.grid}>
      {characters.map(character => (
        <div key={character.id} className={styles.card} style={{ backgroundColor: character.origin.name === 'unknown' ? 'red' : null }}>
          <h2>Name: {character.name}</h2>
          <p>Status: {character.status}</p>
          <p>Gender: {character.gender}</p>
          <p>Location: {character.location.name}</p>
          <p>Origin: {character.origin.name}</p>
        </div>
      ))}
    </div>
  )
};
export async function getStaticProps() {
    const { data } = await client.query({
        query: gql `
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
            }
          }
        }
      `,
    });

    return {
        props: {
            characters: data.characters.results,
        },
    };
}
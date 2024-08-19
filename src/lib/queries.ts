import { gql } from '@apollo/client';

export const SEARCH_POKEMON = gql`
  query SearchPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      types
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
      }
    }
  }
`;

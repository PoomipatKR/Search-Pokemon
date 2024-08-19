export interface Attack {
    name: string;
    type: string;
    damage: number;
}
  
export interface Evolution {
    id: string;
    name: string;
}
  
export interface Pokemon {
    id: string;
    name: string;
    types: string[];
    image: string;
    attacks: {
      fast: Attack[];
      special: Attack[];
    };
    evolutions: Evolution[];
}
  
export interface SearchPokemonData {
    pokemon: Pokemon;
}
  
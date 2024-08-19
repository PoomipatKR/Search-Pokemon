// components/SearchComponent.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_POKEMON } from '../lib/queries';
import client from '../lib/apollo-client';
import { SearchPokemonData } from '../types';

const SearchComponent: React.FC = () => {
  const router = useRouter();
  const { query } = router;

  // Handle `query.name` which might be `string`, `string[]`, or `undefined`
  const initialSearchTerm = Array.isArray(query.name) ? query.name[0] : query.name || '';
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [searchPokemon, { loading, error, data }] = useLazyQuery<SearchPokemonData>(SEARCH_POKEMON, { client });

  useEffect(() => {
    if (query.name) {
      const name = Array.isArray(query.name) ? query.name[0] : query.name;
      setSearchTerm(name || '');
      searchPokemon({ variables: { name: (name || '').toLowerCase() } });
    }
  }, [query.name]);

  const handleSearch = () => {
    router.push(`/?name=${searchTerm}`); // Update the URL with the search query
    searchPokemon({ variables: { name: searchTerm.toLowerCase() } });
  };

  const handleEvolutionClick = (evolutionName: string) => {
    router.push(`/?name=${evolutionName.toLowerCase()}`); // Update the URL with the evolution name
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pokemon = data?.pokemon;

  return (
    <div className = "pt-10">
      <div className="flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          style={{ width: '1000px' }}
          placeholder="Enter Pokémon name"
        />
        <button onClick={handleSearch} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
      </div>
      {pokemon ? (
        <div>
          <div className="flex items-center justify-center pt-10">
            <div className="w-fit flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="h-full w-full rounded-lg" src={pokemon.image} alt={pokemon.name} />
              <div className="flex flex-col w-full justify-between p-4 leading-normal">
                <h2 className="text-white text-3xl font-bold">{pokemon.name}</h2>
                  <div className="inline-block rounded-md border border-black px-3 py-1 bg-white text-black font-bold">
                    TYPE <span className="bg-gray-400 text-white rounded-md px-3 py-1 inline-block">{pokemon.types.join(', ')}</span>
                  </div>
                <div className="inline-block rounded-md border border-black px-3 py-1 bg-white text-black font-bold">
                  EVOLUTIONS {pokemon.evolutions?.length ? (
                    <ul>
                      {pokemon.evolutions.map((evolution) => (
                        <li key={evolution.id}>
                          <button className="bg-gray-400 text-white rounded-md px-3 py-1 inline-block" onClick={() => handleEvolutionClick(evolution.name)}>
                            {evolution.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                <p>No evolutions available.</p>)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex  justify-center pt-10">
        <div className="inline-block rounded-md border border-black px-3 py-1 bg-white text-black font-bold">
              FAST ATTACK
              {pokemon.attacks?.fast?.length ? (
                <ul>
                  {pokemon.attacks.fast.map((attack) => (
                    <li className="bg-gray-400 text-white rounded-md px-3 py-1 mb-1" key={attack.name}>
                      <strong>Name:</strong> {attack.name}<br />
                      <strong>Type:</strong> {attack.type}<br />
                      <strong>Damage:</strong> {attack.damage}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No fast attacks available.</p>
              )}
          </div>
          <div className="inline-block rounded-md border border-black px-3 py-1 bg-white text-black font-bold">
            SPECIAL ATTACKS
            {pokemon.attacks?.special?.length ? (
              <ul>
                {pokemon.attacks.special.map((attack) => (
                  <li className="bg-gray-400 text-white rounded-md px-3 py-1 mb-1" key={attack.name}>
                    <strong>Name:</strong> {attack.name}<br />
                    <strong>Type:</strong> {attack.type}<br />
                    <strong>Damage:</strong> {attack.damage}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No special attacks available.</p>
            )}
          </div>
        </div>
        </div>
      ) : (
        <p className="flex items-center justify-center p-10">No Pokémon found.</p>
      )}
    </div>
  );
};

export default SearchComponent;

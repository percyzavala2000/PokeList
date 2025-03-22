import {pokeApi} from '../../config/api/pokeApi';
import {Pokemon} from '../../domain/entities/pokemon';
import {
  PokeAPIPaginatedResponse,
  PokeApiPokemon,
} from '../../infrastructure/interfaces/pokeapi.interface';
import {PokemonMapper} from '../../infrastructure/mappers/pokemon-mapper';

export const getPokemons = async (
  page: number,
  limit: number = 20,
): Promise<Pokemon[]> => {
  try {
    const url = `pokemon?offset=${page * 10}&limit=${limit}`;
    const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    const pokemonPromises = data.results.map(info => {
      return pokeApi.get<PokeApiPokemon>(info.url);
    });

    const pokemonsData = await Promise.all(pokemonPromises);

    const pokemons = await Promise.all(
      pokemonsData.map(data => PokemonMapper.pokeApiPokemonToEntity(data.data)),
    );  

    console.log(pokemons[0]);

    return pokemons;
   
  } catch (error) {
    throw new Error('Error fetching pokemons');
  }
};

import { Pokemon } from '../../domain/entities/pokemon';
import { getPokemonById } from './get-pokemons-by-id';

export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {
  try {
    const pokemons = await Promise.all(ids.map((id) => getPokemonById(id)));
    return pokemons;
  } catch (error) {
    throw new Error('Error fetching pokemons');
  }
}
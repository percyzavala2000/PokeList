import { pokeApi } from '../../config/api/pokeApi';
import { Pokemon } from '../../domain/entities/pokemon';
import { PokeApiPokemon } from '../../infrastructure/interfaces/pokeapi.interface';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon-mapper';

 export const getPokemonById = async (id: number):Promise<Pokemon> => {
  try {
    console.log('peticion')
    const {data} = await pokeApi.get<PokeApiPokemon>(`/pokemon/${id}`);
   
    const pokemon=await PokemonMapper.pokeApiPokemonToEntity(data);
    return pokemon;

  } catch (error) {
    throw new Error('Error fetching pokemon');
  }

}
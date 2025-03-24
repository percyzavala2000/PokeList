

export interface Pokemon {
  id: number;
  name: string;
  avatar: string;
  sprites: string[];
  types: string[];
  color: string;
  games: string[];
  stats: Stat[];
  abilities: string[];
  moves: Move[];
}

export interface Stat {
  name: string;
  value: number;
}
export interface Move {
  name: string;
  level: number;
}

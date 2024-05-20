export type Status = 'Dead' | 'Alive' | 'unknown';

export type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export type Origin = {
  name: string;
  url: string;
};

export type Location = {
  name: string;
  url: string;
};

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: Origin;
  location: Location;
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
  // Client
  favorite?: boolean;
}

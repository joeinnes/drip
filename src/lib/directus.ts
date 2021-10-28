import { Directus, ID, FileItem } from '@directus/sdk';

type Coffee = {
  id: ID;
  name: string;
  cost: number;
  description: string;
  image: FileItem;
  ratings: Rating[];
  link: string;
};

type Rating = {
  id: ID;
  directus_users_id: User;
  coffees_id: Coffee;
  comments: string;
  rating: number;
  date?: string;
};

type User = {
  id: ID;
  first_name: string;
  last_name: string;
  avatar: string;
};

type DripAPI = {
  coffees: Coffee;
  coffees_directus_users: Rating;
  directus_users: User;
};

export const directus = new Directus<DripAPI>('https://api.traist.co.uk/');

export type { Coffee, Rating, User };
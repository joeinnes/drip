import { Directus } from '@directus/sdk';

type Coffee = {
  id: string;
  name: string;
  cost: number;
  description: string;
  image: {
    id: string;
  }
  ratings: Rating[];
  link: string;
};

type Rating = {
  id?: string;
  directus_users_id: User;
  coffees_id: Coffee;
  comments: string;
  rating: number;
  date?: string;
}

type User = {
  id: string;
  first_name: string;
  last_name: string;
  image: {
    id: string;
  }
  avatar: string;
};
// Map your collections to its respective types. The SDK will
// infer its types based on usage later.
type DripAPI = {
  // [collection_name]: typescript_type
  coffees: Coffee;
  coffees_directus_users: Rating;

  // You can also extend Directus collection. The naming has
  // to match a Directus system collection and it will be merged
  // into the system spec.
  directus_users: User;
};

export const directus = new Directus<DripAPI>('https://api.traist.co.uk/');

export type { Coffee, Rating, User };
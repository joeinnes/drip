import { Directus } from '@directus/sdk';

type Coffee = {
  id: string;
  name: string;
  cost: number;
  description: string;
  image: {
    id: string;
  }
};

// Map your collections to its respective types. The SDK will
// infer its types based on usage later.
type DripAPI = {
  // [collection_name]: typescript_type
  coffees: Coffee;

  // You can also extend Directus collection. The naming has
  // to match a Directus system collection and it will be merged
  // into the system spec.
  directus_users: {
    first_name: string;
    last_name: string;
    image: {
      id: string;
    }
  };
};

export const directus = new Directus<DripAPI>('https://api.traist.co.uk/');

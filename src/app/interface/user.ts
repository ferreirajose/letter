export interface User {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  },
  website: string;
  address: Address
}

export interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: number,
  geo: {
    lat: number,
    lng: number
  }
}

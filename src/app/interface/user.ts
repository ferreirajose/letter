export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  },
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

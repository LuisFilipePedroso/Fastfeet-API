export default interface IRecipient {
  id: number;
  name: string;
  street: string;
  number: number;
  address: string;
  state: string;
  city: string;
  postal_code: string;
  created_at?: Date;
  updated_at?: Date;
}

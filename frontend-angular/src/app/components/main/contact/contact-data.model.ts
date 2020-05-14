export interface contactData {
  _id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  isRead:boolean;

}

export interface IContact{
  message : string,
  result: contactData[]
}

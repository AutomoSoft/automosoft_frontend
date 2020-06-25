export interface contactData {
  _id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  //action: string;
  isRead:boolean;
  addedon: number;
  isArchived:boolean;


}

export interface IContact{
  message : string,
  result: contactData[]
}

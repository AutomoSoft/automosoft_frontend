import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { contactData, IContact } from './contact-data.model';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({ providedIn: "root"})
export class contactService {
  constructor(private http: HttpClient) {}
  baseUrl = "http://localhost:3000/contact";

  newMessage(
    name: string,
    email: string,
    subject:string,
    content: string,
    //addedon: Date,

   ): void{
      const contactData: contactData ={name: name, email: email, subject: subject, content: content, isRead: false,isArchived: false, _id:null, addedon: Date.now(),  };

      this.http.post("http://localhost:3000/contact/contactUs", contactData)
        .subscribe(response => {
          console.log(response);
        });


  }
  getMessages(): Observable<IContact>{
    return this.http.get<IContact>("http://localhost:3000/contact/emails").pipe(
    tap(data=> console.log("//" )),
    catchError(this.handleError)
    );

  }

  handleError(err: HttpErrorResponse){
    return throwError("Couldn,t get emails from server");
  }

  updateMessages(id:string): void{

    this.http.put(`${this.baseUrl}/isRead/${id}`, id).subscribe(respose =>{
      console.log(respose);
    });
  }
  markAsUnread(id:string, callback): void{

    this.http.put(`${this.baseUrl}/unRead/${id}`, id).subscribe(respose =>{
      console.log(respose);
      callback();
    });
  }
  archiveMessages(id:string, callback): void{

    this.http.put(`${this.baseUrl}/isArchived/${id}`, id).subscribe(respose =>{
      console.log(respose);
      callback();
    });
  }


}

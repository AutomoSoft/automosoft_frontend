import { Component, OnInit } from '@angular/core';
import { contactData } from '../../main/contact/contact-data.model';
import { contactService } from '../../main/contact/contact.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  emails: contactData[];
  filteredEmails: contactData[];
  performFilters():contactData[]{
    return this.emails.filter((email:contactData)=> email.isRead===false)

  }
  getEmailsFromServer(){
    this.messageService.getMessages().subscribe({
      next:messages => {
        this.emails=messages.result;
        this.filteredEmails=this.performFilters();


        console.log(this.emails);
      }
    })
  }
  markAsRead(id:string){
    this.messageService.updateMessages(id);
    this.getEmailsFromServer();



  }


  constructor(private messageService: contactService) { }

  ngOnInit() {
    this.getEmailsFromServer();
  }

}

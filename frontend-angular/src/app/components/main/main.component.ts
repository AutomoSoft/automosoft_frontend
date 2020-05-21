import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  collapsed=true;
  constructor() { }

  ngOnInit() {
  }

  toggle(){
    this.collapsed=!this.collapsed;
  }


}

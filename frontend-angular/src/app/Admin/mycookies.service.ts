import { Injectable } from '@angular/core';
import { CookieData } from './CookieData';

@Injectable({
  providedIn: 'root'
})

export class MycookiesService {
  logingstatus=false;
  userData:CookieData={userid:"",usertype:""};
  profile;



  constructor() {
    // var temp=localStorage.getItem("exd");
    if(this.getCookie("userAuth")!=''){


      var data=JSON.parse(this.getCookie("userAuth"));
      this.userData.userid=data.userid;
      this.userData.usertype=data.usertype;
      var name=data.name.split(" ");
      this.profile=name[0] + " ("+data.usertype+")";
      this.logingstatus=true;
    }else{
      this.logingstatus=false;
      this.userData.userid="";
      this.userData.usertype="";
    }
  }

  // setCookie(name: string, value: string, expireDays: number, path: string = '') {


  //   let d: Date = new Date();
  //   d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  //   let expires: string = `[expires]=${d.toUTCString()}`;
  //   let cpath: string = path ? `; path=${path}` : '';
  //   document.cookie = `${name}=${value}; ${expires}${cpath}`;
  //   if(expireDays!=-1){
  //     var data=JSON.parse(value);
  //     var name=data.name+"("+data.usertype+")";
  //     this.logingstatus=true;
  //   }

  // }
  setCookie(cname, cvalue, exdays:number) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    if(exdays!=-1){
      var data=JSON.parse(this.getCookie("userAuth"));
      var name=data.name.split(" ");
      this.profile=name[0] + " ("+data.usertype+")";
      console.log(name);
      this.userData.userid=data.userid;
      this.userData.usertype=data.usertype;
      // this.profile=name;
      this.logingstatus=true;
    }

  }


  // getCookie(name: string) {
  //   let ca: Array<string> = document.cookie.split(';');
  //   let caLen: number = ca.length;
  //   let cookieName = `${name}=`;
  //   let c: string;

  //   for (let i: number = 0; i < caLen; i += 1) {
  //     c = ca[i].replace(/^\s+/g, '');
  //     if (c.indexOf(cookieName) == 0) {

  //       return c.substring(cookieName.length, c.length);
  //     }
  //   }
  //   return '';
  // }
  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}

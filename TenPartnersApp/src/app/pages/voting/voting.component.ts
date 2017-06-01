import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ChangeDetectorRef } from "@angular/core";
import { ServiceService } from '../../service.service';

@Component(
{
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})

export class VotingComponent implements OnInit, AfterViewChecked
{

  savedDate: string = '';
  public newMessage: string;
  public m ;
  public messages: FirebaseListObservable<any>;
  name: string; //////////////////////////////////////////////////////////////////////////////////////////////////
  email: string;

  constructor(private service: ServiceService, private router: Router, public af: AngularFireDatabase) 
  {
   // this.m = this.af.database.ref('/messages');
//console.log(this.m);
        this.messages = this.af.list('messages');
        this.email = 
    this.newMessage = '';

    this.name = this.service.getCurrentUser();
    this.email = this.service.getCurrentEmail();

  }

  ngOnInit() {}

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  // ==================================================

  isMe(email)
  {
    if (email == this.email)
      return true;
    return false;
  }
  
  /*
  isMe(email) 
  {
    if (email == this.afService.email)
      return true;
    
    return false;
  }
*/

  // ==================================================
  // If need to print the date ahead

  needToPrint(date)
  {
    if (this.savedDate != date)
    {
      this.savedDate = date;
      //this.ref.detectChanges();

      return true;
    }
    //this.ref.detectChanges();
     return false;
  }


// ==================================================

  sendMessage()
  {
    this.messages.push({message: this.newMessage, name: this.name, email: this.email, date: new Date().toLocaleString()});
    this.newMessage = '';
  }


  ngAfterViewChecked() 
  {
    // this.scrollToBottom();
  }

  scrollToBottom(): void 
  {
    try 
    {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } 
    catch(err) { }
  }

}


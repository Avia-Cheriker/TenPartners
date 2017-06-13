import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AfterViewChecked, ElementRef, ViewChild, Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {ChangeDetectorRef} from "@angular/core";
import {ServiceService} from '../../service.service';



@Component(
    {
        selector: 'app-board',
        templateUrl: './board.component.html',
        styleUrls: ['./board.component.css']
    })

export class BoardComponent implements OnInit {

    @ViewChild('scrollMe') private myScrollContainer: ElementRef;



    // variables
    private userId: string;
    private userCommunity: string;
    private name: string;
    private email: string;

    private currentProject: any;
    private currentI: any;
    private projectPath: any;
    private projectSelected: boolean;
    private cost: number;
    private date: Date;
    private purpose: string;
    private description: string;

    private showDetailsForm: boolean;


    private firstTimeOfScoller: boolean;

    private savedDate: string;
    private newMessage: string;
    private projectUpdate: FirebaseListObservable<any>;

    // pointers of object or list in firebase
    private user: FirebaseListObservable<any>; // pointer to user
    private projects: FirebaseListObservable<any>;
    private projectsAssociatedCommunities_Arr: any;
    private projectsValues_Arr: any;
    private needViewMore: boolean;

    private pointerToProjectObjectInAF: FirebaseObjectObservable<any>;



//======================================================  constructor  ============================================================

    constructor(private router: Router, private service: ServiceService, public af: AngularFireDatabase) {
        this.userId = this.service.getCurrentID();
        this.user = this.af.list('users/' + this.userId); // the specific user
        this.name = this.service.getCurrentUser();
        this.email = this.service.getCurrentEmail();
        this.firstTimeOfScoller = true;
        this.showDetailsForm = false;

        this.user.subscribe((snapshots) => {
            snapshots.forEach(snapshot => {
                if (snapshot.$key == 'associatedCommunity')
                    this.userCommunity = snapshot.$value;
            });
        })

        this.projects = this.af.list('projects');

        this.projects.subscribe((snapshots) => {
            this.projectsAssociatedCommunities_Arr = [];
            this.projectsValues_Arr = [];

            snapshots.forEach(snapshot => {
                this.projectsAssociatedCommunities_Arr.push(this.af.list('projects/' + snapshot.$key + '/associatedCommunities'));
                this.projectsValues_Arr.push(snapshot);
            });
        })

        this.newMessage = '';
        this.savedDate = '';
        this.currentProject = '';
        this.projectPath = '';
        this.projectSelected = false;
    }

//========================================================  ngOnInit  ============================================================

    ngOnInit() {
        this.scrollToBottom()
        this.service.setTitle("Submitted Projects");



    }


//========================================================  saveProjectPath  =========================================================

    saveProjectPath(project, i) {
        this.projectPath = 'projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/' + project.$key;
        return true;
    }

//======================================================  loadProjectDetails  =========================================================

    loadProjectDetails(project, i) {
        this.currentProject = project;
        this.currentI = i;
        this.projectUpdate = this.af.list('projects/' + this.projectsValues_Arr[i].$key + '/associatedCommunities/'+ this.userCommunity);
        this.projectSelected = true;
        this.cost = project.cost;
        this.date = project.date;
        this.purpose = this.projectsValues_Arr[i].purpose;
        this.description = this.projectsValues_Arr[i].description;
        this.needViewMore=false;

    }




    chooseProject() {
        this.showDetailsForm = true;
    }

    choosen() {
      //  this.projectUpdate.update({ 'associatedUser': this.userId });
        //this.projectUpdate.update({ 'date': this.date  });
       // this.projectUpdate.update({ 'cost': this.cost  });
       // this.projectUpdate.update({ 'uploudDate': new Date() });

        //this.projects.update(({ 'associatedUser': this.userId }));
       // this.projectsValues_Arr[this.currentI].associatedCommunities[this.userCommunity].update({ 'associatedUser': this.userId });
       // this.projectsValues_Arr[this.currentI].associatedCommunities[this.userCommunity].update({ 'date': this.date });
        //this.projectsValues_Arr[this.currentI].associatedCommunities[this.userCommunity].update({ 'cost': this.cost });
        //this.projectsValues_Arr[this.currentI].associatedCommunities[this.userCommunity].update({ 'uploudDate': new Date() });
        this.close();
    }

    close() {
        this.showDetailsForm = false;
        this.currentI = -1;
    }


//======================================================   scrollToBottom  =========================================================

    scrollToBottom(): void {
        // if(this.firstTimeOfScoller == true)
        // {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) {
        }
        this.firstTimeOfScoller = false;
        //  }
        console.log("in scrollToBottom");

    }

    viewMore(bol)
    {
        this.needViewMore = bol;
    }
}



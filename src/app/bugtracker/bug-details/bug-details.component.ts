import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BugsService } from '../bugs.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { pairwise } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss']
})
export class BugDetailsComponent implements OnInit, OnDestroy {
  bugId
  events
  bug
  bugListSubscription
  commentForm
  currentStatus
  // authState

  constructor(private route: ActivatedRoute,
              private bs:BugsService,
              private fb:FormBuilder,
              private auth: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params)
      this.bugId=params.id
      console.log(this.bugId)
      // this.bug =
      this.getBug(this.bugId)
      this.getEvents(this.bugId)
    })
    this.createCommentForm()
  }
  ngOnDestroy(){
    if(this.bugListSubscription){
      this.bugListSubscription.unsubscribe()
    }
  }

  getBug(id){
    this.bugListSubscription=this.bs.bugsListSubj.subscribe(res=>{
      if(res!=null){
        res.forEach(bug => {
          if(bug.id==id){
            this.bug=bug
            this.currentStatus=this.bug.status
            console.log(bug)
          }
        });
      }
    })
  }
  getEvents(id){
    this.bs.returnCollection(id).valueChanges().subscribe(res=>{
      this.events=res
      console.log(res)
    })
  }

  createCommentForm(){
    this.commentForm = this.fb.group({
      comment:[{value:'', disabled:!this.authorized()}, Validators.required, ]
    })
  }
  addComment(){
    console.log(this.commentForm.value)
    this.bs.addComment(this.bugId, this.commentForm.value.comment)
    this.commentForm.reset()
  }
  onStatusChange(){
    // console.log()
    // console.log(this.bug.status)
      // this.bs.editBug(this.bug)
      this.bs.changeStatus(this.bug, this.currentStatus, this.bug.status)
      this.currentStatus=this.bug.status
      // console.log("status changed")
  }

  authorized(){
    return this.auth.getAuthState()
  }
}

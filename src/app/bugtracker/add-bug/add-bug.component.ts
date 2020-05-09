import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BugsService } from '../bugs.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.scss']
})
export class AddBugComponent implements OnInit, OnDestroy {
  bugForm:FormGroup
  currentBug

  bugId
  editMode=false
  bugListSubscription
  bug
  constructor(private fb:FormBuilder,
              private bs: BugsService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.createBugForm()
    this.route.params.subscribe(res=>{
      console.log(res)
      if(res.id){
        this.editMode=true
        this.bugId=res.id
        this.getBug(this.bugId)
      }
    })
  }

  createBugForm(){
    this.bugForm=this.fb.group({
      title:'',
      description:'',
      assignee:'',
      project:'',
      status:'',
      severity:''
    })
    //created reportedBy, due
  }

  addBug(){
    console.log(this.bugForm.value)
    this.currentBug=this.bugForm.value
    this.currentBug.createdDate= Date.now()
    this.currentBug.reportedBy = "current User"
    this.bs.addBug(this.currentBug)
    this.router.navigate(['/bugtracker'])
  }

  getBug(id){
    this.bugListSubscription=this.bs.bugsListSubj.subscribe(res=>{
      if(res!=null){
        res.forEach(bug => {
          if(bug.id==id){
            this.bug=bug
            this.fillForm()
          }
        });
      }
    })
  }
  ngOnDestroy(){
    if(this.bugListSubscription){
      this.bugListSubscription.unsubscribe()
    }
  }

  fillForm(){
    this.bugForm.patchValue(this.bug)
  }

  editBug(){
    const editedBug ={...this.bug, ...this.bugForm.value}
    if(JSON.stringify(this.bug)!==JSON.stringify(editedBug)){
      this.bs.editBug(editedBug)
      this.router.navigate(['/bugtracker'])
    }else{
      console.log('no changes')
    }

  }
}

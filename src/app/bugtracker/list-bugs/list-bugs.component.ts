import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BugsService } from '../bugs.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-list-bugs',
  templateUrl: './list-bugs.component.html',
  styleUrls: ['./list-bugs.component.scss']
})
export class ListBugsComponent implements OnInit, OnDestroy {
  bugsList
  bugListData: any;
  bugListDisplayedColumns: string[] = ['title', 'assignee', 'project', 'status', 'severity', 'reportedBy', 'createdDate'];
  @ViewChild('bugListPaginator', { static: true }) paginatorBugList: MatPaginator;
  @ViewChild('bugListSort', { static: true }) sortBugList: MatSort;

  bugListSubscription

  constructor(private bs:BugsService,
              private auth:AuthService) { }

  ngOnInit() {
      this. bugListSubscription=this.bs.bugsListSubj.subscribe(res=>{
        if(res!=null){
          this.bugsList= res
          console.log(res)
          this.bugListData = new MatTableDataSource<any>(this.bugsList);
          this.bugListData.paginator = this.paginatorBugList;
          this.bugListData.sort = this.sortBugList;
          // this.auth.authUser().subscribe(res=>{
          //   console.log(res)

          // })
        }
      })
  }

  ngOnDestroy(){
    if(this.bugListSubscription){
      this.bugListSubscription.unsubscribe()
    }
  }

}

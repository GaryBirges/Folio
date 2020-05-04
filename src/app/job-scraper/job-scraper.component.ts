import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-job-scraper',
  templateUrl: './job-scraper.component.html',
  styleUrls: ['./job-scraper.component.scss']
})
export class JobScraperComponent implements OnInit {
  allJobs

  jobData: any;
  jobDisplayedColumns: string[] = ['title', 'link', 'description', 'from', 'date'];
  @ViewChild('jobPaginator', { static: true }) paginatorJobs: MatPaginator;
  @ViewChild('jobSort', { static: true }) sortJobs: MatSort;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getJobsFromHeroku()
  }

  getJobsFromHeroku(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    this.http.get<any>('https://secure-garden-42780.herokuapp.com/jobs', {headers:headers}).subscribe(jobs=>{
      console.log(jobs)
      // this.allJobs=jobs
      this.allJobs=jobs
      this.jobData = new MatTableDataSource<any>(this.allJobs);
      this.jobData.paginator = this.paginatorJobs;
      this.jobData.sort = this.sortJobs;
    })
  }

}

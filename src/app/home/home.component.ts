import {ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import { IsActiveService } from '../services/is-active.service';
import { environment } from '../../environments/environment.prod';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  version=environment.version
  
  constructor(changeDetectorRef: ChangeDetectorRef, 
              media: MediaMatcher,
              public ias: IsActiveService
              ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngOnInit() {
    console.log(environment)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  active() {
    console.log('called')
    this.ias.active()
  }
}

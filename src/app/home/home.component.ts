import {ChangeDetectorRef, Component, OnInit, OnDestroy, HostBinding} from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import { IsActiveService } from '../games/services/is-active.service';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  version=environment.version
  darkModeForm:FormGroup
  
  constructor(changeDetectorRef: ChangeDetectorRef, 
              media: MediaMatcher,
              public ias: IsActiveService,
              private fb: FormBuilder,
              public overlayContainer: OverlayContainer,
              ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngOnInit() {
    this.createDarkModeForm()
    this.changeStyle()
   
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  active() {
    this.ias.active()
  }

  createDarkModeForm(){
    this.darkModeForm = this.fb.group({
      darkMode: false,
    });
  }
  changeStyle(){
    this.darkModeForm.valueChanges.subscribe(e=>{
      if(e.darkMode){
        this.onSetTheme('dark-theme')
      }else{
        this.onSetTheme('light-theme')
      }
    })
  }

  @HostBinding('class') componentCssClass;

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
}

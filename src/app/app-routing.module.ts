import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PuzzleComponent } from './games/puzzle/puzzle.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Puzzle2Component } from './games/puzzle2/puzzle2.component';
import { SnakeComponent } from './games/snake/snake.component';
import { ScoreBoardComponent } from './games/score-board/score-board.component';
import { GalleryComponent } from './doxiPhoto/gallery/gallery.component';
import { UploadComponent } from './doxiPhoto/upload/upload.component';
import { LoginComponent } from './doxiPhoto/login/login.component';
import { PongComponent } from './games/pong/pong.component';


const routes: Routes = [
  // { path: '', redirectTo: 'loginBroker', pathMatch: 'full' },  //change it from login
  { path: '', component: HomeComponent, 

  //   canActivate:[AuthGuard],
  //   canDeactivate:[CanDeactivateGuard],
  //   canActivateChild:[AuthGuard],
    children: [
          {path: '', component: WelcomeComponent},
          {path : 'puzzle', component: PuzzleComponent},
          {path : 'puzzle2', component: Puzzle2Component},
          {path : 'snake', component: SnakeComponent},
          {path : 'pong', component: PongComponent},
          {path : 'scoreboard', component: ScoreBoardComponent},
          {path : 'gallery', component: GalleryComponent},
          // {path: "gallery", component: GalleryComponent},
          {path: 'upload', component: UploadComponent,},// canActivate: [AuthGuard]},
          {path: 'login', component: LoginComponent},
          {path: 'upload', component: UploadComponent},
  //     { path: '', component: DashboardMainComponent},
  //     { path: 'legacy', component: IframeComponent},
  //     { path: 'api', component: ApiconnectComponent },
  //     { path: 'performance', component: PerformanceComponent },
  //     { path: 'myaccounts', component: MyaccountsComponent },
  //     { path: 'beneficiaries', component: BeneficiariesComponent },
  //     { path: 'orders', component: OrdersComponent },
  //     { path: 'activity', component: ActivityLogComponent },
  //     { path: 'payments', component: PaymentsComponent,  },
  //     { path: 'deals', component: OrdersComponent,  },
  //     { path: 'compliance', component: OrdersComponent,  },
  //     { path: 'exposure', component: OrdersComponent,  },
  //     // { path: 'sales', component: SalesAccountsAllComponent,  },
  //     { path: 'sales', component: SalesAllComponent,  },
  //     { path: 'sales/newaccount', component: SalesAccComponent,  canDeactivate:[CanDeactivateGuard] },
  //     { path: 'sales/editaccount', component: SalesAccComponent,  canDeactivate:[CanDeactivateGuard]},
  //     { path: 'preferences', component: OrdersComponent, },
  //     { path: 'affiliates', component: OrdersComponent, },
  //     { path: 'exposure', component: PerformanceComponent, },
  //     { path: 'exposure', component: OrdersComponent, },
  //     { path: 'notifications', component: OrdersComponent, },
  //     { path: 'admin', component: UserAdminComponent, },
  //     { path: 'admin/orgadmin', component: OrdersComponent, },
  //     { path: 'help', component: OrdersComponent, },
  //     // { path: 'customerreports/statement', component: StatementComponent, },
  //     // { path: 'customerreports/position', component: PositionReportComponent, },
  //     { path: 'customerreports', component:CustomerReportsComponent},
  //     { path: 'transactions', component: TransactionsComponent, },
  
  //     { path: 'apiconnect', component: ApiconnectComponent, },
  ] },
  // { path: 'login', component: LoginComponent },
  // { path: 'loginBroker', component: LoginBrokerComponent },
  // { path: 'loginAuth', component: LoginAuthComponent },
  // { path: 'resetpassword', component:ResetpwComponent},
  {path: '**',redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

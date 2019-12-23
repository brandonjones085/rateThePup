import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateComponent } from './rate/rate.component';
import { UploadpicComponent } from './uploadpic/uploadpic.component';
import { ToppupsComponent } from './toppups/toppups.component';


const routes: Routes = [
  {path:'', component: RateComponent}, 
  {path:'upload', component: UploadpicComponent}, 
  {path:'top', component: ToppupsComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

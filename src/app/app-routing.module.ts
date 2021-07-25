import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailViewComponent } from 'src/components/detail-view/detail-view.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: DetailViewComponent
  },
  {
    path: ':cityID',
    component: DetailViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

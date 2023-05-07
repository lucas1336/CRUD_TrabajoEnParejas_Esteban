import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/table/table.component';
import { NewComponent } from './components/new/new.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'business/offers', component: TableComponent },
  { path: 'admin/offers/new', component: NewComponent },
  { path: 'admin/offers/edit/:id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

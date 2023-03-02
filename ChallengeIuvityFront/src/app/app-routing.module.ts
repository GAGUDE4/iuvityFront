import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KardexComponent } from './kardex/kardex.component';

const routes: Routes = [
  { path: '', component: KardexComponent },
  { path: 'kardex', component: KardexComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

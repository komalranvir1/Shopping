import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CustemerDetailComponent } from './custemer-detail/custemer-detail.component';

const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'shoppingCart',component:ShoppingCartComponent},
  {path:'custemerDetail',component:CustemerDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

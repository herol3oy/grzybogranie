import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MushroomListRoute } from './route/mushroom-list-route/mushroom-list-route.component';

const routes: Routes = [
  {
    path: 'mushroom-list',
    component: MushroomListRoute,
  },
  {
    path: '**',
    redirectTo: 'mushroom-list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AboutUserComponent } from './about-user/about-user.component';

const routes: Routes = [
    { path: '', component: ListComponent, pathMatch: 'full' },
    { path: 'about-user/:id', component: AboutUserComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

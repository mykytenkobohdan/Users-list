import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AboutUserComponent } from './about-user/about-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
    { path: '', component: ListComponent, pathMatch: 'full' },
    { path: 'user/:id', component: AboutUserComponent },
    { path: 'create', component: EditUserComponent },
    { path: 'edit/:id', component: EditUserComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

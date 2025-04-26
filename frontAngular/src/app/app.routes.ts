import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { IndiceUserComponent } from './user/user-indice/user-indice.component';
import { UpdateUserComponent } from './user/user-update/user-update.component';
import { FormUserComponent } from './user/user-create/user-create.component';
import { IndicePersonComponent } from './person/person-indice/person-indice.component';

export const routes: Routes = [
    {path: '', component:LandingComponent},

    //User
    {path: 'user', component:IndiceUserComponent},
    {path: 'user/update/:id', component:UpdateUserComponent},
    {path: 'user/create', component:FormUserComponent},

    //person
    {path: 'person', component:IndicePersonComponent},

];

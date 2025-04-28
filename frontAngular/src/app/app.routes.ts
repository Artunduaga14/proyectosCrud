import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { IndiceUserComponent } from './user/user-indice/user-indice.component';
import { UpdateUserComponent } from './user/user-update/user-update.component';
import { FormUserComponent } from './user/user-create/user-create.component';
import { IndicePersonComponent } from './person/person-indice/person-indice.component';
import { FormPersonComponent } from './person/person-create/person-create.component';
import { UpdatePersonComponent } from './person/person-update/person-update.component';

export const routes: Routes = [
    {path: '', component:LandingComponent},

    //User
    {path: 'user', component:IndiceUserComponent},
    {path: 'user/create', component:FormUserComponent},
    {path: 'user/update/:id', component:UpdateUserComponent},

    //person
    {path: 'person', component:IndicePersonComponent},
    {path: 'person/create', component:FormPersonComponent},
    {path: 'person/update/:id', component:UpdatePersonComponent},
];

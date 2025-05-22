import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { IndiceUserComponent } from './user/user-indice/user-indice.component';
import { UpdateUserComponent } from './user/user-update/user-update.component';
import { FormUserComponent } from './user/user-create/user-create.component';
import { IndicePersonComponent } from './person/person-indice/person-indice.component';
import { FormPersonComponent } from './person/person-create/person-create.component';
import { UpdatePersonComponent } from './person/person-update/person-update.component';
import { IndiceFormComponent } from './form/form-indice/form-indice.component';
import { FormFormsComponent } from './form/form-create/form-create.component';
import { UpdateFormComponent } from './form/form-update/form-update.component';
import { IndiceModuleComponent } from './Module/module-indice/module-indice.component';
import { FormModuleComponent } from './Module/module-create/module-create.component';
import { UpdateModuleComponent } from './Module/module-update/module-update.component';
import { IndicePermissionComponent } from './pemission/permission-indice/permission-indice.component';
import { FormPermissionComponent } from './pemission/permission-create/permission-create.component';
import { UpdatePermissionComponent } from './pemission/permission-update/permission-update.component';
import { IndiceRolComponent } from './rol/rol-indice/rol-indice.component';
import { FormRolComponent } from './rol/rol-create/rol-create.component';
import { UpdateRolComponent } from './rol/rol-update/rol-update.component';
import { ModuleFormIndiceComponent } from './moduleForm/module-form-indice/module-form-indice.component';
import { ModuleFormCreateComponent } from './moduleForm/module-form-create/module-form-create.component';
import { ModuleFormUpdateComponent } from './moduleForm/module-form-update/module-form-update.component';
import { UserRolIndiceComponent } from './userRol/user-rol-indice/user-rol-indice.component';
import { UserRolCreateComponent } from './userRol/user-rol-create/user-rol-create.component';
import { UsuarioRolUpdateComponent } from './userRol/user-rol-update/user-rol-update.component';
import { LoginIndiceComponent } from './login/login-indice/login-indice.component';
import { IndicePostsComponent } from './indice-post/indice-post/indice-post.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta vacía redirige a login

    //User
    {path: 'user', component:IndiceUserComponent},
    {path: 'user/create', component:FormUserComponent},
    {path: 'user/update/:id', component:UpdateUserComponent},

    //person
    {path: 'person', component:IndicePersonComponent},
    {path: 'person/create', component:FormPersonComponent},
    {path: 'person/update/:id', component:UpdatePersonComponent},

    //form
    {path: 'form', component:IndiceFormComponent},
    {path: 'form/create', component:FormFormsComponent},
    {path: 'form/update/:id', component:UpdateFormComponent},

    //module
    {path: 'module', component:IndiceModuleComponent},
    {path: 'module/create', component:FormModuleComponent},
    {path: 'module/update/:id', component:UpdateModuleComponent},

    //permission
    {path: 'permission', component:IndicePermissionComponent},
    {path: 'permission/create', component:FormPermissionComponent},
    {path: 'permission/update/:id', component:UpdatePermissionComponent},

    //rol
    {path: 'rol', component:IndiceRolComponent},
    {path: 'rol/create', component:FormRolComponent},
    {path: 'rol/update/:id', component:UpdateRolComponent},

    //module-Form
    {path: 'module-form', component:ModuleFormIndiceComponent},
    {path: 'module-form/create', component:ModuleFormCreateComponent},
    {path: 'module-form/update/:id', component:ModuleFormUpdateComponent},

    //user-rol
    {path: 'user-rol', component:UserRolIndiceComponent},
    {path: 'user-rol/create', component:UserRolCreateComponent},
    {path: 'user-rol/update/:id', component:UsuarioRolUpdateComponent},

    //login
    {path: 'login', component:LoginIndiceComponent},

    //api publica
    {path: 'post', component: IndicePostsComponent}

];

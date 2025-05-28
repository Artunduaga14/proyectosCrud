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
import { authGuard } from './services/Auth/auth.guard';

export const routes: Routes = [

    // Home
    {path: '', component: LandingComponent, canActivate: [authGuard]},

    //User
    {path: 'user', component:IndiceUserComponent, canActivate: [authGuard]},
    {path: 'user/create', component:FormUserComponent, canActivate: [authGuard]},
    {path: 'user/update/:id', component:UpdateUserComponent, canActivate: [authGuard]},

    //person
    {path: 'person', component:IndicePersonComponent, canActivate: [authGuard]},
    {path: 'person/create', component:FormPersonComponent, canActivate: [authGuard]},
    {path: 'person/update/:id', component:UpdatePersonComponent, canActivate: [authGuard]},

    //form
    {path: 'form', component:IndiceFormComponent, canActivate: [authGuard]},
    {path: 'form/create', component:FormFormsComponent, canActivate: [authGuard]},
    {path: 'form/update/:id', component:UpdateFormComponent, canActivate: [authGuard]},

    //module
    {path: 'module', component:IndiceModuleComponent, canActivate: [authGuard]},
    {path: 'module/create', component:FormModuleComponent, canActivate: [authGuard]},
    {path: 'module/update/:id', component:UpdateModuleComponent, canActivate: [authGuard]},

    //permission
    {path: 'permission', component:IndicePermissionComponent, canActivate: [authGuard]},
    {path: 'permission/create', component:FormPermissionComponent, canActivate: [authGuard]},
    {path: 'permission/update/:id', component:UpdatePermissionComponent, canActivate: [authGuard]},

    //rol
    {path: 'rol', component:IndiceRolComponent, canActivate: [authGuard]},
    {path: 'rol/create', component:FormRolComponent, canActivate: [authGuard]},
    {path: 'rol/update/:id', component:UpdateRolComponent, canActivate: [authGuard]},

    //module-Form
    {path: 'module-form', component:ModuleFormIndiceComponent, canActivate: [authGuard]},
    {path: 'module-form/create', component:ModuleFormCreateComponent, canActivate: [authGuard]},
    {path: 'module-form/update/:id', component:ModuleFormUpdateComponent, canActivate: [authGuard]},

    //user-rol
    {path: 'user-rol', component:UserRolIndiceComponent, canActivate: [authGuard]},
    {path: 'user-rol/create', component:UserRolCreateComponent, canActivate: [authGuard]},
    {path: 'user-rol/update/:id', component:UsuarioRolUpdateComponent, canActivate: [authGuard]},

    //login
    {path: 'login', component:LoginIndiceComponent},

    //api publica
    {path: 'post', component: IndicePostsComponent, canActivate: [authGuard]}

];

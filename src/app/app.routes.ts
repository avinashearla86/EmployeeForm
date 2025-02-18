import { Routes } from '@angular/router';
import { EmployeeDataComponent } from './components/employee-data/employee-data.component';

export const routes: Routes = [
    {
       path:'',
       redirectTo:'employee-data',
       pathMatch:'full'
    },
    {
        path:'employee-data',
        component:EmployeeDataComponent
    }

];

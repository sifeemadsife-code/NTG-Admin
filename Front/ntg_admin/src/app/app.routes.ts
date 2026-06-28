import { Routes } from '@angular/router';
import { EngineerDetailsOverView } from './Components/engineer-details-overview/engineer-details';
import { ngineerDetails } from './Components/engineer-details-documents/engineer-details';
import { NotFound } from './Components/not-found/not-found';
import { Login } from './Components/login/login';

import { EngineerDetailsPersonalInfo } from './Components/engineer-details-personal-info/engineer-details-personal-info';
import { UpdateDataComponent } from './Components/update-data/update-data';


export const routes: Routes = [
    {
        path : "",
        component : UpdateDataComponent
    },
    {
        path : "engineerDetails",
        component : EngineerDetailsOverView
    },
    {
        path : "engineerDocumnets",
        component : ngineerDetails
    },
    {
        path: "**",
        component : NotFound
    }
];

import { Routes } from '@angular/router';
import { EngineerDetailsOverView } from './Components/engineer-details-overview/engineer-details';
import { ngineerDetails } from './Components/engineer-details-documents/engineer-details';
import { NotFound } from './Components/not-found/not-found';
import { Login } from './Components/login/login';

export const routes: Routes = [
    {
        path : "",
        component : Login
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

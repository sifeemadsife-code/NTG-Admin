import { Routes } from '@angular/router';
import { EngineerDetailsOverView } from './Components/engineer-details-overview/engineer-details';
import { ngineerDetails } from './Components/engineer-details-documents/engineer-details';
import { NotFound } from './Components/not-found/not-found';
import { Login } from './Components/login/login';

import { EngineerDetailsPersonalInfo } from './Components/engineer-details-personal-info/engineer-details-personal-info';
<<<<<<< HEAD
import { UpdateDataComponent } from './Components/update-data/update-data';
=======
import { AdminEngineer } from './Components/admin-engineer/admin-engineer';
<<<<<<< HEAD
import { AddEngineer } from './Components/add-engineer/add-engineer';
=======
>>>>>>> 22731b614ae9a01eede8553ac0d381dbb4906727
>>>>>>> 25c1875a688b1a75048eb67a56f8ae88759f0964


export const routes: Routes = [
    {
        path : "",
<<<<<<< HEAD
        component : AddEngineer
=======
<<<<<<< HEAD
        component : UpdateDataComponent
=======
<<<<<<< HEAD
        component : AdminEngineer
=======
        component : EngineerDetailsOverView
>>>>>>> e15ed23d183c732dc4669e6c2fd965f959571f06
>>>>>>> 22731b614ae9a01eede8553ac0d381dbb4906727
>>>>>>> 25c1875a688b1a75048eb67a56f8ae88759f0964
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

import { Routes } from '@angular/router';
import { AdminEngineer } from './Components/admin-engineer/admin-engineer';
import { EngineerDetailsOverView } from './Components/engineer-details-overview/engineer-details';
import { EngineerDetailsPersonalInfo } from './Components/engineer-details-personal-info/engineer-details-personal-info';
import { ngineerDetails } from './Components/engineer-details-documents/engineer-details';
import { NotFound } from './Components/not-found/not-found';
import { UpdateDataComponent } from './Components/update-data/update-data';
import { AddEngineer } from './Components/add-engineer/add-engineer';
import { StudentsList } from './Components/students-list/students-list';
import { TrainingProgramOverveiw } from './Components/training-program-overveiw/training-program-overveiw';
export const routes: Routes = [
  {
    path: '',
    component: TrainingProgramOverveiw
    },
  {
    path: 'engineers/:id',
    component: EngineerDetailsOverView,
  },
  {
    path: 'engineers/:id/personal-info',
    component: EngineerDetailsPersonalInfo,
  },
  {
    path: 'engineers/:id/documents',
    component: ngineerDetails,
  },
  {
    path: 'engineers/:id/update-engineer',
    component: UpdateDataComponent,
  },
  {
    path: 'addEngineer',
    component: AddEngineer
  },
  {
    path: '**',
    component: NotFound,
  },
];

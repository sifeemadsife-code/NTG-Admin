import { TrainingProgramList } from './Models/training_program_list';
import { Routes } from '@angular/router';
import { AdminEngineer } from './Components/admin-engineer/admin-engineer';
import { EngineerDetailsOverView } from './Components/engineer-details-overview/engineer-details';
import { EngineerDetailsPersonalInfo } from './Components/engineer-details-personal-info/engineer-details-personal-info';
import { NotFound } from './Components/not-found/not-found';
import { UpdateDataComponent } from './Components/update-data/update-data';
import { AddEngineer } from './Components/add-engineer/add-engineer';
import { StudentsList } from './Components/students-list/students-list';
import { TrainingProgramOverveiw } from './Components/training-program-overveiw/training-program-overveiw';
import { ProgramsList } from './Components/programs-list/programs-list';
import { TrainingProgramStudents } from './Components/training-program-students/training-program-students';
import { CreateTrainingProgramComponent } from './Components/create-training-program/create-training-program';
export const routes: Routes = [
  {
    path: '',
    component: AdminEngineer,
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
    path: 'engineers/:id/update-engineer',
    component: UpdateDataComponent,
  },
  {
    path: 'addEngineer',
    component: AddEngineer
  },
  {
    path: "studentsList",
    component: StudentsList
  },
  {
    path: "programs/:id",
    component: TrainingProgramOverveiw
  },
  {
    path: "programs/:id/students",
    component: TrainingProgramStudents
  },
  {
    path: "createProgram",
    component: CreateTrainingProgramComponent
  },
  {
    path: "trainingProgramsList",
    component: ProgramsList
  },
  {
    path: "notfications",
    component: Notification
  },
  {
    path: '**',
    component: NotFound,
  },
];

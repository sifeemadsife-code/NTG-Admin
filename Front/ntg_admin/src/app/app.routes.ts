// Front/ntg_admin/src/app/app.routes.ts
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
import { TrainingProgramEngineer } from './Components/training-program-engineer/training-program-engineer';
import { CreateTrainingProgramComponent } from './Components/create-training-program/create-training-program';
import { EditTrainingProgram } from './Components/edit-training-program/edit-training-program';
import { AdminProfile } from './Components/admin-profile/admin-profile';
import { Subject } from './Components/subject/subject';
import { EditSubject } from './Components/edit-subject/edit-subject';
import { Dashboard } from './Components/dashboard/dashboard';
import { NotificationComponent } from './Components/notification/notification';
import { Login } from './Components/login/login';
import { SettingComponent } from './Components/setting/setting';
import { Reports } from './Components/reports/reports';
import { ComposeReport } from './Components/compose-report/compose-report';
import { EvaluateStudent } from './Components/evaluate-student/evaluate-student';
import { StudentEvaluationsView } from './Components/student-evaluations-view/student-evaluations-view';
import { CreateEngineerReport } from './Components/create-engineer-report/create-engineer-report';
import { StudentDetailsComponent } from './Components/student-details/student-details';
import { AddSubject } from './Components/add-subject/add-subject';
import { Sendemail } from './Components/sendemail/sendemail';
import { SendNotification } from './Components/send-notification/send-notification';
import { ResetPassword } from './Components/reset-password/reset-password';
import { About } from './Components/about/about';
import { SupportComponent } from './Components/support/support';
import { UnauthorizedComponent } from './Components/unauthorized/unauthorized';
import { authGuard } from './Services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'engineers/:id',
    component: EngineerDetailsOverView,
    canActivate: [authGuard],
  },
  {
    path: 'engineers/:id/personal-info',
    component: EngineerDetailsPersonalInfo,
    canActivate: [authGuard],
  },
  {
    path: 'students/:id/evaluations',
    component: StudentEvaluationsView,
    canActivate: [authGuard],
  },
  {
    path: 'students/:id',
    component: StudentDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'engineers/:id/update-engineer',
    component: UpdateDataComponent,
    canActivate: [authGuard],
  },
  {
    path: 'subjects',
    component: Subject,
    canActivate: [authGuard],
  },
  {
    path: 'addEngineer',
    component: AddEngineer,
    canActivate: [authGuard],
  },
  {
    path: 'studentsList',
    component: StudentsList,
    canActivate: [authGuard],
  },
  {
    path: 'programs/:id',
    component: TrainingProgramOverveiw,
    canActivate: [authGuard],
  },
  {
    path: 'reports',
    component: Reports,
    canActivate: [authGuard],
  },
  {
    path: 'compose-report',
    component: ComposeReport,
    canActivate: [authGuard],
  },
  {
    path: 'evaluate-student',
    component: EvaluateStudent,
    canActivate: [authGuard],
  },
  {
    path: 'programs/:id/students',
    component: TrainingProgramStudents,
    canActivate: [authGuard],
  },
  {
    path: 'programs/:id/engineers',
    component: TrainingProgramEngineer,
    canActivate: [authGuard],
  },
  {
    path: 'createProgram',
    component: CreateTrainingProgramComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit-training-program/:id',
    component: EditTrainingProgram,
    canActivate: [authGuard],
  },
  {
    path: 'trainingProgramsList',
    component: ProgramsList,
    canActivate: [authGuard],
  },
  {
    path: 'support',
    component: SupportComponent,
    canActivate: [authGuard],
  },
  {
    path: 'engineersList',
    component: AdminEngineer,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: AdminProfile,
    canActivate: [authGuard],
  },
  {
    path: 'engineerReport',
    component: CreateEngineerReport,
    canActivate: [authGuard],
  },
  {
    path: 'notifications',
    component: NotificationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'sendNotification',
    component: SendNotification,
    canActivate: [authGuard],
  },
  {
    path: 'add-subject',
    component: AddSubject,
    canActivate: [authGuard],
  },
  {
    path: 'edit-course/:id',
    component: EditSubject,
    canActivate: [authGuard],
  },
  {
    path: 'sendEmail',
    component: Sendemail,
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    component: SettingComponent,
    canActivate: [authGuard],
  },
  {
    path: 'about',
    component: About,
    canActivate: [authGuard],
  },
  {
    path: 'resetPassword',
    component: ResetPassword,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFound,
  },
];
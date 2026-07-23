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
export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'dashboard',
    component: Dashboard,
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
    path: 'students/:id/evaluations',
    component: StudentEvaluationsView,
  },
  {
    path: 'students/:id',
    component: StudentDetailsComponent,
  },
  {
    path: 'engineers/:id/update-engineer',
    component: UpdateDataComponent,
  },
  {
    path: 'subjects',
    component: Subject,
  },
  {
    path: 'addEngineer',
    component: AddEngineer,
  },
  {
    path: 'studentsList',
    component: StudentsList,
  },
  {
    path: 'programs/:id',
    component: TrainingProgramOverveiw,
  },
  {
    path: 'reports',
    component: Reports,
  },
  {
    path: 'compose-report',
    component: ComposeReport,
  },
  {
    path: 'evaluate-student',
    component: EvaluateStudent,
  },
  {
    path: 'programs/:id/students',
    component: TrainingProgramStudents,
  },
  {
    path: 'programs/:id/engineers',
    component: TrainingProgramEngineer,
  },
  {
    path: 'createProgram',
    component: CreateTrainingProgramComponent,
  },
  {
    path: 'edit-training-program/:id',
    component: EditTrainingProgram,
  },
  {
    path: 'trainingProgramsList',
    component: ProgramsList,
  },
  {
    path: 'support',
    component: SupportComponent
  },
  {
    path: 'engineersList',
    component: AdminEngineer,
  },
  {
    path: 'profile',
    component: AdminProfile,
  },
  {
    path: 'engineerReport',
    component: CreateEngineerReport,
  },
  {
    path: 'notifications',
    component: NotificationComponent,
  },
  {
    path: 'sendNotification',
    component: SendNotification,
  },
  {
    path: 'add-subject',
    component: AddSubject,
  },
  {
    path: 'edit-course/:id',
    component: EditSubject,
  },
  {
    path: 'sendEmail',
    component: Sendemail,
  },
  {
    path: 'settings',
    component: SettingComponent,
  },
   {
    path: 'about',
    component: About,
  },
  {
    path: 'resetPassword',
    component: ResetPassword
  },
  {
    path: '**',
    component: NotFound,
  },

];

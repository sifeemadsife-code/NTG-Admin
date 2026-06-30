import { Routes } from '@angular/router';

import { EngineerDetailsOverView } from './Components/engineer-details-overview/engineer-details';
import { ngineerDetails } from './Components/engineer-details-documents/engineer-details';
import { NotificationComponent } from './Components/notification/notification';
import { NotFound } from './Components/not-found/not-found';

export const routes: Routes = [

    // الصفحة الرئيسية
    {
        path: "",
        component: EngineerDetailsOverView
    },

    // Engineer Details
    {
        path: "engineerDetails",
        component: EngineerDetailsOverView
    },

    // Engineer Documents
    {
        path: "engineerDocumnets",
        component: ngineerDetails
    },

    // Notification Page
    {
        path: "notification",
        component: NotificationComponent
    },

    // Not Found
    {
        path: "**",
        component: NotFound
    }

];
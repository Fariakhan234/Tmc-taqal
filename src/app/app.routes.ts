import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Knowledgebase } from './knowledgebase/knowledgebase';
import { Upload } from './upload/upload';
import { Employee } from './employee/employee';
import { Chat } from './chat/chat';
import { StartChat } from './start-chat/start-chat';




export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'knowledgebase', component: Knowledgebase },
         { path: 'upload', component:Upload },
        
         {
          path:'user',component:Employee
         },

        

    ]
  },
 {
          path:'chat',component:Chat
         }

];

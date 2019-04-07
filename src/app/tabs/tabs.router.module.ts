import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [{
      path: 'overview',
      children: [
        {
          path: '',
          loadChildren: '../overview/tab2.module#Tab2PageModule'
        }
      ]
    },
    {
      path: 'network',
      children: [
        {
          path: '',
          loadChildren: '../network/tab1.module#Tab1PageModule'
        }
      ]
    },
    {
      path: 'help',
      children: [
        {
          path: '',
          loadChildren: '../help/tab3.module#Tab3PageModule'
        }
      ]
    },
    {
      path: '',
      redirectTo: '/tabs/overview',
      pathMatch: 'full'
    }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/overview',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

import { NgModule} from '@angular/core';
import { IonicModule} from 'ionic-angular';
import { MyApp} from '../../app/app.component';
import { MainPage} from './main';
import { HomeContantPage } from '../home-contant/home-contant';


@NgModule({
  imports: [
    IonicModule.forRoot(MyApp,{},{
      links:[
        { component: HomeContantPage, name: 'HomeContant', segment: 'homecontant/:homecontId' }
      ]
    }),
  ],
  declarations: [MainPage],
  entryComponents: [MainPage],
  providers: [],
  exports: [IonicModule]
})

export class MainModule {
}

import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MyApp} from '../../app/app.component';
import {MainPage} from './main';

@NgModule({
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  declarations: [MainPage],
  entryComponents: [MainPage],
  providers: [],
  exports: [IonicModule]
})
export class MainModule {
}

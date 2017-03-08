import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MyApp} from '../../app/app.component';
import {HomePage} from './home';

@NgModule({
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  declarations: [HomePage],
  entryComponents: [HomePage],
  providers: [],
  exports: [IonicModule]
})
export class HomeModule {
}

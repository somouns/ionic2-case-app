import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MyApp} from '../../app/app.component';
import {ContactPage} from './contact';


@NgModule({
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  declarations: [ContactPage],
  entryComponents: [ContactPage],
  providers: [],
  exports: [IonicModule]
})
export class ContactModule {
}

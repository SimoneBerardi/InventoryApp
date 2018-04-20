import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "@ngx-translate/core";
import { PageHeaderComponent } from './page-header';

@NgModule({
  declarations: [
    PageHeaderComponent,
  ],
  imports: [
    IonicPageModule.forChild(PageHeaderComponent),
    TranslateModule.forChild()
  ],
  exports: [
    PageHeaderComponent
  ]
})
export class PageHeaderComponentModule {}

import { NgModule } from '@angular/core';
import { BsDatepickerModule, TabsModule, ModalModule, TooltipModule, BsDropdownModule, ButtonsModule, ProgressbarModule } from 'ngx-bootstrap';

@NgModule({
  imports: [    
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule, TabsModule, BsDatepickerModule, ButtonsModule, ProgressbarModule]
})
export class AppBootstrapModule { }
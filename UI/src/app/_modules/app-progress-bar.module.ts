import { NgModule } from '@angular/core';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';


const progressModuleConfig: NgProgressModule = {
    trickleSpeed: 200,
    min: 20,
    meteor: false,
    thick: true,
    color: 'red',
    spinner: false        
}

@NgModule({
    imports: [
        NgProgressModule,
        NgProgressHttpModule,
    ],
    exports: [NgProgressModule, NgProgressHttpModule]
})
export class AppProgressBarModule { }
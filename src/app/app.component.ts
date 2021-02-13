import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  template: 
  `<app-header></app-header>
   <div class ="page">
      <router-outlet></router-outlet>
   </div>
   `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
}

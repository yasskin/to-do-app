import { Component } from 'angular2/core';

@Component({
  selector: 'my-app', //names HTML tag
  template: `
    <div class="container">
      <h1>Skeleton Angular2 App!</h1>
    </div>
  ` //Gives html to be displayed in this tag. `` allows multiple lines (feature of ES6)
})
export class AppComponent {

}

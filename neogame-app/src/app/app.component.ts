import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { LoaderComponent } from "./components/loader/loader/loader.component";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, LoaderComponent],
})
export class AppComponent {
  constructor() { }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonListComponent } from './components/person/person-list/person-list.component';
import { PersonFormComponent } from './components/person/person-form/person-form.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './components/shared/alert-modal/alert-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent,
        PersonListComponent,
        PersonFormComponent,
        NavMenuComponent,
        AlertModalComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [],
    entryComponents: [
        AlertModalComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

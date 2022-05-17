import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/message.service';
import { PersonService } from 'src/app/services/person.service';
import { Location } from '@angular/common';
import { Email } from 'src/app/model/value-objects/email';

@Component({
    selector: 'app-person-form',
    templateUrl: './person-form.component.html',
    styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
    person: Person;
    saving = false;

    constructor(
        private route: ActivatedRoute,
        private personService: PersonService,
        private messageService: MessageService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.getPerson();
    }

    getPerson(): void {
        const id = this.route.snapshot.paramMap.get('id');

        if (id !== null) {
            this.personService.getPerson(id)
                .subscribe(
                    person => this.person = person,
                    error => this.messageService.showError(error));
        } else {
            this.person = new Person();
        }
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.saving = true;
        if (this.person.id === undefined) {
            this.personService.addPerson(this.person)
                .subscribe(
                    () => this.goBack(),
                    error => {
                        this.messageService.showError(error);
                        this.saving = false;
                    },
                    () => this.saving = false);
        } else {
            this.personService.updatePerson(this.person)
                .subscribe(
                    () => this.goBack(),
                    error => {
                        this.messageService.showError(error);
                        this.saving = false;
                    },
                    () => this.saving = false);
        }
    }

    setEmail(mail: string) {
        if (mail && mail !== '') {
            this.person.email.address = mail;
        } else {
            this.person.email.address = null;
        }
    }
}

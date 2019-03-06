import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';
import { PersonService } from 'src/app/services/person.service';
import { MessageService } from 'src/app/message.service';

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
    persons: Person[];
    deleting: Person;

    constructor(
        private personService: PersonService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.getPersons();
    }

    getPersons(): void {
        this.personService.getPersons()
            .subscribe(
                persons => this.persons = persons,
                error => this.messageService.showError(error));
    }

    delete(person: Person): void {
        this.deleting = person;
        this.personService.deletePerson(person).subscribe(
            () => this.persons = this.persons.filter(h => h !== person),
            error => {
                this.messageService.showError(error);
                this.deleting = null;
            },

            () => this.deleting = null
        );
    }
}

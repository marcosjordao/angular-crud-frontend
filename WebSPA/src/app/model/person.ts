import { Email } from './value-objects/email';

export class Person {
    id: number;
    name: string;
    email: Email;
    phone: string;

    constructor() {
        this.email = new Email();
    }
}

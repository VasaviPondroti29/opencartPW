import { faker, Faker } from "@faker-js/faker";

export class randomDataUtil {
    static getfirstName() {
        return faker.person.firstName();
    }
    static getlastName() {
        return faker.person.lastName();
    }
    static getfullName() {
        return faker.person.fullName();
    }
    static getemail() {
        return faker.internet.email();
    }
    static getphonenumber() {
        return faker.phone.number();
    }
    static getusername() {
        return faker.internet.username();
    }
    static getpassword() {
        return faker.internet.password();
    }
    static getcountry() {
        return faker.location.country();
    }
    static getrandompassword(length: number = 10): string {
        return faker.internet.password({ length });
    }
    static getrandomalphanumeric(length: number): string {
        return faker.string.alphanumeric({ length });
    }
    static getrandomnumeric(length: number): string {
        return faker.string.numeric({ length });
    }
    static getstate() {
        return faker.location.state();
    }
    static getstreetaddress() {
        return faker.location.streetAddress();
    }
    static getzipcode() {
        return faker.location.zipCode();
    }
    static getcity() {
        return faker.location.city();
    }





















}




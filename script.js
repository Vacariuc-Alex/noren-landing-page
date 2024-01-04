document.addEventListener('DOMContentLoaded', function () {

    class Person {

        constructor(firstName, lastName, phone, email, password, gender, job) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.phone = phone;
            this.email = email;
            this.password = password;
            this.gender = gender;
            this.job = job;
        }

        appendNewRowToTable() {
            return document.getElementById('tableSectionBody').innerHTML += `<tr>` +
                ` <td> ${this.firstName} </td> ` +
                ` <td> ${this.lastName} </td> ` +
                ` <td> ${this.phone} </td> ` +
                ` <td> ${this.email} </td> ` +
                ` <td> ${this.password} </td> ` +
                ` <td> ${this.gender} </td> ` +
                ` <td> ${this.job} </td> ` +
                `</tr>`;
        }
    }

    class Validator {

        static namePattern = /^[A-Za-z]{2,50}$/;
        static phonePattern = /^\+373 \d{3} \d{2} \d{3}$/;
        static passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

        static invalidFirstName = "First Name!";
        static invalidLastName = "Last Name!";
        static invalidPhoneNumber = "Phone Number!";
        static invalidPassword = "Password!";

        static INVALID = "Invalid ";
        static TRY = "\nTry: ";

        person;

        constructor(person) {
            this.person = person;
        }

        validatePerson() {
            switch (true) {
                case !Validator.namePattern.test(this.person.firstName):
                    return Validator.INVALID.concat(Validator.invalidFirstName, Validator.TRY, this.suggestCorrectInput(Validator.namePattern));
                case !Validator.namePattern.test(this.person.lastName):
                    return Validator.INVALID.concat(Validator.invalidLastName, Validator.TRY, this.suggestCorrectInput(Validator.namePattern));
                case !Validator.phonePattern.test(this.person.phone):
                    return Validator.INVALID.concat(Validator.invalidPhoneNumber, Validator.TRY, this.suggestCorrectInput(Validator.phonePattern));
                case !Validator.passwordPattern.test(this.person.password):
                    return Validator.INVALID.concat(Validator.invalidPassword, Validator.TRY, this.suggestCorrectInput(Validator.passwordPattern));
                default:
                    return true;
            }
        }

        suggestCorrectInput(regExPattern) {
            return new RandExp(regExPattern).gen();
        }
    }

    class Form {

        static FORM_ID_SUFFIX = "Form";

        static setGender = () => {
            return this.getElementChecked('male') ? 'Male' : 'Female';
        }

        static setJob = () => {
            const job = this.getElementValue('job');
            if (job === '--') {
                return '';
            }
            return job[0].toUpperCase() + job.slice(1);
        }

        static toggleElement = (element, display) => {
            document.getElementById(element).style.display = display;
        }

        static checkElement = (element) => {
            document.getElementById(element.concat(this.FORM_ID_SUFFIX)).checked = true;
        }

        static getElementValue = (element) => {
            return document.getElementById(element.concat(this.FORM_ID_SUFFIX)).value;
        }

        static setElementValue = (element, value) => {
            return document.getElementById(element.concat(this.FORM_ID_SUFFIX)).value = value;
        }

        static getElementChecked = (element) => {
            return document.getElementById(element.concat(this.FORM_ID_SUFFIX)).checked;
        }

        static clearForm = () => {
            this.setElementValue('firstName', '');
            this.setElementValue('lastName', '');
            this.setElementValue('phone', '');
            this.setElementValue('email', '');
            this.setElementValue('password', '');
            this.setElementValue('job', '--');
            this.checkElement('male');
        }
    }

    class Sort {

        static sortingField;
        static order = 'DESC';
        static lastSortedElement;

        static INCORRECT_FILE_TYPE = "Incorrect field type!";

        static rewriteTable(personList) {
            document.getElementById('tableSectionBody').innerHTML = '';
            personList.forEach(e => {
                document.getElementById('tableSectionBody').innerHTML += `<tr>` +
                    ` <td> ${e.firstName} </td> ` +
                    ` <td> ${e.lastName} </td> ` +
                    ` <td> ${e.phone} </td> ` +
                    ` <td> ${e.email} </td> ` +
                    ` <td> ${e.password} </td> ` +
                    ` <td> ${e.gender} </td> ` +
                    ` <td> ${e.job} </td> ` +
                    `</tr>`
            });
        }

        static sort = (personList) => {
            if (typeof Sort.sortingField === 'string') {
                return Sort.sortElements(personList, Sort.order);
            } else {
                throw new Error(Sort.INCORRECT_FILE_TYPE);
            }
        }

        static sortElements(personList, order) {
            return personList.sort((x, y) => {
                x = x[Sort.sortingField].toLowerCase();
                y = y[Sort.sortingField].toLowerCase();

                if (order === 'ASC') {
                    return x < y ? -1 : 1;
                } else if (order === 'DESC') {
                    return x > y ? -1 : 1;
                } else {
                    return 0;
                }
            });
        }

        static setSortingField(sortingField) {
            Sort.sortingField = sortingField;
        }

        static setOrder(tableHeadElement, tableHeadElementText) {

            Sort.defineLastSortedElement(tableHeadElement);
            const sameField = tableHeadElementText === Sort.lastSortedElement.textContent;

            if (Sort.order === 'DESC' || (Sort.order === 'ASC' && !sameField)) {
                Sort.order = 'ASC';
            } else if (Sort.order === 'ASC' && sameField) {
                Sort.order = 'DESC';
            }
        }

        static setArrow(tableHeadElement, tableHeadElementText) {

            Sort.defineLastSortedElement(tableHeadElement);
            const isAsc = Sort.order === 'ASC';
            const isUpArrow = tableHeadElementText.at(tableHeadElementText.length - 1) === '↑';
            const isDownArrow = tableHeadElementText.at(tableHeadElementText.length - 1) === '↓';

            if (isUpArrow && !isAsc) {
                return Sort.replaceArrow(tableHeadElementText, '↓');
            } else if (isDownArrow && isAsc) {
                return Sort.replaceArrow(tableHeadElementText, '↑');
            } else if (isAsc && !isUpArrow && !isDownArrow) {
                Sort.removeArrowFromUnusedTableHeadCell(tableHeadElement);
                return Sort.appendArrow(tableHeadElementText, '↑')
            } else if (!isAsc && !isUpArrow && !isDownArrow) {
                Sort.removeArrowFromUnusedTableHeadCell(tableHeadElement);
                return Sort.appendArrow(tableHeadElementText, '↓')
            }
            return tableHeadElementText;
        }

        static defineLastSortedElement(tableHeadElement) {
            if (typeof Sort.lastSortedElement === 'undefined') {
                Sort.lastSortedElement = tableHeadElement;
            }
        }

        static removeArrowFromUnusedTableHeadCell(tableHeadElement) {
            const id = Sort.lastSortedElement.id;
            document.getElementById(id).textContent = Sort.lastSortedElement.textContent.replace(/.$/, '');
            Sort.lastSortedElement = tableHeadElement;
        }

        static replaceArrow(tableHeadElementText, arrowSymbol) {
            return tableHeadElementText.replace(/.$/, arrowSymbol);
        }

        static appendArrow(tableHeadElementText, arrowSymbol) {
            return tableHeadElementText.concat(arrowSymbol);
        }
    }

    let personList = [];

    // Click on close button on the form
    document.getElementById('closeForm').addEventListener('click', function () {
        Form.toggleElement('formSection', 'none');
    });

    // Click on submit button on the form
    document.querySelector('.form').addEventListener('submit', function (event) {

        event.preventDefault();

        const person = new Person(Form.getElementValue('firstName'),
            Form.getElementValue('lastName'),
            Form.getElementValue('phone'),
            Form.getElementValue('email'),
            Form.getElementValue('password'),
            Form.setGender(),
            Form.setJob()
        );
        const validator = new Validator(person);
        const validationResult = validator.validatePerson();

        const validate = function () {
            const UNEXPECTED_ERROR = "Unexpected error occurred!";
            if (validationResult === true) {
                personList.push(person);
                person.appendNewRowToTable();

                Form.toggleElement('formSection', 'none');
                Form.toggleElement('tableSection', 'flex');
                Form.clearForm();
            } else if (typeof validationResult === 'string') {
                return validationResult;
            } else {
                return UNEXPECTED_ERROR;
            }
        }
        if (typeof validate() !== 'undefined') {
            alert(validate());
        }
    });

    // Click on getStarted button on the page
    document.getElementById('getStarted').addEventListener('click', function () {
        Form.toggleElement('formSection', 'flex');
        Form.checkElement('male');
    });

    // Click on header to table
    document.querySelector('#tableSection .table thead').addEventListener('click', event => {

        const tableHeadElementId = event.target.id;
        const tableHeadElementText = document.getElementById(tableHeadElementId).textContent;
        const tableHeadElement = document.getElementById(tableHeadElementId);

        Sort.setSortingField(tableHeadElementId.replace(/Table$/, ''));
        Sort.setOrder(tableHeadElement, tableHeadElementText);
        document.getElementById(event.target.id).textContent = Sort.setArrow(tableHeadElement, tableHeadElementText);

        personList = Sort.sort(personList);
        Sort.rewriteTable(personList);

    });

    // To Be Ignored, this is a workaround
    const message = localStorage.getItem('refreshMessage');
    if (message) {
        let person = new Person('Jora',
            'Cardan',
            '+373 666 33 666',
            'jora.cardan@mail.com',
            'vhjrtui6u',
            'Mujik',
            'Slesari');
        personList.push(person);
        person.appendNewRowToTable();
        person = new Person('Petrica',
            'Tigaie',
            '+373 666 22 666',
            'peter.pan@mail.com',
            'mithywth3',
            'Patan',
            'Tuneiadet');
        personList.push(person);
        person.appendNewRowToTable();
        person = new Person('Vanea',
            'Vetka',
            '+373 666 11 666',
            'ion.creanga@mail.com',
            'grtu568052',
            'Proverka dlya sortirovki',
            'Pisatel');
        personList.push(person);
        person.appendNewRowToTable();
        Form.toggleElement('tableSection', 'flex');
    }
    window.addEventListener('beforeunload', function () {
        localStorage.setItem('refreshMessage', 'qwerty');
    });

});

// id, firstName, lastName, age
let persons = [];

id.onkeyup = (e) => {
    if (e.key === 'Enter') {
        addNewPerson();
    }
}

fname.onkeyup = (e) => {
    if (e.key === 'Enter') {
        addNewPerson();
    }
}

lname.onkeyup = (e) => {
    if (e.key === 'Enter') {
        addNewPerson();
    }
}

age.onkeyup = (e) => {
    if (e.key === 'Enter') {
        addNewPerson();
    }
}

buttonAddNewPerson.onclick = addNewPerson;

buttonShowStats.onclick = () => {
    // For calculation
    let ages = persons.map((item) => Number(item.age));
    const avg = ages.reduce((acc, p) => acc + p) / ages.length;

    // Create new child
    const stats = document.createElement('p');
    let text = document.createTextNode(`Min age = ${Math.min(...ages)}, Max age = ${Math.max(...ages)}, Avg age = ${avg.toFixed(1)} `);
    stats.appendChild(text);

    // if stats already in html -> replace it
    if (outputStats.firstElementChild !== null) {
        outputStats.replaceChild(stats, outputStats.firstElementChild);
    }
    outputStats.appendChild(stats);
}

function Person(id, firstName, lastName, age) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.fullName = function () {
        return `${this.firstName} ${this.lastName}`
    };

    this.toString = function () {
        return `ID: ${this.id}, Full Name: ${this.fullName()}, Age: ${this.age} `;
    }
}

function findPerson(persons, id) {
    return persons.findIndex(p => p.id === id);
}

function calculateAge(dateOfBirth) {
    const parseToDate = new Date(dateOfBirth);
    const diff_ms = Date.now() - parseToDate;
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function addNewPerson() {
    // Getting all inputs from HTML
    const inputs = Array.from(document.getElementsByTagName('input'));

    // Check for unique ID
    if (findPerson(persons, id.value) !== -1) {
        inputs.forEach(i => i.value = '');
        alert("Person with this id already exists");
        return;
    }

    // Check for empty inputs
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
            alert("Some fields are empty, please enter data");
            return;
        }
    }

    // Check for correct age
    if (new Date(age.value) > Date.now()) {
        alert("Error in age field")
        age.value = '';
        return;
    }

    let p = new Person(id.value, fname.value, lname.value, calculateAge(age.value));
    inputs.forEach(i => i.value = '');
    persons.push(p);

    // Creating element for future adding
    const li = document.createElement('li');

    // Creating delete button
    const buttonDelete = document.createElement('button');
    buttonDelete.append(document.createTextNode('X'));

    // Adding to delete button class delete for CSS
    buttonDelete.classList.add('del');

    // Method onclick for delete
    buttonDelete.onclick = customRemoveParentElement;

    // Adding person and delete button to element
    li.append(document.createTextNode(p.toString()), buttonDelete);
    outputPersons.append(li);

    // Deleting prev stats
    if (outputStats.firstElementChild) {
        outputStats.firstElementChild.remove();
    }
}


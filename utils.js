function removeParentElement(event) {
    //TODO
    event.target.parentElement.remove();
}

function customRemoveParentElement(event) {
    //TODO
    event.target.parentElement.remove();

    if (outputStats.firstElementChild) {
        outputStats.firstElementChild.remove();
    }
    const index = persons.indexOf(event.target.parentElement);
    persons = persons.splice(index, 1);
}
class Contact {
    constructor(givenName, familyName, email, phone, addInfo) {
        this.givenName = givenName;
        this.familyName = familyName;
        this.email = email;
        this.phone = phone;
        this.addInfo = addInfo;
    }
}
class ContactManager {
    constructor() {
        this.contacts = [];
    }
    addContact(contact) {
        this.contacts.push(contact);
    }
}
let db = new ContactManager();
// Add some sample data
db.addContact(new Contact("Michael", "Smith", "no@way.com", "123-456-7890",
            "That awesome dude with mad programming skills."));
db.addContact(new Contact("John", "Doe", "john@doe.com", "555-555-5555",
            "That guy from work! The one with the mohawk and tattoos."));
db.addContact(new Contact("Jane", "Doe", "jane@doe.net", "555-123-4567",
            "That nice girl I met at the store. The one with the poodle."));
db.addContact(new Contact("Michel", "Buffa", "michel@buffa.edu", "888-888-8888",
            "That guy that teaches that Javascript course."));
let currentContact;

window.onload = init;

function init() {
    populateContactList();
    selectContact(0);
    document.querySelector("button").addEventListener("click", formSubmit);
}

function populateContactList() {
    let tbody = document.querySelector("tbody");
    for (let i=0; i<db.contacts.length; i++) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        let text = document.createTextNode(db.contacts[i].givenName);
        cell.appendChild(text);
        row.appendChild(cell);
        cell = document.createElement("td");
        text = document.createTextNode(db.contacts[i].familyName);
        cell.appendChild(text);
        row.appendChild(cell);
        tbody.appendChild(row);
        row.addEventListener("click", clickedContact);
        row.idx = i;
    }
}

function selectContact(idx) {
    let rows = document.querySelectorAll("tbody > tr");
    if (rows) {
        if (typeof currentContact != "undefined") {
            rows[currentContact].classList.remove("rowActive");
        }
    }
    rows[idx].classList.add("rowActive");
    currentContact = idx;
    populateDetails(idx);
}

function clickedContact (evt) {
    selectContact(evt.currentTarget.idx);
}

function populateDetails(idx) {
    detailData = document.querySelectorAll(".detailData");
    detailData[0].innerHTML = db.contacts[idx].givenName;
    detailData[1].innerHTML = db.contacts[idx].familyName;
    detailData[2].innerHTML = db.contacts[idx].email;
    detailData[3].innerHTML = db.contacts[idx].phone;
    detailData[4].innerHTML = db.contacts[idx].addInfo;
}

function formSubmit(evt) {
    evt.preventDefault();
    let givenName = document.querySelector("#formGivenName").value;
    let familyName = document.querySelector("#formFamilyName").value;
    let email = document.querySelector("#formEmail").value;
    let phone = document.querySelector("#formPhoneNumber").value;
    let addInfo = document.querySelector("#formAddInfo").value;
    let contact = new Contact(givenName, familyName, email, phone, addInfo);
    db.addContact(contact);
    document.querySelector("tbody").innerHTML = "";
    populateContactList();
    selectContact(db.contacts.length - 1);
    document.querySelector("form").reset();
}
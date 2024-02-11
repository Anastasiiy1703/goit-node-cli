const fs = require("node:fs/promises");
const path = require("node:fs/path");
const uuid = require("uuid");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(el => el.id === contactId);
    if (contact) {
    return contact;
  } else {
    return null;
  }
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const deletedContact = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (deletedContact !== -1) {
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contacts[deletedContact];
  } else {
    return null;
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}
import { program } from "commander";
const allFunctions = require("./contacts")
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
    const contactsList = await allFunctions.listContacts();
    console.table(contactsList);
      break;

    case "get":
    const contactById = await allFunctions.getContactById();
    console.log(contactById);
      break;

    case "add":
    const newContact = await allFunctions.addContact();
    console.log(newContact);
      break;

    case "remove":
    const deleteContact = await allFunctions.removeContact();
    console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
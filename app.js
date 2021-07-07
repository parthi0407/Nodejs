
const fs = require("fs");
const yargs = require("yargs");
const notes = require("./notes");
// Adding the records in the file
const stu = {
    Name : "Viki",
    Dept : "CSE",
    Age : 27,
}
var stuJSON = JSON.stringify(stu);
fs.writeFileSync("student.json",stuJSON)

// the output will show in buffer type
var content = fs.readFileSync("student.json")
console.log("ContentBuff----",content);
// the ouput will show in JSON type
var contentJSON = content.toString();
console.log("Content----",contentJSON);
// the output will show in Object type
var contentObj = JSON.parse(contentJSON);
console.log("ContentObj....",contentObj);

// Add a record
yargs.command({
    command:'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe : "Notes title",
            demandOption : true,
            type : 'String'
        },
        body:{
            describe : "Notes body",
           demandOption : true,
            type : 'String'
        },
    }, handler: function(argv){
        console.log("Adding new notes");
        notes.addNotes(argv.title,argv.body);
    }
});


//Remove a record
yargs.command({
    command:'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe : "Notes title",
            demandOption : true,
            type : 'String'
        },
    }, handler: function(argv){
        console.log("Remove notes");
        notes.remove(argv.title);
    }
});

// List the records
// No need of title and body
yargs.command({
    command:'list',
    describe: 'List the note',
    handler: function(argv){
        console.log("Cpoming....");
       notes.list();
    }
});

// Read the records
yargs.command({
    command:'read',
    describe: 'Read a note',
    builder:{
        title:{
            describe : "Notes title",
            demandOption : true,
            type : 'String'
        },
    }, handler: function(argv){
        notes.read(argv.title);
    }
});
yargs.parse();
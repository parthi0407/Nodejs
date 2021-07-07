const fs = require("fs");
const chalk = require("chalk");

const addNotes = function (title, body) {
   // calling load function
    var notesArr = load();

    // duplicte
    var duplicateNotes = notesArr.filter(function(note){
        return title === note.title
    });

    // Array legth
    if (duplicateNotes.length > 0) {
        console.log(chalk.blue.bgRed.bold("Record already exist"));
        return;
    }
    // declaring notes object
    var notesObj = {
        title: title,
        body: body
    }
// adding element in array
    notesArr.push(notesObj);
    // calling save function
    save(notesArr);
    console.log(chalk.yellow.bgRed.bold("Added"));
}
// declare the load function
const load = function () {
    // using try and catch for if no items present in the record
    try {

        var notesBuff = fs.readFileSync('notes1.json');
        var noteJSON = notesBuff.toString();
        var notes = JSON.parse(noteJSON);
        
        return notes;
        //if given file name doesnt exist cathch will open
    } catch (err) {
        console.log("No file found");
        return [];
    }
}
//declartion of save function
const save = function(notesArr){
    // converting the array to JSON
    var notesJSON = JSON.stringify(notesArr);
    // Write the records in the file
    fs.writeFileSync("notes1.json", notesJSON)
}
// declartion of remove function
const remove = function(title){
    // calling the load function
    var notesArr = load();
    //  removing the given title and saved in noteToKeep
    var noteToKeep = notesArr.filter(function(note){
    return note.title !== title;
    })
    if(notesArr > noteToKeep){
        save(noteToKeep);
        console.log(chalk.red.bgWhite.bold("Removed"));
    } else {
        console.log(chalk.blue.bgYellow.bold("No records found"));
    }
    
}
const list = function(){
    var noteArr = load();
    noteArr.forEach(function(note){
        console.log(chalk.yellow.bgBlue.bold(`Title:: ${note.title} & Body:: ${note.body}`));
    })
}
const read = function(title){
    console.log("Reading......");
    var noteArr= load();
    var readRec = noteArr.find(function(note){
        return title === note.title;
    })
    if(!readRec){
        console.log("No record found");
        return;
    }
    console.log(chalk.yellow.bgBlue.bold(`Title:: ${readRec.title} & Body:: ${readRec.body}`));
}

module.exports = {
    addNotes: addNotes,
    remove:remove,
    list:list,
    read:read
}
//--------------JS for DOM Manipulation-----------------------
const NotesContainer = document.getElementById("notes_container");
const UserName = document.getElementById("user_name");
const addNoteBtn = document.getElementById("addNote");
const titleE1 = document.getElementById("title");
const editorE1 = document.getElementById("editor");
const modalE1 = document.getElementById("modal");
const newBtnE1 = document.getElementById("newBtn");
const OverlayE1 = document.getElementById("overlay");
const closeModal = document.getElementById("closeModal");
const noteTitle = document.getElementById("newtitle");
const noNote = document.getElementById("noNotes");
const updateE1 = document.getElementById("update");
const messageE1 = document.getElementById("message");
//===============API==============
let currentID;
let reloaded = 1;
checkUser();
function checkUser() {
  const user = localStorage.getItem("NoteBookUserName");
  if (!user) {
    window.location.href = "/login";
  } else {
    const token = localStorage.getItem("NoteBookUserToken");
    if (!token) {
      window.location.href = "/login";
    } else {
      fetch_Notes();
    }
  }
}
// API Works-----

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Get all Notes
function fetch_Notes() {
  const token = localStorage.getItem("NoteBookUserToken");
  const user_name = localStorage.getItem("NoteBookUserName");
  UserName.innerText = user_name;
  axios
    .get("/api/v1/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.data.note.length === 0) {
        noNote.style.display = "block";
      } else {
        noNote.style.display = "none";
        response.data.note.forEach((note) => {
          //formatting dates
          const dateObject = new Date(note.created_at);
          const day = dateObject.getDate();
          const month = monthNames[dateObject.getMonth() + 1];
          const last_update = day + " " + month;
          let preContent;
          if (note.content.includes("<p>")) {
            var temporaryDiv = document.createElement("div");
            temporaryDiv.innerHTML = note.content;
            preContent = temporaryDiv.querySelector("p").innerText;
          } else {
            preContent = note.content;
          }
          const noteTemplate = ` <div class="note" id=${note._id}>
        <div class="note_title">
          <span class="title">${note.title}</span>
          <span class="text_content">${preContent}</span>
        </div>
        <div class="note_info">
          <span class="delete"><i class="fa-solid fa-trash"></i></span>
          <p class="last_update">${last_update}</p>
        </div>
      </div>`;
          NotesContainer.innerHTML += noteTemplate;
        });
      }

      const deleteBtn = document.querySelectorAll(".delete"); //to select all the delete buttons
      const Notes = document.querySelectorAll(".note");

      Notes.forEach((note, index) => {
        note.addEventListener("mouseover", () => {
          deleteBtn[index].style.visibility = "visible";
        });
        note.addEventListener("mouseout", () => {
          deleteBtn[index].style.visibility = "hidden";
        });
        //getting note
        note.addEventListener("click", (event) => {
          var parentID = event.target.closest(".note").id;
          getSingle_Note(parentID);
        });

        //deleting note
        deleteBtn[index].addEventListener("click", (event) => {
          var parentID = event.target.closest(".note").id;
          delete_Note(parentID);
          event.stopPropagation();
        });
      });
      if (response.data.note.length >= 1 && reloaded === 1) {
        currentActiveNote(
          response.data.note[0]._id,
          response.data.note[0].title,
          response.data.note[0].content
        );
        currentID = response.data.note[0]._id;
        reloaded++;
      } else {
        if (response.data.note.length >= 1) {
          getSingle_Note(currentID);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// delete Note
function delete_Note(noteId) {
  const token = localStorage.getItem("NoteBookUserToken");
  axios
    .delete(`/api/v1/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      NotesContainer.innerHTML = "";
      showMessage("Note Deleted Successfully...", "green");
      // reloaded = 1;
      currentActiveNote();
      fetch_Notes();
    })
    .catch((error) => {
      console.log(error);
    });
}

//create Note
addNoteBtn.addEventListener("click", () => {
  modalE1.style.display = "block";
  OverlayE1.style.display = "block";
});
closeModal.addEventListener("click", () => {
  modalE1.style.display = "none";
  OverlayE1.style.display = "none";
});

newBtnE1.addEventListener("click", () => {
  create_Note();
  modalE1.style.display = "none";
  OverlayE1.style.display = "none";
});

function create_Note() {
  const title = noteTitle.value;
  const token = localStorage.getItem("NoteBookUserToken");
  const data = {
    title: title,
    content: "Write Your Note Here...",
  };
  axios
    .post("/api/v1/notes", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      noteTitle.value = "";
      NotesContainer.innerHTML = "";
      showMessage("Notes crearted successfully...", "green");
      fetch_Notes();
    })
    .catch((error) => {
      console.log(error);
    });
}

//get Single Note
function getSingle_Note(noteId) {
  const token = localStorage.getItem("NoteBookUserToken");
  axios
    .get(`/api/v1/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      currentID = noteId; //assigning the current opened note
      const title = response.data.singleNote.title;
      const content = response.data.singleNote.content;
      console.log(currentID);
      currentActiveNote(currentID, title, content);
    })
    .catch((error) => {
      console.log(error);
    });
}

// update Note
updateE1.addEventListener("click", update_Note);
function update_Note() {
  const token = localStorage.getItem("NoteBookUserToken");
  const title = titleE1.value;
  var editor = tinymce.get("editor");
  const content = editor.getContent();
  const dateObject = new Date();
  const day = dateObject.getDate();
  const month = monthNames[dateObject.getMonth() + 1];
  const last_update = day + " " + month;
  const updated_at = last_update;
  const updateData = {
    title: title,
    content: content,
    updated_at: last_update,
  };
  axios
    .patch(`/api/v1/notes/${currentID}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      NotesContainer.innerHTML = "";
      showMessage(response.data.msg, "green");
      fetch_Notes();
    })
    .catch((error) => {
      console.log(error);
    });
}

function currentActiveNote(noteID = null, title = "", content = "") {
  titleE1.value = title;
  var editor = tinymce.get("editor");
  editor.setContent(content);
  const AllNotes = document.querySelectorAll(".note");
  AllNotes.forEach((note) => {
    note.classList.remove("currentopenedNote");
  });
  if (noteID) {
    document.getElementById(noteID).classList.add("currentopenedNote");
  }
}

function showMessage(message, color) {
  messageE1.textContent = message;
  messageE1.style.color = color;
  messageE1.style.display = "block";
  setTimeout(() => {
    messageE1.style.display = "none";
  }, 3000);
}

function autoSave() {
  console.log("Previous note Auto Saved...!");
}

const logout = document.getElementById("logout");
//logout

UserName.addEventListener("click", () => {
  if (logout.style.display === "none" || logout.style.display === "") {
    logout.style.display = "block";
  } else {
    logout.style.display = "none";
  }
});

logout.addEventListener("click", () => {
  console.log("User logout");
  localStorage.removeItem("NoteBookUserName");
  localStorage.removeItem("NoteBookUserToken");
  // Call checkUser function
  checkUser();
});

My Learning terminology Explanations:
deleteBtn[index].addEventListener("click", (event) => {
          var parentID = event.target.closest(".note").id;
          delete_Note(parentID);
          event.stopPropagation(); /*event.stopPropagation() is used to halt this propagation process. When called, it prevents the event from continuing to propagate to the parent or ancestor elements (capturing or bubbling phases). This means that any event listeners on higher-level elements will not be triggered.*/
        });










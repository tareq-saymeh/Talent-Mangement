// add student
   
      // Get the form modal element
      var formModalStu = document.getElementById("formModalStu");

      // Get the button that opens the form modal
      var addButtonStu = document.getElementsByTagName("button")[0];
  
      // When the user clicks the button, open the form modal
      function openFormStudent() {
      formModalStu.style.display = "block";
      }
  
      // When the user clicks the close button, close the form modal
      function closeFormStudent() {
      formModalStu.style.display = "none";
      }
  
      function addStudent() {
      // Get the form values 
      var id = document.getElementById("id").value;
      var name = document.getElementById("name").value;
      var studentID = document.getElementById("studentID").value;
      var studSkillsDrop = document.getElementById("studSkillsDrop").value;
      var major = document.getElementById("major").value;
      var gpa = document.getElementById("gpa").value;
      var level = document.getElementById("level").value;
  
      // Get the HTML table element
      var table = document.getElementById("tableStudent");
  
      // Create a new row element
      var row = table.insertRow();
  
      // Create new cells for the row
      var idCell = row.insertCell(0);
      var nameCell = row.insertCell(1);
      var studentIDCell = row.insertCell(2);
      var studSkillsDropCell = row.insertCell(3);
      var majorCell = row.insertCell(4);
      var gpaCell = row.insertCell(5);
      var levelCell = row.insertCell(6);
      var deleteCell = row.insertCell(7);
      var editCell = row.insertCell(8);
  
      // Set the values for the cells
      idCell.innerHTML = id;
      nameCell.innerHTML = name;
      studentIDCell.innerHTML = studentID;
      studSkillsDropCell.innerHTML = studSkillsDrop;
      majorCell.innerHTML =  major;
      gpaCell.innerHTML = gpa;
      levelCell.innerHTML = level;
      deleteCell.innerHTML = '<button class="pos-table-btn">DELETE</button>';
      editCell.innerHTML = '<button class="pos-table-btn" onclick="editUser()">EDIT</button>';
  
  
      // Close the form modal
      closeForm();
  
      // Clear the form values
      document.getElementById("id").value = "";
      document.getElementById("name").value = "";
      document.getElementById("studentID").value = "";
      document.getElementById("studSkillsDrop").value = "";
      document.getElementById("major").value = "";
      document.getElementById("gpa").value = "";
      document.getElementById("level").value = "";
  
      }
  





//function to delete students

function deleteStudents(id) {
    const confirmed = confirm('Are you sure you want to delete this student?');
    if (confirmed) {
  
      fetch(`/students/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete student');
        }
        window.location.reload(); // reload the page after successful deletion
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  function editStudent(Target) { // choises a student to edit and makes the form appear 
    const positionPopUp = document.getElementById('StudentPopUp')
    const title = document.getElementById("editStudID");
    if (title.Value != Target) {
        title.setAttribute("value", Target)
    }


    if (positionPopUp.style.display === "none") {
        positionPopUp.style.display = "block";
    }


}
function closeEditStud(){ // closes the form after an edit or when you click on the close button 
    const positionPopUp = document.getElementById('StudentPopUp')
    positionPopUp.style.display='none';

}


//JQuery To make the Select2 Work in student table 
$(document).ready(function() {
  $('.select2Student').select2();

});


  





  

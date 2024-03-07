
  
  // add skill
    
    // Get the form modal element
    var formModalSkills = document.getElementById("formModalSkills");

    // Get the button that opens the form modal
    var addButton = document.getElementsByTagName("button")[0];

    // When the user clicks the button, open the form modal
    function openFormSkills() {
        formModalSkills.style.display = "block";
    }

    // When the user clicks the close button, close the form modal
    function closeFormSkills() {
        formModalSkills.style.display = "none";
    }

    function addSkills() {
    // Get the form values
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;

    // Get the HTML table element
    var table = document.getElementById("tableSkills");

    // Create a new row element
    var row = table.insertRow();

    // Create new cells for the row
    var idCell = row.insertCell(0);
    var nameCell = row.insertCell(1);
    var descriptionCell = row.insertCell(2);
    var deleteCell = row.insertCell(3);
    var editCell = row.insertCell(4);

    // Set the values for the cells
    idCell.innerHTML = id;
    nameCell.innerHTML = name;
    descriptionCell.innerHTML = description;
    deleteCell.innerHTML = '<button class="pos-table-btn">DELETE</button>';
    editCell.innerHTML = '<button class="pos-table-btn" onclick="editUser()">EDIT</button>';


    // Close the form modal
    closeForm();

    // Clear the form values
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    }



    
//function to delete skills

function deleteSkills(id) {
    const confirmed = confirm('Are you sure you want to delete this skill?');
    if (confirmed) {
  
      fetch(`/skills/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete skill');
        }
        window.location.reload(); // reload the page after successful deletion
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
 
  //This Fucnction makes the form appear if it is not displayed 
  function editSkill(Target) {
    const skillsPopUp = document.getElementById('skillsPopUp')
    const title = document.getElementById("skillId");
    if (title.Value != Target) {
        title.setAttribute("value", Target) //This Sets the Hidden Input Value To the Skill Id 
    }


    if (skillsPopUp.style.display === "none") {
        skillsPopUp.style.display = "block";
    }


}
//Closes the edit
function closeEdit() {
    const skillsPopUp = document.getElementById('skillsPopUp')
    skillsPopUp.style.display = 'none';

}
//JQuery To make the Select2 Work in Skills Page
$(document).ready(function() {
  $('.select2Student').select2();

});


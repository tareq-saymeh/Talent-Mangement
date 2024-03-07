


// add user 
    // Get the form modal element
    var formModalUser = document.getElementById("formModalUser");

    // Get the button that opens the form modal
    var addButton = document.getElementsByTagName("button")[0];

    // When the user clicks the button, open the form modal
    function openFormUser() {
        formModalUser.style.display = "block";
    }

    // When the user clicks the close button, close the form modal
    function closeFormUser() {
        formModalUser.style.display = "none";
    }

    function addUser() {
    // Get the form values
    var id = document.getElementById("id").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var telegram = document.getElementById("telegram").value;
    var password = document.getElementById("password").value;

    // Get the HTML table element
    var table = document.getElementById("tableuser");

    // Create a new row element
    var row = table.insertRow();

    // Create new cells for the row
    var idCell = row.insertCell(0);
    var firstNameCell = row.insertCell(1);
    var lastNameCell = row.insertCell(2);
    var emailCell = row.insertCell(3);
    var telegramCell = row.insertCell(4);
    var passwordCell = row.insertCell(5);
    var deleteCell = row.insertCell(6);
    var editCell = row.insertCell(7);

    // Set the values for the cells
    idCell.innerHTML = id;
    firstNameCell.innerHTML = firstName;
    lastNameCell.innerHTML = lastName;
    emailCell.innerHTML = email;
    telegramCell.innerHTML = telegram;
    passwordCell.innerHTML = password;
    deleteCell.innerHTML = '<button class="pos-table-btn">DELETE</button>';
    editCell.innerHTML = '<button class="pos-table-btn" onclick="editUser()">EDIT</button>';


    // Close the form modal
    closeForm();

    // Clear the form values
    document.getElementById("id").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telegram").value = "";
    document.getElementById("password").value = "";
    }





//function to delete users
   function deleteusers(id) {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (confirmed) {
  
      fetch(`/users/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        window.location.reload(); // reload the page after successful deletion
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  function editUser(Target) { //function to choose a user and update his data , and make the form appear 
    const UserPopUp = document.getElementById('UserPopUp')
    const userObjId = document.getElementById("editUserId");
    if (userObjId.Value != Target) {
        userObjId.setAttribute("value", Target)
    }


    if (UserPopUp.style.display === "none") {
        UserPopUp.style.display = "block";
    }


}
function closeEditUser(){ // function to close the edit 
    const UserPopUp = document.getElementById('UserPopUp')
    UserPopUp.style.display='none';

}

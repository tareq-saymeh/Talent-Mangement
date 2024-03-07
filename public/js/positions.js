




// add Positions

    
    // Get the form modal element
    var formModalPos = document.getElementById("formModalPos");

    // Get the button that opens the form modal
    var addButton = document.getElementsByTagName("button")[0];

    // When the user clicks the button, open the form modal
    function openFormPosition() {
        formModalPos.style.display = "block";
    }

    // When the user clicks the close button, close the form modal
    function closeFormPosition() {
        formModalPos.style.display = "none";
    }

    function addPosition() {
    // Get the form values
    var id = document.getElementById("id").value;
    var title = document.getElementById("title").value;
    var skillsDrop = document.getElementById("skillsDrop").value;
    var positionExpreance = document.getElementById("positionExpreance").value;
    var Status = document.getElementById("Status").value;













    // Get the HTML table element
    var table = document.getElementById("tablePositions");

    // Create a new row element
    var row = table.insertRow();

    // Create new cells for the row
    var idCell = row.insertCell(0);
    var titleCell = row.insertCell(1);
    var descruptionCell = row.insertCell(2);
    var skillsDropCell = row.insertCell(3);
    var positionExpreanceCell = row.insertCell(4);
    var StatusCell = row.insertCell(5);
    var deleteCell = row.insertCell(6);
    var editCell = row.insertCell(7);

    // Set the values for the cells
    idCell.innerHTML = id;
    titleCell.innerHTML = title;
    skillsDropCell.innerHTML = skillsDrop;
    positionExpreanceCell.innerHTML = positionExpreance;
    StatusCell.innerHTML = Status;
    deleteCell.innerHTML = '<button class="pos-table-btn">DELETE</button>';
    editCell.innerHTML = '<button class="pos-table-btn" onclick="editUser()">EDIT</button>';


    // Close the form modal
    closeForm();

    // Clear the form values
    document.getElementById("id").value = "";
    document.getElementById("title").value = "";
    document.getElementById("discruption").value = "";
    document.getElementById("skillsDrop").value = "";
    document.getElementById("positionExpreance").value = "";
    document.getElementById("Status").value = "";
    }




    
// function to delete position 
  function deletePosition(id) {
    const confirmed = confirm('Are you sure you want to delete this position?');
    if (confirmed) {
  
      fetch(`/position/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete position');
        }
        window.location.reload(); // reload the page after successful deletion
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  function editPosition(Target) { // function to choose what position to edit and makes the form appear 
    const positionPopUp = document.getElementById('positionPopUp')
    const targetTitle = document.getElementById("targetTitle");
    if (targetTitle.value != Target) {
        targetTitle.setAttribute("value", Target)
    }


    if (positionPopUp.style.display === "none") {
        positionPopUp.style.display = "block";
    }


}
function closeEdit(){ // closes the edit 
    const positionPopUp = document.getElementById('positionPopUp')
    positionPopUp.style.display='none';

}

//notifications 
  const button=document.getElementById("btn-add");
  button.addEventListener("click",()=>{
    const notification = Notification.requestPermission().then(perm=>{
      if(perm==="granted"){
        new Notification("TALENTO",{
          body: `Hi ,You have a new position ${title.value}` ,
          icon:"images/talento-removebg-preview.png ",
        })
        notification.addEventListener("error",e=>{
          console.log(error);
        })
      }
    })
  }
  )

//JQuery To make the Select2 Work in Fillter Page
$(document).ready(function() {
  $('#skillsSelect2Position').select2();
});
// Validate form input before submitting form
function validateForm() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var address = document.getElementById("address").value;
  var email = document.getElementById("email").value;

  if (name == "") {
    alert("Name is required");
    return false;
  }

  if (age == "") {
    alert("Age is required");
    return false;
  } else if (age < 1) {
    alert("Age must be a zero or less than zero");
    return false;
  }

  if (address == "") {
    alert("Address is required");
    return false;
  }

  if (email == "") {
    alert("Email is required");
    return false;
  } else if (!email.includes("@")) {
    alert("Invalid email address");
    return false;
  }
  return true;
}

// Function to show Data
function showData() {
  // Initialize peopleList
  var peopleList = [];

  // Retrieve data from localStorage if it exists
  var storedPeopleList = localStorage.getItem("peopleList");
  if (storedPeopleList !== null) {
    peopleList = JSON.parse(storedPeopleList);
  }

  // Check if peopleList is null or empty
  if (peopleList.length === 0) {
    console.log("No data to display.");
    // Display a message or clear the table
    html = "<tr><td colspan='5'>No data available</td></tr>";
  }
  var html = "";
  {
    // Iterate over each element in peopleList
    peopleList.forEach(function (element, index) {
      html += "<tr>";
      html += "<td>" + element.name + "</td>";
      html += "<td>" + element.age + "</td>";
      html += "<td>" + element.address + "</td>";
      html += "<td>" + element.email + "</td>";
      html +=
        '<td><button onclick="deleteData(' +
        index +
        ')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
        index +
        ')" class="btn btn-warning">Edit</button></td>';
      html += "</tr>";
    });
  }

  // Update the HTML content of the table body
  var tbody = document.querySelector("#crudTable tbody");
  if (tbody) {
    tbody.innerHTML = html;
  } else {
    console.error("Table body element not found.");
  }
}

// Loads all data when document or page loaded
window.onload = showData;

// Function to add data
function AddData() {
  //   console.log("AddData is working");
  // If form is validate
  if (validateForm() == true) {
    // console.log("Working");
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
      console.log("working");
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.push({
      name: name,
      age: age,
      address: address,
      email: email,
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
  }
}

//function to delete data from local storage
function deleteData(index) {
  var peopleList;

  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

//function to update/edit data in local storage
function updateData(index) {
  // Add button will hide and Update button will show for updating of Data in local storage
  document.getElementById("addButton").style.display = "none";
  document.getElementById("updateButton").style.display = "block";

  var peopleList;

  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("name").value = peopleList[index].name;
  document.getElementById("age").value = peopleList[index].age;
  document.getElementById("address").value = peopleList[index].address;
  document.getElementById("email").value = peopleList[index].email;

  document.querySelector("#updateButton").onclick = function () {
    if (validateForm() == true) {
      peopleList[index].name = document.getElementById("name").value;
      peopleList[index].age = document.getElementById("age").value;
      peopleList[index].address = document.getElementById("address").value;
      peopleList[index].email = document.getElementById("email").value;

      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();

      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("address").value = "";
      document.getElementById("email").value = "";
    }
  };
}

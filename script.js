// validate form inputs before submitting data

function validateform(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password= document.getElementById("password").value;

    if(name == ""){
        alert("Name is required");
        return false;
    }

    if(password == "" ){
        alert("Password is required")
        return false;
    }

    if (email == "")  {
        alert("Email address is required")
        return false;
    }
    else if (!email.includes("@")){
        alert("Invalid email address")
        return false;
    }

    return true;
}

//function to show all the data from local storage
function showData(){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }

    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "" ;

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.password + "</td>";
        html += 
          '<td><button onclick="deleteData(' +
          index +
          ')" class="btn btn-danger">Delete</button><button onclick="updateData(' + 
          index +
          ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;

}

// Loads all data when document or page loaded 
document.onload = showData();

// function to add data to local storage
function AddData(){
    if (validateform() == true){
        
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var password= document.getElementById("password").value;
           
        var peopleList;
        if(localStorage.getItem("peopleList") == null){
            peopleList = [];
        }
    
        else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"))
        }

        peopleList.push({
            name : name,
            email : email,
            password : password}
        )

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";


    }
}

// function to delete data from local storage
function deleteData(index){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }

    else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }     

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

//function to update/edit data from local storage

function updateData(index){
    //Submit button will hide and Update button will show for updating of
    //Data in localstorage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display ="block";

    var peopleList;
    if(localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }   
    
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("password").value = peopleList[index].password;

    document.querySelector("#Update").onclick = function(){
        if (validateform()== true){
        peopleList[index].name = document.getElementById("name").value;
        peopleList[index].email = document.getElementById("email").value;
        peopleList[index].password = document.getElementById("password").value;

        localStorage.setItem("peopleList", JSON.stringify(peopleList));

        showData();

        document.getElementById("name").value ="";
        document.getElementById("email").value ="";
        document.getElementById("password").value ="";

        //Update button will hide and Submit button will appear

        document.getElementById("Submit").style.display = "block"
        document.getElementById("Update").style.display = "none"

    }



    }

    
}

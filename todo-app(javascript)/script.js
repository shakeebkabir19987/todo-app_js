const addUserBtn=document.getElementById("addUser");
const btnText=addUserBtn.innerText;
const usenameTextField =document.getElementById("username");
const recordsDisplay = document.getElementById("records");

let userArray=[];
let edit_id = null;

let objStr= localStorage.getItem("users");

if(objStr!=null){
    userArray=JSON.parse(objStr);
}
DisplayInfo();
addUserBtn.onclick=()=>{
    const name= usenameTextField.value;
    if(edit_id!=null){
     userArray.splice(edit_id,1,{'name' : name})
     edit_id = null;
    }else{
      
        userArray.push({'name' : name});
    }
    
    SaveInfo(userArray);
    usenameTextField.value='';
    DisplayInfo();
    addUserBtn.innerText=btnText;
}

function SaveInfo(){
   let str= JSON.stringify(userArray);
   localStorage.setItem('users',str);

}

function DisplayInfo(){
   let statement='';
    userArray.forEach((user,i) => {
        statement+=
 `
    <tr>
    <th scope="row">${i+1}</th>
    <td style=" padding-right:50px">${user.name}</td>
    <td>
      <i class="btn fa fa-edit btn-info text-white" style="font-size:24px; margin-right: 0px; margin-left: 120px" onclick="EditInfo(${i})"></i>
      <i class="btn fa fa-trash-o btn-danger text-white" style="font-size:24px; margin-left: 20px; margin-right: 0px;" onclick="DeleteInfo(${i})"></i>
    </td>
  </tr>
  `
    });
    recordsDisplay.innerHTML=statement;
}

function EditInfo(id){

    edit_id=id;
    usenameTextField.value=userArray[id].name;
    addUserBtn.innerText="Save Changes";


}

function DeleteInfo(id){

userArray.splice(id,1);
SaveInfo(userArray);
DisplayInfo();
}
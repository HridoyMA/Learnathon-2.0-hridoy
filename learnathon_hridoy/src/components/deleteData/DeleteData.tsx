import axios from "axios";

function DeleteData(id: number){
    const confirm = window.confirm("Are you sure to Delete?");
    if (confirm) {
      axios
        .delete("http://localhost:3000/users/" + id)
        .then(() => {
          location.reload(); // this will refresh the tab
        })
        .catch((error) => console.log(error));
    }
  }

  export default DeleteData;
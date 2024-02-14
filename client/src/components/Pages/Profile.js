import Profilecomp from "../Profile/Profilecomp";
import Register from "./Register";
function Profile() {
  return (
    localStorage.getItem('token')?<Profilecomp/>:<Register/>
  );
}

export default Profile;
import axios from "axios";
import { useState } from "react";

const UpdatePassword = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response  = await axios.patch("https://clumsy-glasses-clam.cyclic.app/api/auth/updatePassword", {email, password, password2});
            console.log("response ",response)
          
        } catch (e) {
            console.log(e)
        }
        
    } 
    

    
    return (
        <>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="New Password" onChange={(e) => setPassword(e.target.value)}/>
        <input placeholder="Confirm New Password" onChange={(e) => setPassword2(e.target.value)}/>
        <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default UpdatePassword;
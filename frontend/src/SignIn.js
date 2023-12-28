import axios from "axios";
import { useState } from "react";

const SignIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("https://clumsy-glasses-clam.cyclic.app/api/auth/signin", {
            email,
            password,
          }, {
            'Access-Control-Allow-Origin': "*"
          });
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      };
    
    return (
        <>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)}/>
        <input placeholder="Password" onChange={e => setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default SignIn;
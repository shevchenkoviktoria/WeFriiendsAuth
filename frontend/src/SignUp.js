import axios from "axios";
import { getGoogleUrl } from "./getGoogle";
import { useLocation } from 'react-router-dom';
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
//   const location = useLocation();
//   console.log(location)
// //   let from = ((location.state).pathname) || '/';
// //   console.log(from)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://clumsy-glasses-clam.cyclic.app/api/auth/register", {
        email,
        password,
        password2,
      }, {
        'Access-Control-Allow-Origin': "*"
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
//https://clumsy-glasses-clam.cyclic.app
  const googleSignUp = () => {
    //getGoogleUrl(from);
    window.open('https://clumsy-glasses-clam.cyclic.app/api/auth/google')
  }
  return (
    <div style={{margin: 'auto', maxWidth: '600px'}}>
      <div>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Confirm password"
          onChange={(e) => setPassword2(e.target.value)}
        />
      </div>

      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div style={{marginTop: '20px'}}>
        <button onClick={googleSignUp}>Google</button>
      </div>

      <div><a href='/updatePassword'/>Forgot password?</div>
    </div>
  );
};

export default SignUp;

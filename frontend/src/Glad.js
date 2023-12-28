import { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const Glad = () => {
  let params = useParams();
  const [userActivated, setUserActivated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verifyEmailSignUp();

    
  }, []);

  const verifyEmailSignUp = async () => {
    try {
      const response = await axios.get(
        `https://clumsy-glasses-clam.cyclic.app/api/auth/confirm/${params.id}`
      );
      console.log(response.data);
      //put token into localstorage
      // if(response.status === 200) {
      //     setUserActivated(true);
      // }
    } catch (e) {
      //redirect back to signup
      console.log(e);
    }
    setIsLoading(false);
  };
  return <>{userActivated ? <div>Glad screen!</div> : null}</>;
};

export default Glad;

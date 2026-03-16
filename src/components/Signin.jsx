import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signin = () => {

  // Define the two hooks for capturing/storing the users input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Declare the three additional hooks
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  
  // below we have the useNavigate hook hook to redirect us to another page on success login/signin
  const navigate = useNavigate("")

  // below is the function to handle the signin action
  const handleSubmit = async (e) => {
    // prevent the site from reloading
    e.preventDefault()

    // update the loading hook with a message
    setLoading("Please wait while we authenticate your account...")
    
    try{
      // Create a formData object that will hold the email and password
      const formdata = new FormData()
      
      //10. Insert/append the email and the password on the formData created.
      formdata.append("email", email);
      formdata.append("password", password);

      // interact with axios for response
      const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/signin", formdata);

      // set the loading hook back to default
      setLoading("");

      // check whether the user response exists as part of your response from the API
      if(response.data.user){
        // if user is there, definitely the details entered during signup are correct
        //setSuccess("Login successfull")
        // if it is successful, let a person get redirected another page
        navigate("/");

      }
      else{
        // user is not found, that means the credetial entered on the form are incorrect
        setError("Login Failed. Please try again...")

      }
    }
    catch(error){
      // set loading back to default
      setLoading("")

      // update the error hook with a message
      setError("Oops, something went wrong. Try again...")

    }
  }
  
  
  
  return (
    <div className='row justify-content-center mt-4'>
    <div className="col-mid-6 card shadow p-4">
      <h1 className='text-primary'>Sign In</h1>

      <h5 className='text-info'>{loading}</h5>
      <h3 className='text-success'>{success}</h3>
      <h2 className='text-danger'>{error}</h2>

      <form onSubmit={handleSubmit}>
        <input type="email"
        placeholder='Enter the email adress here...'
        className='form-control'
        required 
        value={email}
        onChange={(e) => setEmail(e.target.value)}/> <br />

         {/*{email}*/}
         
        <input type="password"
        placeholder='Enter the password here...'
        className='form-control'
        required 
        value={password}
        onChange={(e) => setPassword(e.target.value)}/> <br />

        {/*{password}*/}

        <input type="submit"
        value="Signin"
        className='btn btn-primary'/> <br />
         Dont have an account?<Link to={'/signup'}>Register</Link>

      
      </form>

    </div>
    </div>
  )
}

export default Signin;

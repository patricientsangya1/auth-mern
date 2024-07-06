import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {

  const [formData, setFormData] = useState({});
  const { isLoading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.id]: e.target.value});
  }
  // console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(loginSuccess());
      if(data.success === false){
        dispatch(loginFailure());
        return;
      }
      // If everything is okie credential wise -> navigate to the home page
      navigate('/');
      
    } catch (error) {
      dispatch(loginFailure(error));
    }

    
    // console.log(data);
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <form onSubmit ={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}
        />

        <button disabled={isLoading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {isLoading ? 'Loading...': 'Login'}
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Dont have an account?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something went wrong!'}</p>
    </div>
  );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.id]: e.target.value});
  }
  // console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(false);
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setIsLoading(false);
      if(data.success === false){
        setError(true);
        return;
      }
      navigate('/login')
      
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }

    
    // console.log(data);
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit ={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}
        />
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
          {isLoading ? 'Loading...': 'Sign Up'}
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link to="/login">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something went wrong!'}</p>
    </div>
  );
}
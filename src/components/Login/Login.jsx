import React, { use } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
    const {signInWithGoogle,signInUser}=use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
   const from = location.state?.from?.pathname || "/";
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({ icon: 'success', title: 'Login Successful!' });
                navigate(from, { replace: true }); 
            })
            .catch(error => {
                Swal.fire({ icon: 'error', title: 'Login Failed', text: error.message });
            });
    }
  
const handleGoogleSignIn = () => {
    signInWithGoogle()
        .then(result => {
            const user = result.user;
            const newUser = {
                name: user.displayName,
                email: user.email,
                image: user.photoURL
            };

          
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(() => {
                Swal.fire({ icon: 'success', title: 'Success!', text: 'Login Successful!' });
                navigate(from, { replace: true });
            })
            .catch(dbErr => {
                console.error("Database save error:", dbErr);
             
                navigate(from, { replace: true });
            });
        })
        .catch(error => {
            console.error("Google Auth Error:", error);
            Swal.fire({ icon: 'error', title: 'Auth Failed', text: error.message });
        });
};
    return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl mt-10 p-5">
         <div>
           <h1 className="text-5xl font-bold">Login now!</h1>
          <p className='mt-2 text-center'>Don't have an account? <NavLink to='/register' className='text-primary font-semibold'>Register Now</NavLink></p>
         </div>
      <form onSubmit={handleLogin} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input name='email' type="email" className="input w-full" placeholder="Email" required />
          <label className="label">Password</label>
          <input name='password' type="password" className="input w-full" placeholder="Password" required/>
           <div><a className="link link-hover">Forgot password?</a></div>
          <button type='submit' className="btn btn-neutral w-full mt-4">Login</button>
        </fieldset>
        {/* Google */}
<button type="button" onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>

      </form>

      
    </div>
 
    );
};

export default Login;
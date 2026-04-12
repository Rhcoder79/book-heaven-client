import React, { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Register = () => {
    const {signInWithGoogle,createUser,updateUserProfile}=use(AuthContext);
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

      
        if (password.length < 6) {
            return Swal.fire({ icon: 'error', title: 'Oops...', text: 'Password must be at least 6 characters long!' });
        }
        if (!/[A-Z]/.test(password)) {
            return Swal.fire({ icon: 'error', title: 'Oops...', text: 'Password must have at least one uppercase letter!' });
        }
        if (!/[a-z]/.test(password)) {
            return Swal.fire({ icon: 'error', title: 'Oops...', text: 'Password must have at least one lowercase letter!' });
        }

        
        createUser(email, password)
            .then(result => {
              console.log(result.user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        const newUser = { name, email, image: photo };

                        
                        fetch('http://localhost:3000/users/', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(newUser)
                        })
                        .then(() => {
                            Swal.fire({ icon: 'success', title: 'Registration Successful!' });
                            navigate('/'); 
                        });
                    });
            })
            .catch(error => {
                Swal.fire({ icon: 'error', title: 'Registration Failed', text: error.message });
            });
    };
   const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                };
                fetch('http://localhost:3000/users/', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(newUser)
                }).then(() => {
                    Swal.fire({ icon: 'success', title: 'Google Login Successful!' });
                    navigate('/');
                });
            })
            .catch(error => {
                Swal.fire({ icon: 'error', title: 'Error', text: error.message });
            });
    };
    return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl mt-10 p-5">
         <div>
           <h1 className="text-5xl font-bold">Register now!</h1>
          <p className='mt-2 text-center'>Already have an account? <NavLink to='/login' className='text-primary font-semibold'>Login Now</NavLink></p>
         </div>

      <form onSubmit={handleRegister} className="card-body">
        <fieldset className="fieldset">
            <label className="label">Name</label>
          <input name='name' type="text" className="input w-full" placeholder="Name" required/>
          <label className="label">Email</label>
          <input name='email' type="email" className="input w-full" placeholder="Email" required />
          <label className="label">Password</label>
          <input name='password' type="password" className="input w-full" placeholder="Password" required/>
             <label className="label">photoURL</label>
          <input name='photo' type="text" className="input w-full" placeholder="photo Url" required/>
         

          <button type='submit' className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        {/* Google */}
<button type='button' onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] w-full">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Register with Google
</button>
      </form>

    </div>
 
    );
};

export default Register;
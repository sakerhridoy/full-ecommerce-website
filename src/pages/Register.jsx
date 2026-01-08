import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    register({ name, email });
    navigate('/');
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-center mb-8">
            Create Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-xl border focus:border-[#A0C878]"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-xl border focus:border-[#A0C878]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 rounded-xl border focus:border-[#A0C878]"
            />
            <button
              type="submit"
              className="w-full py-5 bg-[#A0C878] hover:bg-[#8bb15c] text-white font-bold rounded-xl shadow-lg"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#A0C878] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;

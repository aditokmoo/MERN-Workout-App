import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';

export const Register = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('');
    const { register, isLoading, error } = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await register(email, password)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          
          <label>Email address:</label>
          <input 
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
    
          <button disabled={isLoading}>Sign up</button>
          {error && <div className='error'>{error}</div>}
        </form>
      )
} 
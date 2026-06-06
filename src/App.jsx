import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';

// ============================================================================
// 🔒 RAPIDAPI CONFIGURATION
// Replace this with your actual X-RapidAPI-Key from the dashboard.
// Get yours at: https://rapidapi.com/
// ============================================================================
const RAPIDAPI_KEY = "TU_RAPIDAPI_KEY";
const RAPIDAPI_HOST = "disposable-shield-email-validator.p.rapidapi.com";
const API_URL = `https://${RAPIDAPI_HOST}/`;

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [emailStatus, setEmailStatus] = useState({ state: 'idle', message: '' });

  // ── Email Validation Logic ─────────────────────────────────────────────
  const validateEmailOnBlur = async () => {
    if (!email || !email.includes('@')) return;

    setIsChecking(true);
    setEmailStatus({ state: 'checking', message: '' });

    try {
      // Direct call to RapidAPI Edge Endpoint
      const response = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST
        }
      });

      const json = await response.json();

      if (json.success && json.data.es_desechable) {
        setEmailStatus({ 
          state: 'invalid', 
          message: 'Please use a legitimate business or personal email address.' 
        });
      } else {
        setEmailStatus({ state: 'valid', message: '' });
      }
    } catch (error) {
      console.error("API Validation Error:", error);
      // Fail gracefully - allow the user to proceed if the API fails
      setEmailStatus({ state: 'valid', message: '' });
    } finally {
      setIsChecking(false);
    }
  };

  // ── Form Submission ───────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailStatus.state === 'invalid') return;
    
    alert(`Success! Account created for ${email}`);
  };

  return (
    <>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="glass-container">
        <div className="header">
          <div className="header-icon">
            <ShieldCheck size={32} />
          </div>
          <h1>Create your account</h1>
          <p>Join thousands of users building the future. Secure and fast.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Work Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                id="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmailOnBlur}
                required
                style={{
                  borderColor: emailStatus.state === 'invalid' ? 'var(--error-color)' : 
                               emailStatus.state === 'valid' ? 'var(--success-color)' : ''
                }}
              />
              
              {/* Dynamic Status Icons */}
              {isChecking && <Loader2 className="status-icon loader" size={20} color="#818CF8" />}
              {emailStatus.state === 'valid' && <CheckCircle2 className="status-icon" size={20} color="var(--success-color)" />}
              {emailStatus.state === 'invalid' && <AlertCircle className="status-icon" size={20} color="var(--error-color)" />}
            </div>

            {/* Error Message */}
            {emailStatus.state === 'invalid' && (
              <div className="error-message">
                <AlertCircle size={14} />
                <span>{emailStatus.message}</span>
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-btn"
            disabled={emailStatus.state === 'invalid' || isChecking || !email || !password}
          >
            {isChecking ? 'Verifying...' : 'Create Account'}
            {!isChecking && <ArrowRight size={20} />}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;

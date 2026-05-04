'use client';

import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface PinGateProps {
  children: React.ReactNode;
}

export function PinGate({ children }: PinGateProps): React.ReactElement {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '0000') {
      setAuthenticated(true);
    } else {
      setError('Invalid PIN');
      setTimeout(() => setError(''), 3000);
      setPin('');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="glass-strong card p-8 max-w-sm w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--gold-400)] to-[var(--color-secondary)]" />
          
          <div className="w-16 h-16 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center mx-auto mb-6 text-[var(--color-primary)]">
            <Lock size={28} />
          </div>
          
          <h1 className="text-center text-2xl font-display font-bold text-[var(--text-primary)] mb-2">
            Admin Access
          </h1>
          <p className="text-center text-[var(--text-muted)] text-sm mb-8">
            Enter your PIN to manage portfolio content and design.
          </p>

          <div className="mb-6">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="input text-center tracking-[0.5em] text-xl"
              placeholder="Enter PIN"
              maxLength={20}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs text-center mt-2 absolute w-full left-0">{error}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Unlock Panel
          </button>
          
          <a href="/" className="block text-center mt-6 text-sm text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors">
            Return to Portfolio
          </a>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}

export default PinGate;

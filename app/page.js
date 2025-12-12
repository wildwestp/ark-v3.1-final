'use client';

import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);
  const [tab, setTab] = useState('search');

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setAuth(localStorage.getItem('ark_auth') === 'true');
    }
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (password === 'arkglobal2024') {
      localStorage.setItem('ark_auth', 'true');
      setAuth(true);
    } else {
      alert('Wrong password!');
    }
  };

  const logout = () => {
    localStorage.removeItem('ark_auth');
    setAuth(false);
  };

  if (!mounted) return null;

  if (!auth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <form onSubmit={login} className="bg-gray-900 p-8 rounded-xl border border-gray-800 max-w-md w-full">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">ARK Scanner V6</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white mb-4"
            placeholder="Enter password"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-bold text-white"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-orange-600 border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">ARK Bundle Scanner V6 Ultimate</h1>
            <button onClick={logout} className="px-4 py-2 bg-white/20 rounded-lg">
              Logout
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTab('search')}
              className={'px-6 py-2 rounded-lg font-semibold ' + (tab === 'search' ? 'bg-white text-orange-600' : 'bg-orange-700 text-white')}
            >
              🔍 Search
            </button>
            <button
              onClick={() => setTab('saved')}
              className={'px-6 py-2 rounded-lg font-semibold ' + (tab === 'saved' ? 'bg-white text-orange-600' : 'bg-orange-700 text-white')}
            >
              💾 Saved
            </button>
            <button
              onClick={() => setTab('bundles')}
              className={'px-6 py-2 rounded-lg font-semibold ' + (tab === 'bundles' ? 'bg-white text-orange-600' : 'bg-orange-700 text-white')}
            >
              📦 Bundles
            </button>
            <button
              onClick={() => setTab('competitors')}
              className={'px-6 py-2 rounded-lg font-semibold ' + (tab === 'competitors' ? 'bg-white text-orange-600' : 'bg-orange-700 text-white')}
            >
              👁️ Watch
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {tab === 'search' && (
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Search Products</h2>
            <p className="text-gray-400">Search functionality coming soon...</p>
          </div>
        )}

        {tab === 'saved' && (
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Saved Products</h2>
            <p className="text-gray-400">No saved products yet</p>
          </div>
        )}

        {tab === 'bundles' && (
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">My Bundles</h2>
            <p className="text-gray-400">No bundles yet</p>
          </div>
        )}

        {tab === 'competitors' && (
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Watching</h2>
            <p className="text-gray-400">No competitors tracked</p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, LayoutDashboard, ShoppingCart, Package, Users, Settings, LogOut } from 'lucide-react';

// --- Types ---
type Screen = 'splash' | 'auth' | 'dashboard';
type AuthMode = 'login' | 'register';

export default function KHStudioApp() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [errors, setErrors] = useState({ name: '', password: '' });

  // 1. スプラッシュ画面の5秒タイマー
  useEffect(() => {
    const timer = setTimeout(() => setScreen('auth'), 5000);
    return () => clearTimeout(timer);
  }, []);

  // 2. 背景の星空描画 (useEffect)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.2 + 0.2,
        o: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.0003 + 0.0001,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;
      stars.forEach(s => {
        const opacity = s.o * (0.6 + 0.4 * Math.sin(t * s.speed * 100 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 3. バリデーション & 送信
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name.length < 2 ? '2文字以上で入力してください' : '',
      password: formData.password.length < 8 ? '8文字以上で入力してください' : '',
    };
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.password) {
      setScreen('dashboard');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-[#00e5ff]/30">
      {/* 背景レイヤー */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 z-1 pointer-events-none opacity-40 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <AnimatePresence mode="wait">
        {/* --- SPLASH SCREEN --- */}
        {screen === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen"
          >
            <div className="relative w-48 h-48 mb-8">
              <div className="absolute inset-0 bg-[#00e5ff]/10 rounded-full blur-3xl animate-pulse" />
              {/* SVG Logo Logic Here (簡略化) */}
              <div className="relative z-10 w-full h-full border border-[#00e5ff]/30 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold tracking-[0.2em] font-orbitron">KH</span>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl font-black font-orbitron tracking-[0.2em] mb-2">KH <span className="text-[#00e5ff]">STUDIO</span></h1>
              <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent mx-auto mb-4" />
              <p className="text-[10px] tracking-[0.5em] text-[#00e5ff] uppercase">AI & App Engineering</p>
            </motion.div>
            <div className="absolute bottom-20 w-40 h-[1px] bg-white/10 overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]"
              />
            </div>
          </motion.div>
        )}

        {/* --- AUTH SCREEN (Login/Register) --- */}
        {screen === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex items-center justify-center min-h-screen p-6"
          >
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-orbitron font-bold tracking-wider">
                  {authMode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
                </h2>
                <p className="text-xs text-[#00e5ff] mt-2 tracking-widest uppercase">System Access Required</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Identifier</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00e5ff]" />
                    <input 
                      type="text"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[#00e5ff]/50 outline-none transition-all"
                      placeholder="Username"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Secret Key</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00e5ff]" />
                    <input 
                      type="password"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:border-[#00e5ff]/50 outline-none transition-all"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                  {errors.password && <p className="text-red-400 text-[10px] mt-1">{errors.password}</p>}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00e5ff] to-[#009bb0] text-black font-bold py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                >
                  {authMode === 'login' ? 'INITIALIZE SESSION' : 'REGISTER AGENT'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-[10px] text-gray-400 hover:text-[#00e5ff] tracking-widest uppercase transition-colors"
                >
                  {authMode === 'login' ? "Don't have an account? Sign Up" : "Already registered? Login"}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- DASHBOARD (Bento Grid) --- */}
        {screen === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 p-8 pt-20 max-w-7xl mx-auto min-h-screen"
          >
            <nav className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 backdrop-blur-md z-50 px-8 flex items-center justify-between">
              <div className="font-orbitron font-bold text-sm tracking-tighter">KH <span className="text-[#00e5ff]">CORE</span></div>
              <div className="flex gap-6">
                <Settings className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                <LogOut className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" onClick={() => setScreen('auth')} />
              </div>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-6 md:grid-rows-3 gap-4 h-auto md:h-[80vh]">
              {/* Main Console */}
              <div className="md:col-span-2 md:row-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <LayoutDashboard className="text-[#00e5ff]" />
                  <h3 className="font-orbitron tracking-widest text-lg">OPERATIONS CONTROL</h3>
                </div>
                <div className="flex-1 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-gray-500 text-sm">
                  中央作業エリア: 受発注リストを表示
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-[#00e5ff]/5 backdrop-blur-md border border-[#00e5ff]/20 rounded-3xl p-6 flex flex-col justify-between">
                <ShoppingCart className="text-[#00e5ff] w-5 h-5" />
                <div>
                  <div className="text-3xl font-bold font-orbitron">24</div>
                  <div className="text-[10px] text-gray-400 tracking-widest uppercase">Pending Orders</div>
                </div>
              </div>

              {/* Inventory Card */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                <Package className="text-gray-400 w-5 h-5" />
                <div>
                  <div className="text-3xl font-bold font-orbitron">1,204</div>
                  <div className="text-[10px] text-gray-400 tracking-widest uppercase">Stock Units</div>
                </div>
              </div>

              {/* Clients Card */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                <Users className="text-gray-400 w-5 h-5" />
                <div>
                  <div className="text-3xl font-bold font-orbitron">89</div>
                  <div className="text-[10px] text-gray-400 tracking-widest uppercase">Active Clients</div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="md:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 overflow-hidden">
                <h4 className="text-[10px] tracking-[0.3em] text-[#00e5ff] uppercase mb-4">Live System Log</h4>
                <div className="space-y-2 font-mono text-[10px] text-gray-500">
                  <p>{`> System initialized... OK`}</p>
                  <p>{`> Fetching order history... DONE`}</p>
                  <p className="text-[#00e5ff]/60">{`> New order received from ID: #8821`}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=DM+Sans:wght@300;400&display=swap');
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
      `}</style>
    </div>
  );
}
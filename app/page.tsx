"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User } from 'lucide-react';

type Screen = 'splash' | 'auth' | 'dashboard';

type FormData = { name: string; password: string };

type FormErrors = { name: string; password: string };

export default function KHStudioApp() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState<FormData>({ name: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({ name: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Array<any>>([]);
  const rafRef = useRef<number | null>(null);
  const tRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setScreen('auth'), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (starsRef.current.length === 0) {
        starsRef.current = Array.from({ length: 120 }, () => ({
          x: Math.random(),
          y: Math.random(),
          r: Math.random() * 1.4 + 0.2,
          o: Math.random() * 0.6 + 0.1,
          speed: Math.random() * 0.0004 + 0.0001,
          phase: Math.random() * Math.PI * 2,
        }));
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tRef.current += 0.016;
      for (const s of starsRef.current) {
        const opacity = s.o * (0.6 + 0.4 * Math.sin(tRef.current * s.speed * 100 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: formData.name.length < 2 ? '2文字以上で入力してください' : '',
      password: formData.password.length < 8 ? '8文字以上で入力してください' : '',
    };
    if (authMode === 'register' && formData.password) {
      const hasUpper = /[A-Z]/.test(formData.password);
      const hasNum = /\d/.test(formData.password);
      if (!hasUpper || !hasNum) newErrors.password = '大文字と数字を含めてください';
    }
    setErrors(newErrors);
    return !newErrors.name && !newErrors.password;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setScreen('dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold">KH STUDIO</h1>
              <p className="text-sm">Loading…</p>
            </div>
          </motion.div>
        )}

        {screen === 'auth' && (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 flex items-center justify-center min-h-screen p-6">
            <div className="w-full max-w-md bg-white/5 p-8 rounded-xl">
              <h2 className="text-2xl mb-4">{authMode === 'login' ? 'ログイン' : '登録'}</h2>
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="block text-xs mb-1">ユーザー名</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00e5ff]" />
                    <input className="w-full pl-10 py-2 rounded" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs mb-1">パスワード</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00e5ff]" />
                    <input type="password" className="w-full pl-10 py-2 rounded" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                <button type="submit" className="w-full py-2 bg-[#00e5ff] rounded text-black font-bold">{isLoading ? '処理中…' : authMode === 'login' ? 'ログイン' : '登録'}</button>
              </form>

              <div className="mt-4 text-center">
                <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-sm underline">
                  {authMode === 'login' ? 'アカウント作成' : 'ログインに戻る'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'dashboard' && (
          <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 p-8">
            <h2 className="text-2xl mb-4">ダッシュボード</h2>
            <p>ようこそ、{formData.name || 'ユーザー'} さん</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

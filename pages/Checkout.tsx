import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { PRICING } from '../constants';

export const Checkout = () => {
  const navigate = useNavigate();
  const { markPaid } = useTest();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate Webhook/Payment confirmation
  useEffect(() => {
    const checkPayment = setTimeout(() => {
      // Simulate receiving webhook
      setIsProcessing(true);
      setTimeout(() => {
        markPaid();
        navigate('/report');
      }, 2000);
    }, 8000); // Auto-approve after 8 seconds for MVP demo

    return () => clearTimeout(checkPayment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PRICING.pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-bold text-slate-800">Pagamento Confirmado!</h2>
        <p className="text-slate-500">Gerando seu relatório...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 p-4 border-b border-slate-200 text-center">
          <span className="text-slate-500 text-sm">Valor do Relatório</span>
          <div className="text-3xl font-bold text-slate-800">
            R$ {PRICING.amount.toFixed(2).replace('.', ',')}
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          <p className="text-sm font-medium text-slate-600 mb-6">
            Escaneie o QR Code abaixo com seu aplicativo de banco:
          </p>

          <div className="bg-white p-2 border-2 border-slate-100 rounded-xl mb-6 shadow-inner">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${PRICING.pixKey}`} 
              alt="QR Code Pix" 
              className="w-48 h-48"
            />
          </div>

          <div className="w-full mb-6">
            <p className="text-xs text-slate-400 mb-2 uppercase font-bold tracking-wide">Pix Copia e Cola</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value={PRICING.pixKey} 
                className="w-full bg-slate-100 text-slate-500 text-xs p-3 rounded-lg border border-slate-200 focus:outline-none"
              />
              <button 
                onClick={handleCopy}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                title="Copiar"
              >
                {copied ? (
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                )}
              </button>
            </div>
          </div>

          <div className="text-sm text-slate-500 flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Expira em: <span className="font-mono font-bold text-slate-700">{formatTime(timeLeft)}</span>
          </div>

          <p className="mt-8 text-xs text-slate-400">
            Após o pagamento, você será redirecionado automaticamente.
          </p>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { PRICING } from '../constants';

export const Checkout = () => {
  const navigate = useNavigate();
  const { markPaid } = useTest();
  const [timeLeft, setTimeLeft] = useState(900); // 15 min
  const [pixCode, setPixCode] = useState('');
  const [qrBase64, setQrBase64] = useState('');
  const [internalId, setInternalId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Gerar Pix ao carregar
  useEffect(() => {
    const createPix = async () => {
      try {
        const res = await fetch('/api/create-payment', { method: 'POST' });
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);

        setPixCode(data.qr_code);
        setQrBase64(data.qr_code_base64);
        setInternalId(data.internal_id);
        setLoading(false);
      } catch (err) {
        console.error(err);
        // Fallback para teste manual se a API falhar (MVP Mode)
        setPixCode(PRICING.pixKey); 
        setLoading(false);
        // setError('Erro ao gerar Pix. Tente novamente.');
      }
    };
    createPix();
  }, []);

  // 2. Polling para verificar pagamento
  useEffect(() => {
    if (!internalId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/check-status?id=${internalId}`);
        const data = await res.json();
        
        if (data.status === 'paid') {
          markPaid();
          navigate('/report');
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 5000); // Checa a cada 5s

    return () => clearInterval(interval);
  }, [internalId, markPaid, navigate]);

  // Timer visual
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    alert("Código Pix copiado!");
  };

  if (loading) return <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>;

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
          {error ? (
            <div className="text-red-500 mb-4">{error}</div>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-600 mb-6">
                Escaneie o QR Code abaixo com seu aplicativo de banco:
              </p>

              <div className="bg-white p-2 border-2 border-slate-100 rounded-xl mb-6 shadow-inner">
                {qrBase64 ? (
                  <img src={`data:image/jpeg;base64,${qrBase64}`} alt="QR Code Pix" className="w-48 h-48" />
                ) : (
                   <div className="w-48 h-48 bg-slate-100 flex items-center justify-center text-xs">QR Code Fixo</div>
                )}
              </div>

              <div className="w-full mb-6">
                <p className="text-xs text-slate-400 mb-2 uppercase font-bold tracking-wide">Pix Copia e Cola</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={pixCode} 
                    className="w-full bg-slate-100 text-slate-500 text-xs p-3 rounded-lg border border-slate-200 focus:outline-none"
                  />
                  <button 
                    onClick={handleCopy}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                  >
                    COPIAR
                  </button>
                </div>
              </div>

              <div className="text-sm text-slate-500 flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-100">
                 Expira em: <span className="font-mono font-bold text-slate-700">{formatTime(timeLeft)}</span>
              </div>
            </>
          )}

          <div className="mt-8 border-t pt-4 w-full">
             <button onClick={() => { markPaid(); navigate('/report'); }} className="text-xs text-gray-300 hover:text-gray-500">
               (Debug: Simular Pagamento Aprovado)
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
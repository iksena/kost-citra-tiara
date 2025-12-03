import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { role: 'user', content: input }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      // Call the API endpoint directly
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs }),
      });
      const data = await response.json() as { message?: string; error?: string; };
      const reply = data.message || data.error || 'Maaf, ada masalah.';
      setMessages([...newMsgs, { role: 'assistant', content: reply }]);
    } catch (e) {
      console.error(e);
      setMessages([...newMsgs, { role: 'assistant', content: 'Maaf, koneksi bermasalah.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-96"
          >
            <div className="bg-pink-600 p-4 text-white flex justify-between items-center">
              <span className="font-bold">Chat with Mbak Citra 🤖</span>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
              {messages.length === 0 && <p className="text-gray-400 text-sm text-center mt-10">Halo Kak! Mau tanya soal kamar kosong?</p>}
              {messages.map((m, i) => (
                <div key={i} className={`p-2 rounded-lg text-sm max-w-[80%] ${m.role === 'user' ? 'bg-pink-100 ml-auto text-pink-900' : 'bg-white border self-start'}`}>
                  {m.content}
                </div>
              ))}
              {loading && <div className="text-xs text-gray-400 italic">Typing...</div>}
            </div>
            <div className="p-3 border-t bg-white flex gap-2">
              <input 
                className="flex-1 bg-gray-100 rounded-full px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Tanya harga..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && void handleSend()}
              />
              <button onClick={() => void handleSend()} disabled={loading} className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}

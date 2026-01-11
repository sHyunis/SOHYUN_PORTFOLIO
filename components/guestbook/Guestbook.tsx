"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Message {
  id: number;
  name: string;
  content: string;
  created_at: string;
}

export function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from('guest_book')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setMessages(data);
    } catch {
    
      setMessages([
        { id: 0, name: "시스템", content: "Supabase 연결이 필요합니다!", created_at: new Date().toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('guest_book')
        .insert([{ name, content }]);

      if (error) throw error;
      
      await fetchMessages();
      setName("");
      setContent("");
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('메시지 전송에 실패했습니다. 연결을 확인해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-space-glow">방명록</h2>
      
      <form onSubmit={handleSubmit} className="mb-12 space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">이름</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="이름을 입력하세요"
            disabled={submitting}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">메시지</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors h-24 resize-none"
            placeholder="메시지를 남겨주세요..."
            disabled={submitting}
          />
        </div>
        <button 
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? "등록 중..." : "글 남기기"}
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-gray-500">메시지를 불러오는 중...</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-cyan-400">{msg.name}</span>
                <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-300">{msg.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface IMessage {
  id: number;
  name: string;
  content: string;
  created_at: string;
  reply_content?: number | null;
}

export function Guestbook() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

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
        .insert([{ name, content, reply_content: null }]);

      if (error) throw error;

      await fetchMessages();
      setName("");
      setContent("");
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('메시지 전송에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId: number) => {
    if (!replyContent.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('guest_book')
        .insert([{
          name: "정소현",
          content: replyContent,
          reply_content: parentId
        }]);

      if (error) throw error;

      await fetchMessages();
      setReplyContent("");
      setReplyingTo(null);
    } catch (error) {
      console.error('Error submitting reply:', error);
      alert('답글 전송에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdminLogin = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('password')
        .eq('id', 1)
        .single();

      if (error) throw error;

      if (data && adminPassword === data.password) {
        setIsAdmin(true);
        setShowAdminLogin(false);
        setAdminPassword("");
      } else {
        alert("비밀번호가 틀렸습니다.");
      }
    } catch {
      alert("인증에 실패했습니다.");
    }
  };

  const parentMessages = messages.filter(msg => !msg.reply_content);
  const getReplies = (parentId: number) =>
    messages.filter(msg => msg.reply_content === parentId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-space-glow">방명록</h2>
        {!isAdmin && (
          <button
            onClick={() => setShowAdminLogin(!showAdminLogin)}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            관리자
          </button>
        )}
        {isAdmin && (
          <span className="text-xs text-cyan-400">관리자 모드</span>
        )}
      </div>

      {showAdminLogin && !isAdmin && (
        <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex gap-2">
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && void handleAdminLogin()}
              className="flex-1 bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              placeholder="관리자 비밀번호"
            />
            <button
              onClick={handleAdminLogin}
              className="px-4 py-2 bg-cyan-600 text-white text-sm rounded-lg hover:bg-cyan-500 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

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
          parentMessages.map((msg) => (
            <div key={msg.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-cyan-400">{msg.name}</span>
                <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-300 mb-3">{msg.content}</p>

              {getReplies(msg.id).map((reply) => (
                <div key={reply.id} className="ml-4 mt-3 pl-4 border-l-2 border-purple-500/50">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-purple-400 text-sm">{reply.name}</span>
                    <span className="text-xs text-gray-500">{new Date(reply.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{reply.content}</p>
                </div>
              ))}

              {isAdmin && (
                <div className="mt-3">
                  {replyingTo === msg.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleReply(msg.id)}
                        className="flex-1 bg-black/50 border border-purple-500/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                        placeholder="답글 작성..."
                        disabled={submitting}
                        autoFocus
                      />
                      <button
                        onClick={() => handleReply(msg.id)}
                        disabled={submitting}
                        className="px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-500 transition-colors disabled:opacity-50"
                      >
                        등록
                      </button>
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent("");
                        }}
                        className="px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-500 transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyingTo(msg.id)}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      답글 달기
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

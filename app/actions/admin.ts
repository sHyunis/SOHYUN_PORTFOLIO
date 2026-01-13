"use server";

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Rate limiting: IP별 시도 횟수 추적
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15분

function checkRateLimit(identifier: string): { allowed: boolean; remainingTime?: number } {
  const now = Date.now();
  const attempts = loginAttempts.get(identifier);

  if (!attempts) {
    return { allowed: true };
  }

  // 잠금 시간이 지났으면 초기화
  if (now - attempts.lastAttempt > LOCKOUT_TIME) {
    loginAttempts.delete(identifier);
    return { allowed: true };
  }

  // 최대 시도 횟수 초과
  if (attempts.count >= MAX_ATTEMPTS) {
    const remainingTime = Math.ceil((LOCKOUT_TIME - (now - attempts.lastAttempt)) / 1000 / 60);
    return { allowed: false, remainingTime };
  }

  return { allowed: true };
}

function recordAttempt(identifier: string): void {
  const now = Date.now();
  const attempts = loginAttempts.get(identifier);

  if (!attempts) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now });
  } else {
    loginAttempts.set(identifier, { count: attempts.count + 1, lastAttempt: now });
  }
}

function resetAttempts(identifier: string): void {
  loginAttempts.delete(identifier);
}

export async function verifyAdminPassword(
  inputPassword: string,
  clientIdentifier?: string
): Promise<{ success: boolean; error?: string }> {
  const identifier = clientIdentifier || 'default';

  // Rate limit 체크
  const rateCheck = checkRateLimit(identifier);
  if (!rateCheck.allowed) {
    return {
      success: false,
      error: `너무 많은 시도입니다. ${rateCheck.remainingTime}분 후에 다시 시도해주세요.`
    };
  }

  try {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('password')
      .eq('id', 1)
      .single();

    if (error) {
      console.error("Supabase error in verifyAdminPassword:", error);
      return { success: false, error: "인증 오류가 발생했습니다." };
    }

    if (!data) {
      return { success: false, error: "설정을 찾을 수 없습니다." };
    }

    // bcrypt로 해시된 비밀번호 비교
    const isValid = await bcrypt.compare(inputPassword, data.password);

    if (isValid) {
      resetAttempts(identifier);
      return { success: true };
    }

    // 실패 시 시도 횟수 기록
    recordAttempt(identifier);
    const attempts = loginAttempts.get(identifier);
    const remaining = MAX_ATTEMPTS - (attempts?.count || 0);

    return {
      success: false,
      error: remaining > 0
        ? `비밀번호가 틀렸습니다. (${remaining}회 남음)`
        : "너무 많은 시도입니다. 15분 후에 다시 시도해주세요."
    };
  } catch (err) {
    console.error("Unknown error in verifyAdminPassword:", err);
    return { success: false, error: "인증 중 오류가 발생했습니다." };
  }
}

// 비밀번호 해시 생성 유틸리티 (DB에 저장할 해시 생성용)
export async function generatePasswordHash(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

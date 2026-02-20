

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const DEBUG_VERSION = "supabase-test-debug-v1";

export async function GET() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const urlTrimmed = rawUrl?.trim() ?? "";
  const keyTrimmed = rawKey?.trim() ?? "";
  const debug = {
    version: DEBUG_VERSION,
    url_defined: rawUrl !== undefined,
    url_length: rawUrl ? rawUrl.length : 0,
    url_trimmed_length: urlTrimmed.length,
    key_defined: rawKey !== undefined,
    key_length: rawKey ? rawKey.length : 0,
    key_trimmed_length: keyTrimmed.length
  };
  if (urlTrimmed.length === 0 || keyTrimmed.length === 0) {
    return NextResponse.json({ ok: false, error: 'Missing or invalid Supabase environment variables.', debug }, { status: 500 });
  }
  try {
    // Only create client after passing guard
    const supabase = createClient(urlTrimmed, keyTrimmed);
    const { data, error } = await supabase
      .from('albums')
      .select('id, title, artist')
      .limit(1)
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, sample: data, debug });
  } catch (err: unknown) {
    let message = 'Unknown error';
    if (err && typeof err === 'object' && 'message' in err && typeof (err as { message?: unknown }).message === 'string') {
      message = (err as { message: string }).message;
    } else if (typeof err === 'string') {
      message = err;
    }
    return NextResponse.json({ ok: false, error: message, debug }, { status: 500 });
  }
}

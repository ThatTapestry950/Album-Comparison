import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: 'Missing or invalid Supabase environment variables.' }, { status: 500 });
  }
  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from('albums')
      .select('id, title, artist')
      .limit(1)
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, sample: data });
  } catch (err: unknown) {
    let message = 'Unknown error';
    if (err && typeof err === 'object' && 'message' in err && typeof (err as { message?: unknown }).message === 'string') {
      message = (err as { message: string }).message;
    } else if (typeof err === 'string') {
      message = err;
    }
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

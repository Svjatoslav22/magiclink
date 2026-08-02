import { NextRequest, NextResponse } from 'next/server';

// POST - Верифікація токена email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }

    // TODO: Знайти токен в MongoDB та підтвердити email користувача
    // Поки що повертаємо успішну верифікацію
    return NextResponse.json({
      message: 'Email успішно підтверджено!',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка верифікації токена' }, { status: 500 });
  }
}
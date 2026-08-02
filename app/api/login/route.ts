import { NextRequest, NextResponse } from 'next/server';

// POST - Логін користувача
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email та пароль обов\'язкові' }, { status: 400 });
    }

    // TODO: Знайти користувача в MongoDB та перевірити пароль
    // Поки що повертаємо демо-дані
    return NextResponse.json({
      message: 'Вхід успішний',
      user: {
        id: '1',
        email: email,
        name: 'Користувач',
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка входу' }, { status: 500 });
  }
}
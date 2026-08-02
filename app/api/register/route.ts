import { NextRequest, NextResponse } from 'next/server';

// POST - Реєстрація нового користувача
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email та пароль обов\'язкові' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Пароль повинен містити мінімум 6 символів' }, { status: 400 });
    }

    // TODO: Створити користувача в MongoDB з хешованим паролем
    // Поки що повертаємо демо-дані
    return NextResponse.json({
      message: 'Реєстрація успішна',
      user: {
        id: Date.now().toString(),
        email: email,
        name: email.split('@')[0],
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка реєстрації' }, { status: 500 });
  }
}
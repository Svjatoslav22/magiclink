import { NextRequest, NextResponse } from 'next/server';

// GET - Отримати картки користувача
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'UserId required' }, { status: 400 });
    }

    // TODO: Отримати картки з MongoDB за userId
    // Поки що повертаємо порожній масив
    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: 'Помилка завантаження карток' }, { status: 500 });
  }
}

// POST - Створити нову картку
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, number, holder, expiry, balance, currency, color } = body;

    if (!userId || !type || !number || !holder) {
      return NextResponse.json({ error: 'Всі обов\'язкові поля повинні бути заповнені' }, { status: 400 });
    }

    // TODO: Створити картку в MongoDB
    const newCard = {
      _id: Date.now().toString(),
      userId,
      type,
      number,
      holder,
      expiry: expiry || '12/28',
      balance: balance || 0,
      currency: currency || 'UAH',
      color: color || 'linear-gradient(135deg, #1a3a1a, #0d260d)',
      isActive: true,
      createdAt: new Date(),
    };

    return NextResponse.json(newCard, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка створення картки' }, { status: 500 });
  }
}
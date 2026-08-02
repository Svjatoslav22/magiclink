import { NextRequest, NextResponse } from 'next/server';

// GET - Отримати транзакції користувача
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'UserId required' }, { status: 400 });
    }

    // TODO: Отримати транзакції з MongoDB за userId
    // Поки що повертаємо порожній об'єкт з порожніми масивами
    return NextResponse.json({
      transactions: [],
      incomeTotal: '0.00',
      expenseTotal: '0.00',
      count: 0,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка завантаження транзакцій' }, { status: 500 });
  }
}

// POST - Створити нову транзакцію
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, amount, type, category, icon, color } = body;

    if (!userId || !name || !amount || !type) {
      return NextResponse.json({ error: 'Всі обов\'язкові поля повинні бути заповнені' }, { status: 400 });
    }

    // TODO: Створити транзакцію в MongoDB
    const newTransaction = {
      _id: Date.now().toString(),
      userId,
      name,
      amount: amount.toString(),
      signedAmount: type === 'income' ? parseFloat(amount) : -parseFloat(amount),
      type,
      category: category || 'other',
      icon: icon || '💳',
      color: color || 'blue',
      date: new Date().toLocaleDateString('uk-UA', { 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      createdAt: new Date(),
    };

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка створення транзакції' }, { status: 500 });
  }
}
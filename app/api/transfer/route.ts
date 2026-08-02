import { NextRequest, NextResponse } from 'next/server';

// POST - Виконати переказ коштів
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, cardNumber, name, amount, purpose } = body;

    if (!userId || !cardNumber || !name || !amount) {
      return NextResponse.json({ error: 'Всі обов\'язкові поля повинні бути заповнені' }, { status: 400 });
    }

    // TODO: Створити транзакцію переказу в MongoDB
    const transfer = {
      _id: Date.now().toString(),
      userId,
      cardNumber,
      name,
      amount: amount.toString(),
      purpose: purpose || '',
      type: 'transfer',
      category: 'transfer',
      icon: '💸',
      color: 'orange',
      date: new Date().toLocaleDateString('uk-UA', { 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      createdAt: new Date(),
    };

    return NextResponse.json(transfer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка виконання переказу' }, { status: 500 });
  }
}
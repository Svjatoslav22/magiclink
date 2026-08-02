import { NextRequest, NextResponse } from 'next/server';

// GET - Отримати профіль користувача
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'UserId required' }, { status: 400 });
    }

    // TODO: Отримати профіль з MongoDB за userId
    // Поки що повертаємо порожній об'єкт
    return NextResponse.json({
      name: '',
      email: '',
      phone: '',
      address: '',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка завантаження профілю' }, { status: 500 });
  }
}

// PUT - Оновити профіль користувача
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, email, phone, address } = body;

    if (!userId) {
      return NextResponse.json({ error: 'UserId required' }, { status: 400 });
    }

    // TODO: Оновити профіль в MongoDB
    const updatedProfile = {
      userId,
      name: name || '',
      email: email || '',
      phone: phone || '',
      address: address || '',
      updatedAt: new Date(),
    };

    return NextResponse.json(updatedProfile);
  } catch (error) {
    return NextResponse.json({ error: 'Помилка оновлення профілю' }, { status: 500 });
  }
}
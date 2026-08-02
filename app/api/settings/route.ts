import { NextRequest, NextResponse } from 'next/server';

// GET - Отримати налаштування користувача
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'UserId required' }, { status: 400 });
    }

    // TODO: Отримати налаштування з MongoDB за userId
    // Поки що повертаємо демо-дані
    return NextResponse.json({
      profile: {
        name: 'Користувач',
        email: 'user@example.com',
        phone: '+380 00 000 0000',
        birthDate: '01.01.1990',
      },
      security: {
        twoFactor: false,
        pinActive: false,
        biometrics: false,
      },
      notifications: {
        push: true,
        sms: true,
        email: true,
        operations: true,
      },
      limits: {
        dailyTransfer: 50000,
        singleTransfer: 20000,
        cashWithdrawal: 10000,
        onlinePurchase: 50000,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка завантаження налаштувань' }, { status: 500 });
  }
}

// PUT - Оновити налаштування користувача
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, profile, security, notifications, limits } = body;

    if (!userId) {
      return NextResponse.json({ error: 'UserId required' }, { status: 400 });
    }

    // TODO: Оновити налаштування в MongoDB
    // Поки що повертаємо оновлені дані
    return NextResponse.json({
      profile: profile || {},
      security: security || {},
      notifications: notifications || {},
      limits: limits || {},
    });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка оновлення налаштувань' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';

// GET - Отримати всі дані для дашборду
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'UserId required' }, { status: 400 });
    }

    // TODO: Отримати всі дані з MongoDB за userId
    // Поки що повертаємо порожні дані
    return NextResponse.json({
      totalBalance: '0.00',
      totalBalanceRaw: 0,
      cardsCount: 0,
      transactions: [],
      profile: null,
      exchangeRates: [
        { pair: 'USD/UAH', rate: '41.25', change: '+0.50', direction: 'up' },
        { pair: 'EUR/UAH', rate: '45.10', change: '-0.25', direction: 'down' },
        { pair: 'PLN/UAH', rate: '10.50', change: '+0.10', direction: 'up' },
      ],
    });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка завантаження дашборду' }, { status: 500 });
  }
}
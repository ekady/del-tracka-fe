import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      message: 'Sucess',
      data: null,
    },
    {
      status: 200,
    },
  );
}

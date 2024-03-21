import { getServerSession } from 'next-auth';

import axios, { AxiosError } from 'axios';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { IErrorResponse } from '@/common/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL_V1;

async function handler(req: Request) {
  const { method, url: reqUrl, headers } = req;

  const session = await getServerSession(authOptions);
  const accessToken = session?.user.userToken.accessToken ?? null;

  const urlPath = reqUrl?.split('/api/')?.[1];
  const url = `${apiUrl}/${urlPath}`;

  let body;

  try {
    body = await req.formData();
  } catch {
    //
  }

  try {
    body = await req.json();
  } catch {
    //
  }

  try {
    const {
      data,
      headers: responseHeaders,
      status,
    } = await axios<ArrayBuffer>({
      url,
      method,
      data: body,
      headers: {
        'Content-Type': headers.get('content-type'),
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: 'arraybuffer',
    });

    return new Response(data, {
      status,
      headers: { 'Content-Type': responseHeaders['content-type'] },
    });
  } catch (err) {
    const error = err as AxiosError<ArrayBuffer>;
    const errorParsed: IErrorResponse = error.response?.data
      ? JSON.parse(new TextDecoder().decode(error.response.data))
      : {
          data: null,
          errors: [{ errorType: 'INTERNAL_SERVER_ERROR', message: 'Internal Server Error' }],
          statusCode: 500,
        };
    const errorResponse = Buffer.from(JSON.stringify(errorParsed));

    return new Response(errorResponse, { status: errorParsed.statusCode });
  }
}

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}

export async function PUT(request: Request) {
  return handler(request);
}

export async function DELETE(request: Request) {
  return handler(request);
}

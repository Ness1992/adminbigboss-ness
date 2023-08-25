import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("L'identifiant de couleur est requis", { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId
      }
    });
  
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET]', error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Non authentifié", { status: 403 });
    }

    if (!params.colorId) {
      return new NextResponse("L'identifiant de couleur est requis", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Accès non autorisé", { status: 405 });
    }

    const color = await prismadb.color.delete({
      where: {
        id: params.colorId
      }
    });
  
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { colorId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Non authentifié" , { status: 403 });
    }

    if (!name) {
      return new NextResponse("Le champ du nom est obligatoire", { status: 400 });
    }

    if (!value) {
      return new NextResponse("La valeur est obligatoire", { status: 400 });
    }


    if (!params.colorId) {
      return new NextResponse("L'identifiant de couleur est requis", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("accès non autorisé", { status: 405 });
    }

    const color = await prismadb.color.update({
      where: {
        id: params.colorId
      },
      data: {
        name,
        value
      }
    });
  
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);
    return new NextResponse("erreur interne", { status: 500 });
  }
};
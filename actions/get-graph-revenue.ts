import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (storeId: string): Promise<GraphData[]> => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  // Regroupement des commandes par mois et somme des revenus
  for (const order of paidOrders) {
    const month = order.createdAt.getMonth(); // 0 pour janvier, 1 pour février, ...
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    // Ajout des revenus de cette commande au mois correspondant
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Conversion des données regroupées dans le format attendu par le graphique
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Fév", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Avr", total: 0 },
    { name: "Mai", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aoû", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Déc", total: 0 },
  ];

  // Remplissage des données de revenus
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
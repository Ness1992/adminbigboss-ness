import prismadb from "@/lib/prismadb";

// Fonction qui calcule le revenu total d'un magasin spécifié
export const getTotalRevenue = async (storeId: string) => {
  // Récupération de toutes les commandes payées pour le magasin spécifié
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId, // Filtre sur le champ storeId pour obtenir les commandes spécifiques à un magasin
      isPaid: true // Filtre pour obtenir seulement les commandes payées
    },
    include: {
      orderItems: {
        include: {
          product: true // Inclusion des informations sur les produits liés à chaque commande
        }
      }
    }
  });

  // Calcul du revenu total en additionnant les prix de chaque produit dans chaque commande
  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber(); // Addition du prix du produit au total de la commande
    }, 0);

    return total + orderTotal; // Addition du total de la commande au revenu total
  }, 0);

  return totalRevenue; // Retourne le revenu total du magasin
};
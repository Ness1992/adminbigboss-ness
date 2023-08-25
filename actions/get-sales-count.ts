import prismadb from "@/lib/prismadb";

// Fonction qui récupère le nombre de ventes d'un magasin à partir de la base de données
export const getSalesCount = async (storeId: string) => {
  // Récupération du nombre de ventes en utilisant la méthode "count" de la table "order"
  const salesCount = await prismadb.order.count({
    where: {
      storeId, // Filtre sur le champ storeId pour obtenir les ventes spécifiques à un magasin
      isPaid: true // Filtre sur le statut "payé" des commandes
    },
  });

  return salesCount; // Retourne le nombre de ventes
};
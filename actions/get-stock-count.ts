import prismadb from "@/lib/prismadb";

// Fonction qui récupère le nombre de produits en stock pour un magasin spécifié
export const getStockCount = async (storeId: string) => {
  // Récupération du nombre de produits en utilisant la méthode "count" de la table "product"
  const stockCount = await prismadb.product.count({
    where: {
      storeId, // Filtre sur le champ storeId pour obtenir les produits spécifiques à un magasin
      isArchived: false, // Filtre pour exclure les produits archivés
    },
  });

  return stockCount; // Retourne le nombre de produits en stock
};
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import prismadb from "@/lib/prismadb";
import { CategoryClient } from "./components/client";
import { CategoryColmn } from "./components/columns";

const CategoriesPage = async ({ params }: { params:{ storeId: string } }) => {
  
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include:{
          billboard: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedcategories: CategoryColmn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "d MMMM yyyy", { locale: fr }) // Utiliser le format sans les ordinaux mais avec l'année
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedcategories}/>
      </div>
    </div>
  );
};

export default CategoriesPage;
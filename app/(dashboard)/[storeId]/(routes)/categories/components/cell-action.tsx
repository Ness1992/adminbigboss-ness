"use client";

import { 
    DropdownMenu,
    DropdownMenuContent, 
    DropdownMenuItem,
    DropdownMenuLabel, 
    DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { CategoryColmn } from "./columns";


interface CellActionProps{
    data:CategoryColmn;
}


export const CellAction: React.FC<CellActionProps> = ({
    data
})=>{
    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Identifiant copié dans le presse-papiers.');
      };

      const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
          router.refresh();
          
          toast.success('Catégorie supprimée.');
        } catch (error: any) {
          toast.error("Assurez-vous d'avoir supprimé tous les produits qui utilisent cette Catégorie en premier.");
        } finally {
          setLoading(false);
          setOpen(false);
        }
      }

    
    return(
        <>
        <AlertModal
          isOpen = {open}
          onClose={()=> setOpen(false)}
          onConfirm={onDelete}
          loading={loading}
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Menu
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={()=> onCopy(data.id)}>
                    <Copy className="mr-2é h-4 w-4"/>
                    Copier l&apos;identifiant
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=> router.push(`/${params.storeId}/categories/${data.id}`)}>
                    <Edit className="mr-2é h-4 w-4"/>
                    Mettre à jour
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="mr-2é h-4 w-4"/>
                    Supprimer
                </DropdownMenuItem>
                

            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
};
import { SignUp } from "@clerk/nextjs";

// Page qui affiche le formulaire d'inscription
export default function Page() {
  return <SignUp />; // Affiche le composant SignUp de Clerk pour le formulaire d'inscription
}
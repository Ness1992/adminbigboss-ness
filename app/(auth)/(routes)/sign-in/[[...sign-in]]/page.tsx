import { SignIn } from "@clerk/nextjs";

// Page qui affiche le formulaire de connexion
export default function Page() {
  return <SignIn />; // Affiche le composant SignIn de Clerk pour le formulaire de connexion
}
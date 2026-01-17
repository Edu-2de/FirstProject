import { prisma } from "@/lib/db";
import MoodBoard from "@/components/MoodBoard"; // Importamos o visual que criamos

export default async function Home() {
  // 1. Busca os dados no servidor (Server Side)
  const entries = await prisma.moodEntry.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Entrega os dados para o componente visual (Client Side)
  return <MoodBoard initialEntries={entries} />;
}

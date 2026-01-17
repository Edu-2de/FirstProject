import { prisma } from "@/lib/db";
import JournalContainer from "@/components/journal/JournalContainer"; 

export default async function Home() {
  // 1. Busca os dados no servidor (Server Side)
  const entries = await prisma.moodEntry.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Entrega os dados para o novo container organizado
  return <JournalContainer initialEntries={entries} />;
}

"use client"; // 👈 Isso avisa o Next.js que aqui teremos interatividade (State)

import { useState } from "react";
import { createMoodEntry } from "@/app/actions"; // Importamos sua lógica de salvar
import Image from "next/image"; // Componente otimizado de imagem do Next

// Aqui estão as cores exatas do seu style.css antigo!
const MOODS = {
  happy: {
    label: "Happy",
    gradient:
      "linear-gradient(133deg, rgba(255,250,151,1) 0%, rgba(246,224,71,1) 37%, rgba(242,151,23,1) 100%)",
    textColor: "black", // Texto escuro fica melhor no amarelo
  },
  sad: {
    label: "Sad",
    gradient:
      "linear-gradient(52deg, rgba(171,194,255,1) 0%, rgba(71,127,246,1) 37%, rgba(20,44,162,1) 100%)",
    textColor: "white",
  },
  angry: {
    label: "Angry",
    gradient:
      "radial-gradient(circle, rgba(255,116,116,1) 0%, rgba(255,110,88,1) 47%, rgba(255,55,0,1) 100%)",
    textColor: "white",
  },
  afraid: {
    label: "Afraid",
    gradient:
      "linear-gradient(300deg, rgb(114, 44, 161) 0%, rgba(158,93,254,1) 58%, rgb(204, 161, 255) 100%)",
    textColor: "white",
  },
};

// Definimos o tipo dos dados que vêm do banco
type Entry = {
  id: string;
  mood: string;
  content: string;
  createdAt: Date;
};

export default function MoodBoard({
  initialEntries,
}: {
  initialEntries: Entry[];
}) {
  // O Estado: Qual humor está selecionado? (null = nenhum, mostra o menu)
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // O Design Principal (Fundo verde do seu CSS original)
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden transition-all duration-700"
      style={{
        background: selectedMood
          ? MOODS[selectedMood as keyof typeof MOODS].gradient // Se selecionado, usa a cor do humor
          : "linear-gradient(287.56deg, #d5ff73 0%, #d9fd83 35%, #a0fdb4 95%)", // Senão, usa o fundo original
      }}
    >
      {/* SE NENHUM HUMOR ESTIVER SELECIONADO: MOSTRA O MENU DE BOLINHAS */}
      {!selectedMood && (
        <>
          <h1 className="text-3xl font-bold mb-10 text-gray-800 z-10">
            How are you feeling?
          </h1>

          <div className="grid grid-cols-2 gap-8 z-10">
            {Object.entries(MOODS).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedMood(key)}
                className="w-32 h-32 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                style={{ background: value.gradient }}
              >
                <span className="font-bold text-lg text-white drop-shadow-md opacity-0 hover:opacity-100 transition-opacity">
                  {value.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* SE UM HUMOR ESTIVER SELECIONADO: MOSTRA O FORMULÁRIO */}
      {selectedMood && (
        <div className="z-20 w-full max-w-2xl p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
          {/* Botão de Voltar (Seta) */}
          <button
            onClick={() => setSelectedMood(null)}
            className="mb-6 hover:-translate-x-2 transition-transform"
          >
            {/* Certifique-se de ter a imagem arrow.png na pasta public! */}
            <span className="text-4xl">⬅️</span>
          </button>

          <h2
            className="text-4xl font-bold mb-6"
            style={{ color: selectedMood === "happy" ? "#d97706" : "#3b82f6" }}
          >
            I am {MOODS[selectedMood as keyof typeof MOODS].label}...
          </h2>

          <form action={createMoodEntry} className="flex flex-col gap-4">
            {/* Escondemos o input do mood, pois já sabemos qual é pelo estado */}
            <input type="hidden" name="mood" value={selectedMood} />

            <textarea
              name="content"
              placeholder="Why do you feel this way?"
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none text-lg h-40 resize-none bg-white/50"
              required
            />

            <button
              type="submit"
              className="py-3 px-6 rounded-xl font-bold text-white shadow-lg transform active:scale-95 transition-all"
              style={{ background: "black" }}
            >
              Save to Diary
            </button>
          </form>

          {/* Histórico rápido deste humor */}
          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-bold mb-4 text-gray-600">
              Past {selectedMood} moments:
            </h3>
            <div className="max-h-40 overflow-y-auto space-y-3">
              {initialEntries
                .filter((entry) => entry.mood === selectedMood)
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3 bg-white rounded-lg shadow-sm text-sm"
                  >
                    <p className="text-gray-800">{entry.content}</p>
                    <span className="text-xs text-gray-400">
                      {entry.createdAt.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

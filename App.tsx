
import React, { useState } from 'react';
import { CardData } from './types';
import Editor from './components/Editor';
import BusinessCard from './components/BusinessCard';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [data, setData] = useState<CardData>({
    name: 'Ing. Peter Novák',
    title: 'Projektový Manažér',
    company: 'PVA Solutions s.r.o.',
    phone: '+421 900 000 000',
    email: 'novak@pva.sk',
    website: 'www.pva.sk',
    address: 'Mlynské Nivy 1, 811 09 Bratislava',
    // Predvolené logo (používateľ nahrá svoje v Editore)
    logoUrl: 'https://i.ibb.co/Lz0D6V6/pva-logo.png', 
    primaryColor: '#e63f14', // Presná farba podľa požiadavky
    secondaryColor: '#70737a', // Sivá ladiaca s logom
    template: 'modern'
  });

  const [aiMotto, setAiMotto] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateMotto = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Vygeneruj krátke a úderné profesionálne motto (max 5 slov) pre firmu s názvom "${data.company}" a osobu s pozíciou "${data.title}". Odpovedaj len textom motta v slovenčine.`
      });
      setAiMotto(response.text?.trim() || '');
    } catch (error) {
      console.error("Error generating motto:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center justify-center gap-3">
            <span style={{ backgroundColor: data.primaryColor }} className="text-white p-2 rounded-lg shadow-lg">PVA</span>
            Vizitka Majster
          </h1>
          <p className="mt-2 text-lg text-gray-600">Profesionálna vizitka presne podľa vašej firemnej identity.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Editor údajov</h2>
              <button 
                onClick={generateMotto}
                disabled={isGenerating}
                className="text-sm font-medium flex items-center gap-1 transition-colors"
                style={{ color: data.primaryColor }}
              >
                <i className={`fas fa-magic ${isGenerating ? 'animate-spin' : ''}`}></i>
                AI Motto
              </button>
            </div>
            <div className="p-6">
              <Editor data={data} onChange={setData} />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 sticky top-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Náhľad (90x50mm)</h2>
                <button 
                  onClick={handlePrint}
                  className="bg-gray-800 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition-all flex items-center gap-2 shadow-md"
                >
                  <i className="fas fa-print"></i>
                  Vytlačiť
                </button>
              </div>

              <div className="flex flex-col items-center gap-10">
                <div className="flex flex-col gap-2 w-full max-w-[500px]">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Predná strana</span>
                  <div className="print-area shadow-2xl transition-all duration-300">
                    <BusinessCard data={data} side="front" motto={aiMotto} />
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full max-w-[500px]">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Zadná strana</span>
                  <div className="shadow-2xl transition-all duration-300">
                    <BusinessCard data={data} side="back" />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800 flex gap-2 items-start">
                  <i className="fas fa-info-circle mt-0.5"></i>
                  <span><b>Tlačová príprava:</b> Vizitka má štandardný rozmer 90x50mm. Pri exporte do PDF/Tlači nastavte 100% mierku.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

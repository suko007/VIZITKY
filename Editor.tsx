
import React from 'react';
import { CardData } from '../types';

interface EditorProps {
  data: CardData;
  onChange: (data: CardData) => void;
}

const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleColorChange = (name: string, value: string) => {
    onChange({ ...data, [name]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Šablóna dizajnu</label>
          <select 
            name="template" 
            value={data.template} 
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 outline-none"
            style={{ borderColor: data.primaryColor + '44' }}
          >
            <option value="modern">Moderná (PVA Exclusive)</option>
            <option value="minimalist">Minimalistická</option>
            <option value="classic">Klasická centrovaná</option>
            <option value="sidebar">S farebným pruhom</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Firemné logo</label>
          <div className="flex items-center gap-4">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden" 
              id="logo-upload"
            />
            <label 
              htmlFor="logo-upload"
              className="flex-1 cursor-pointer bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-rose-500 transition-colors"
            >
              <i className="fas fa-upload text-gray-400 mr-2"></i>
              <span className="text-sm text-gray-600">Kliknite pre nahranie loga</span>
            </label>
            {data.logoUrl && (
              <div className="w-12 h-12 rounded border p-1 bg-white">
                <img src={data.logoUrl} className="w-full h-full object-contain" alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Celé meno a tituly</label>
          <input 
            type="text" 
            name="name" 
            value={data.name} 
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 outline-none"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Pracovná pozícia</label>
          <input 
            type="text" 
            name="title" 
            value={data.title} 
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 outline-none"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Názov spoločnosti</label>
          <input 
            type="text" 
            name="company" 
            value={data.company} 
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 outline-none"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Telefón</label>
          <input 
            type="text" 
            name="phone" 
            value={data.phone} 
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 outline-none"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
          <input 
            type="email" 
            name="email" 
            value={data.email} 
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Webová stránka</label>
          <input 
            type="text" 
            name="website" 
            value={data.website} 
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Adresa sídla</label>
          <input 
            type="text" 
            name="address" 
            value={data.address} 
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 outline-none"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Hlavná farba (Brand)</label>
          <div className="flex gap-2 items-center">
            <input 
              type="color" 
              value={data.primaryColor} 
              onChange={(e) => handleColorChange('primaryColor', e.target.value)}
              className="w-10 h-10 border-none cursor-pointer p-0 bg-transparent"
            />
            <span className="text-xs font-mono text-gray-500 uppercase">{data.primaryColor}</span>
          </div>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Sekundárna farba</label>
          <div className="flex gap-2 items-center">
            <input 
              type="color" 
              value={data.secondaryColor} 
              onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
              className="w-10 h-10 border-none cursor-pointer p-0 bg-transparent"
            />
            <span className="text-xs font-mono text-gray-500 uppercase">{data.secondaryColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Editor() {
  return <div>Editor</div>;
'use client'

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Service {
  id: number;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
  bgColor: string;
  detailKeys?: string[];
}

const Services: React.FC = () => {
  const { t } = useLanguage();
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services: Service[] = [
    {
      id: 1,
      titleKey: "obras",
      descriptionKey: "obrasDesc",
      icon: "🏗️",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      detailKeys: [
        "obrasDetalle1",
        "obrasDetalle2",
        "obrasDetalle3",
        "obrasDetalle4",
        "obrasDetalle5",
        "obrasDetalle6",
        "obrasDetalle7",
        "obrasDetalle8",
        "obrasDetalle9",
        "obrasDetalle10"
      ]
    },
    {
      id: 2,
      titleKey: "pintura",
      descriptionKey: "pinturaDesc",
      icon: "🎨",
      color: "text-green-700",
      bgColor: "bg-green-100",
      detailKeys: [
        "pinturaDetalle1",
        "pinturaDetalle2",
        "pinturaDetalle3",
        "pinturaDetalle4",
        "pinturaDetalle5",
        "pinturaDetalle6",
        "pinturaDetalle7",
        "pinturaDetalle8",
        "pinturaDetalle9",
        "pinturaDetalle10",
        "pinturaDetalle11",
        "pinturaDetalle12",
        "pinturaDetalle13",
        "pinturaDetalle14",
        "pinturaDetalle15"
      ]
    },
    {
      id: 3,
      titleKey: "pavimentos",
      descriptionKey: "pavimentosDesc",
      icon: "🏠",
      color: "text-yellow-700",
      bgColor: "bg-yellow-100",
      detailKeys: [
        "pavimentosDetalle1",
        "pavimentosDetalle2",
        "pavimentosDetalle3",
        "pavimentosDetalle4",
        "pavimentosDetalle5",
        "pavimentosDetalle6",
        "pavimentosDetalle7",
        "pavimentosDetalle8",
        "pavimentosDetalle9",
        "pavimentosDetalle10",
        "pavimentosDetalle11",
        "pavimentosDetalle12",
        "pavimentosDetalle13",
        "pavimentosDetalle14",
        "pavimentosDetalle15",
        "pavimentosDetalle16",
        "pavimentosDetalle17",
        "pavimentosDetalle18",
        "pavimentosDetalle19",
        "pavimentosDetalle20",
        "pavimentosDetalle21",
        "pavimentosDetalle22",
        "pavimentosDetalle23",
        "pavimentosDetalle24",
        "pavimentosDetalle25",
        "pavimentosDetalle26",
        "pavimentosDetalle27",
        "pavimentosDetalle28",
        "pavimentosDetalle29"
      ]
    },
    {
      id: 4,
      titleKey: "aislamiento",
      descriptionKey: "aislamientoDesc",
      icon: "🧱",
      color: "text-purple-700",
      bgColor: "bg-purple-100",
      detailKeys: [
        "aislamientoDetalle1",
        "aislamientoDetalle2",
        "aislamientoDetalle3",
        "aislamientoDetalle4",
        "aislamientoDetalle5",
        "aislamientoDetalle6",
        "aislamientoDetalle7",
        "aislamientoDetalle8",
        "aislamientoDetalle9",
        "aislamientoDetalle10"
      ]
    },
    {
      id: 5,
      titleKey: "electricas",
      descriptionKey: "electricasDesc",
      icon: "⚡",
      color: "text-orange-700",
      bgColor: "bg-orange-100",
      detailKeys: [
        "electricasDetalle1",
        "electricasDetalle2",
        "electricasDetalle3",
        "electricasDetalle4",
        "electricasDetalle5"
      ]
    },
    {
      id: 6,
      titleKey: "termicas",
      descriptionKey: "termicasDesc",
      icon: "🔥",
      color: "text-red-700",
      bgColor: "bg-red-100",
      detailKeys: [
        "termicasDetalle1",
        "termicasDetalle2",
        "termicasDetalle3",
        "termicasDetalle4",
        "termicasDetalle5",
        "termicasDetalle6",
        "termicasDetalle7",
        "termicasDetalle8",
        "termicasDetalle9",
        "termicasDetalle10",
        "termicasDetalle11",
        "termicasDetalle12",
        "termicasDetalle13",
        "termicasDetalle14",
        "termicasDetalle15",
        "termicasDetalle16",
        "termicasDetalle17",
        "termicasDetalle18",
        "termicasDetalle19"
      ]
    }
  ];

  const toggleService = (serviceId: number) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const getServiceColor = (serviceId: number) => {
    switch (serviceId) {
      case 1: return 'blue'; // Obras y Demoliciones
      case 2: return 'green'; // Pintura y Acabados
      case 3: return 'yellow'; // Obras de colocacion de paredes y pisos
      case 4: return 'purple'; // Aislamiento y Rigips
      case 5: return 'orange'; // Instalaciones Eléctricas
      case 6: return 'red'; // Instalaciones Térmicas
      default: return 'orange';
    }
  };

  return (
    <section id="services" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('serviciosHeader')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('serviciosDesc')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const serviceColor = getServiceColor(service.id);
            const colorClasses = {
              blue: {
                ring: 'ring-blue-300',
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                text: 'text-blue-800',
                detailText: 'text-blue-700',
                bullet: 'text-blue-500'
              },
              green: {
                ring: 'ring-green-300',
                bg: 'bg-green-50',
                border: 'border-green-200',
                text: 'text-green-800',
                detailText: 'text-green-700',
                bullet: 'text-green-500'
              },
              yellow: {
                ring: 'ring-yellow-300',
                bg: 'bg-yellow-50',
                border: 'border-yellow-200',
                text: 'text-yellow-800',
                detailText: 'text-yellow-700',
                bullet: 'text-yellow-500'
              },
              purple: {
                ring: 'ring-purple-300',
                bg: 'bg-purple-50',
                border: 'border-purple-200',
                text: 'text-purple-800',
                detailText: 'text-purple-700',
                bullet: 'text-purple-500'
              },
              orange: {
                ring: 'ring-orange-300',
                bg: 'bg-orange-50',
                border: 'border-orange-200',
                text: 'text-orange-800',
                detailText: 'text-orange-700',
                bullet: 'text-orange-500'
              },
              red: {
                ring: 'ring-red-300',
                bg: 'bg-red-50',
                border: 'border-red-200',
                text: 'text-red-800',
                detailText: 'text-red-700',
                bullet: 'text-red-500'
              }
            };

            return (
              <div
                key={service.id}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  expandedService === service.id ? `ring-2 ${colorClasses[serviceColor].ring}` : ''
                }`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <span className="text-2xl">{service.icon}</span>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(service.descriptionKey)}
                  </p>
                </div>

                {/* Expanded Details */}
                {expandedService === service.id && service.detailKeys && (
                  <div className={`mt-4 p-4 rounded-lg border ${colorClasses[serviceColor].bg} ${colorClasses[serviceColor].border}`}>
                    <h4 className={`font-semibold mb-3 text-center ${colorClasses[serviceColor].text}`}>
                      {t('serviciosIncluidos')}
                    </h4>
                    <ul className="space-y-2">
                      {service.detailKeys.map((detailKey, index) => (
                        <li key={index} className={`flex items-start space-x-2 text-sm ${colorClasses[serviceColor].detailText}`}>
                          <span className={`mt-1 ${colorClasses[serviceColor].bullet}`}>•</span>
                          <span>{t(detailKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Learn More Button */}
                <div className="mt-6 text-center">
                  {service.detailKeys ? (
                    <button 
                      onClick={() => toggleService(service.id)}
                      className={`inline-flex items-center text-sm font-medium ${service.color} hover:underline transition-all duration-200`}
                    >
                      {expandedService === service.id ? t('verMenos') : t('saberMas')}
                      <svg 
                        className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                          expandedService === service.id ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <button className={`inline-flex items-center text-sm font-medium ${service.color} hover:underline`}>
                      {t('saberMas')}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('presupuestoPersonalizado')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('contactaParaEvaluacion')}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-3 bg-construction-blue text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('ctaPresupuesto')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 
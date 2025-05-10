import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronRight, Clock, ArrowUpRight } from 'lucide-react';

export const NewsCard = ({ item, index }) => {
    // Create staggered animation effect based on index
    const animationDelay = `${index * 0.1}s`;

    return (
        <div
            className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 mb-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500"
            style={{
                animation: `fadeInUp 0.6s ease-out forwards`,
                animationDelay,
                opacity: 0
            }}
        >
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold mb-3 text-indigo-800 hover:text-indigo-600 transition-colors duration-300 flex-grow pr-4">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center">
                        {item.title}
                        <ArrowUpRight className="w-4 h-4 ml-1 inline-block" />
                    </a>
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center whitespace-nowrap">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(item.isoDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </span>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{item.content}</p>

            {item.fullContent && (
                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 mt-3 border border-blue-100">
                    <p className="text-gray-600 line-clamp-3 leading-relaxed italic">{item.fullContent}</p>
                </div>
            )}

            <div className="mt-5 flex justify-end">
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Read full article
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </a>
            </div>
        </div>
    );
};
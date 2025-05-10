import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Newspaper, AlertCircle, Clock, RefreshCw, ArrowUpRightFromCircle, Shield } from 'lucide-react';

// News card component with enhanced animations and styling
const NewsCard = ({ item, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md p-6 mb-6 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl relative overflow-hidden"
            style={{
                animationDelay: `${index * 150}ms`,
                animation: 'slideIn 0.7s ease-out forwards',
                opacity: 0
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 opacity-10 rounded-bl-full" />

            <div className="flex items-start gap-4 relative z-10">
                <div className="hidden sm:flex sm:items-center sm:justify-center sm:h-12 sm:w-12 sm:rounded-full sm:bg-gradient-to-r sm:from-blue-600 sm:to-indigo-600 sm:text-white sm:shadow-md">
                    <Newspaper size={20} />
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-indigo-900 line-clamp-2 group">
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors duration-300 flex items-start"
                        >
                            {item.title}
                            <ArrowUpRightFromCircle
                                size={16}
                                className={`ml-2 mt-1 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                            />
                        </a>
                    </h3>
                    <p className="text-gray-600 mb-4 flex items-center text-sm">
                        <Clock size={14} className="mr-2 inline text-blue-500" />
                        {new Date(item.isoDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                    <p className="text-gray-800 mb-4 leading-relaxed">{item.content}</p>
                    {item.fullContent && (
                        <div className="border-t border-blue-100 pt-3 mt-3 relative">
                            <div className="absolute left-0 top-0 w-1/3 h-px bg-gradient-to-r from-blue-400 to-transparent" />
                            <p className="text-gray-700 line-clamp-3 leading-relaxed">{item.fullContent}</p>
                        </div>
                    )}
                    <div className="mt-4 flex justify-between items-center">
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm transition-all duration-300 hover:shadow-md hover:from-blue-700 hover:to-indigo-700"
                        >
                            Read article
                            <ChevronRight
                                size={16}
                                className={`ml-1 transition-transform duration-500 ${isHovered ? 'translate-x-1' : ''}`}
                            />
                        </a>

                        <div className="text-xs text-gray-500 italic">
                            {item.source && `Source: ${item.source}`}
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated bottom border on hover */}
            <div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-700 ease-in-out"
                style={{ width: isHovered ? '100%' : '0%' }}
            />
        </div>
    );
};

// Enhanced empty state component
const EmptyState = () => (
    <div className="text-center py-16 bg-gradient-to-b from-gray-50 to-blue-50 rounded-xl border border-dashed border-blue-200 shadow-inner">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
            <AlertCircle size={32} className="text-blue-500" />
        </div>
        <h3 className="text-2xl font-medium text-indigo-900 mb-3">No news articles found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
            There are currently no news articles available. Please check back later.
        </p>
    </div>
);

// Enhanced loading spinner component with animation
const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center my-12 py-8">
        <div className="relative">
            <div className="w-16 h-16 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
                <RefreshCw size={20} className="text-blue-600 animate-pulse" />
            </div>
        </div>
        <p className="text-indigo-800 font-medium mt-4 animate-pulse">Loading articles... This might take some time to load. Please Wait!!</p>
    </div>
);

// Main component
const DisplayData = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch news data from the API
    const getNewsData = useCallback(async () => {
        setLoading(true);

        try {
            // Using fetch instead of axios
            const response = await fetch(
                `${import.meta.env.VITE_API_BACKEND_URL}/api/v1/data/news?limit=6`,
                {
                    credentials: 'include'
                }
            );

            const data = await response.json();

            if (data.embeddedArticles && Array.isArray(data.embeddedArticles)) {
                setNewsData(data.embeddedArticles);
            } else {
                console.error("Unexpected data format:", data);
            }
        } catch (error) {
            console.error("Error fetching news data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getNewsData();
    }, [getNewsData]);

    return (
        <div
            className="max-w-4xl mx-auto px-4 py-10"
            style={{
                animation: 'fadeIn 0.8s ease-out forwards',
            }}
        >
            {/* Enhanced header with gradient styling */}
            <div className="mb-10 relative">
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-blue-100 rounded-full opacity-70 blur-xl" />
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-100 rounded-full opacity-60 blur-xl" />

                <div className="relative">
                    <h1 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 inline-flex items-center">
                        <div className="mr-4 p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl text-white shadow-lg">
                            <Newspaper size={28} />
                        </div>
                        News
                    </h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mb-4" />
                    <p className="text-gray-600 text-lg max-w-2xl">
                        Stay informed with the latest news, research, and global initiatives
                    </p>
                </div>
            </div>

            {/* Security badge */}
            <div className="mb-6 flex items-center bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg shadow-sm border border-blue-100">
                <Shield size={20} className="text-green-600 mr-2" />
                <p className="text-sm text-gray-700">
                    All articles are verified from trusted sources and updated regularly
                </p>
            </div>

            {/* Render different UI states */}
            {newsData.length === 0 && !loading ? (
                <EmptyState />
            ) : (
                <div className="space-y-6">
                    {newsData.map((item, index) => (
                        <NewsCard key={item.guid || index} item={item} index={index} />
                    ))}
                </div>
            )}

            {loading && <LoadingSpinner />}

            {/* Add CSS for animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(79, 70, 229, 0); }
          100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
        }
      `}} />
        </div>
    );
};

export default DisplayData;
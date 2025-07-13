'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Project {
  id: number;
  image: string;
  description: string;
  category: string;
}

interface GalleryImage {
  name: string;
  image: string;
  category: string;
}

interface ImageCache {
  [category: string]: GalleryImage[];
}

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  const [shuffledImageCache, setShuffledImageCache] = useState<ImageCache>({});
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isClient, setIsClient] = useState(false);

  // Responsive items per page: 9 for mobile, 8 for desktop
  useEffect(() => {
    setIsClient(true);
    
    const updateItemsPerPage = () => {
      if (typeof window !== 'undefined') {
        setItemsPerPage(window.innerWidth >= 1024 ? 8 : 9);
      }
    };

    // Set initial value
    updateItemsPerPage();

    // Add event listener for window resize
    window.addEventListener('resize', updateItemsPerPage);

    // Cleanup
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Use default value during SSR
  const effectiveItemsPerPage = isClient ? itemsPerPage : 6;

  const categories = useMemo(() => [
    { id: 'all', name: t('todosProyectos') },
    { id: 'pergola', name: t('categoriaPergolas') },
    { id: 'pavimentos', name: t('categoriaPavimentos') },
    { id: 'interior', name: t('categoriaInterior') },
    { id: 'exterior', name: t('categoriaExterior') },
    { id: 'izolatii_gips_carton', name: t('categoriaAislamiento') }
  ], [t]);

  // Function to shuffle array
  const shuffleArray = useCallback((array: GalleryImage[]): GalleryImage[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Generate image paths without checking existence - much faster
  const generateImagePaths = useCallback((category: string): GalleryImage[] => {
    const images: GalleryImage[] = [];

    switch (category) {
      case 'pergola':
        // Generate pergola images from main gallery (01-26)
        for (let i = 1; i <= 26; i++) {
          const imageNumber = i.toString().padStart(2, '0');
          images.push({
            name: `pergola_${imageNumber}.jpg`,
            image: `/gallery/pergola_${imageNumber}.jpg`,
            category: 'pergola'
          });
        }

        // Generate pergola images from xxx/pergolas subfolder (27-32)
        for (let i = 27; i <= 32; i++) {
          images.push({
            name: `pergola_${i}.jpg`,
            image: `/gallery/xxx/pergolas/pergola_${i}.jpg`,
            category: 'pergola'
          });
        }

        // Add specific pergola images
        images.push({
          name: 'pergola_double_28.jpg',
          image: '/gallery/xxx/pergolas/pergola_double_28.jpg',
          category: 'pergola'
        });
        break;

      case 'pavimentos':
        // Generate pavimentos images from main gallery (01-27)
        for (let i = 1; i <= 27; i++) {
          const imageNumber = i.toString().padStart(2, '0');
          images.push({
            name: `pavimentos_${imageNumber}.jpg`,
            image: `/gallery/pavimentos_${imageNumber}.jpg`,
            category: 'pavimentos'
          });
        }

        // Generate pavimentos images from xxx/pavimentos subfolder (28-40)
        for (let i = 28; i <= 40; i++) {
          images.push({
            name: `pavimentos_${i}.jpg`,
            image: `/gallery/xxx/pavimentos/pavimentos_${i}.jpg`,
            category: 'pavimentos'
          });
        }

        // Add specific pavimentos images
        images.push({
          name: 'pavimentos_double_30.jpg',
          image: '/gallery/xxx/pavimentos/pavimentos_double_30.jpg',
          category: 'pavimentos'
        });
        break;

      case 'interior':
        // Generate interior images (01-12)
        for (let i = 1; i <= 12; i++) {
          const imageNumber = i.toString().padStart(2, '0');
          images.push({
            name: `interior_${imageNumber}.jpg`,
            image: `/gallery/interior_${imageNumber}.jpg`,
            category: 'interior'
          });
        }

        // Add specific interior images
        images.push({
          name: 'interior_13.jpg',
          image: '/gallery/interior_13.jpg',
          category: 'interior'
        });
        break;

      case 'exterior':
        // Generate exterior images (01-12)
        for (let i = 1; i <= 12; i++) {
          const imageNumber = i.toString().padStart(2, '0');
          images.push({
            name: `exterior_${imageNumber}.jpg`,
            image: `/gallery/exterior_${imageNumber}.jpg`,
            category: 'exterior'
          });
        }

        // Generate exterior images from xxx/exterior subfolder (13-51)
        for (let i = 13; i <= 51; i++) {
          images.push({
            name: `exterior_${i}.jpg`,
            image: `/gallery/xxx/exterior/exterior_${i}.jpg`,
            category: 'exterior'
          });
        }

        // Add specific exterior images
        images.push({
          name: 'exterior+34.jpg',
          image: '/gallery/xxx/exterior/exterior+34.jpg',
          category: 'exterior'
        });
        break;

      case 'izolatii_gips_carton':
        // Generate panel de yeso images (01-33)
        for (let i = 1; i <= 33; i++) {
          const imageNumber = i.toString().padStart(2, '0');
          images.push({
            name: `panel_de_yeso_${imageNumber}.jpg`,
            image: `/gallery/xxx/proiectare_interior/panel_de_yeso_${imageNumber}.jpg`,
            category: 'izolatii_gips_carton'
          });
        }
        break;

      default:
        break;
    }

    return images;
  }, []);

  // Load all images for all categories - instant generation
  useEffect(() => {
    if (isClient) {
      const newShuffledImageCache: ImageCache = {};

      // Generate all image paths instantly
      ['pergola', 'pavimentos', 'interior', 'exterior', 'izolatii_gips_carton'].forEach((category) => {
        const images = generateImagePaths(category);
        newShuffledImageCache[category] = shuffleArray(images);
        console.log(`Generated ${images.length} images for ${category}`);
      });

      setShuffledImageCache(newShuffledImageCache);
    }
  }, [isClient, generateImagePaths, shuffleArray]);

  // Create all projects from all categories, filtering out failed images
  const allProjects = useMemo(() => {
    const projects: Project[] = [];
    let id = 1;

    Object.entries(shuffledImageCache).forEach(([category, images]) => {
      images.forEach((image) => {
        // Skip images that have failed to load
        if (imageLoadErrors.has(image.image)) {
          return;
        }

        let description = t('proyecto');
        
        switch (category) {
          case 'pergola':
            description = t('categoriaPergolas');
            break;
          case 'pavimentos':
            description = t('categoriaPavimentos');
            break;
          case 'interior':
            description = t('categoriaInterior');
            break;
          case 'exterior':
            description = t('categoriaExterior');
            break;
          case 'izolatii_gips_carton':
            description = t('categoriaAislamiento');
            break;
          default:
            description = t('proyecto');
        }

        projects.push({
          id: id++,
          image: image.image,
          description: description,
          category: category
        });
      });
    });

    return projects;
  }, [shuffledImageCache, t, imageLoadErrors]);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return allProjects;
    }
    
    const result = allProjects.filter(project => project.category === selectedCategory);
    console.log(`Filtered ${result.length} projects for category: ${selectedCategory}`);
    return result;
  }, [selectedCategory, allProjects]);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / effectiveItemsPerPage));
  const startIndex = (currentPage - 1) * effectiveItemsPerPage;
  const endIndex = startIndex + effectiveItemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
    console.log('Category changed to:', selectedCategory, '- resetting to page 1');
  }, [selectedCategory]);

  // Ensure current page is valid when filtered projects change
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredProjects.length / effectiveItemsPerPage));
    if (currentPage > maxPage) {
      setCurrentPage(1);
      console.log('Current page was invalid, resetting to page 1');
    }
  }, [filteredProjects.length, currentPage, effectiveItemsPerPage]);

  console.log('Current page:', currentPage, 'of', totalPages);
  console.log('Current projects count:', currentProjects.length);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleImageError = useCallback((imageUrl: string) => {
    console.error('Image failed to load:', imageUrl);
    setImageLoadErrors(prev => new Set(prev).add(imageUrl));
  }, []);

  return (
    <section id="gallery" className="py-8 sm:py-16 px-2 sm:px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t('galeria')}
          </h2>
          <p className="text-sm sm:text-lg max-w-2xl mx-auto px-4 text-gray-600">
            {t('galeriaDesc')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-200 text-xs sm:text-sm ${
                selectedCategory === category.id
                  ? 'bg-construction-blue text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2 lg:gap-4 px-1 sm:px-0">
          {currentProjects.length > 0 ? (
            currentProjects.map((project, index) => (
              <div
                key={`${project.id}-${selectedCategory}-${currentPage}`}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-md sm:shadow-lg shadow-gray-200 bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.description}
                    className="w-full h-24 sm:h-32 md:h-40 lg:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading={index < 6 ? 'eager' : 'lazy'}
                    onError={() => handleImageError(project.image)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-sm sm:text-base text-gray-500">
                {t('imagenNoDisponible')}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              ← {t('anterior')}
            </button>

            {/* Page Numbers */}
            <div className="flex flex-wrap justify-center space-x-1 sm:space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-2 sm:px-3 py-2 rounded-lg text-sm sm:text-base transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-construction-blue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              {t('siguiente')} →
            </button>
          </div>
        )}

        {/* View All Projects Button */}
        {selectedCategory !== 'all' && (
          <div className="text-center mt-6 sm:mt-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-construction-blue text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base"
            >
              {t('verTodosProyectos')}
            </button>
          </div>
        )}

        {/* Modal for Project Details */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white text-xl sm:text-2xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
              >
                ×
              </button>
              <img
                src={selectedProject.image}
                alt={selectedProject.description}
                className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg cursor-pointer"
                onClick={() => setSelectedProject(null)}
                onError={() => {
                  console.error('Modal image failed to load:', selectedProject.image);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery; 
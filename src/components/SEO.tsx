import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const defaultMeta = {
  title: 'My Blog - 现代化博客系统',
  description: '基于 React + TypeScript + Vite + Tailwind CSS 构建的现代化博客系统',
  keywords: 'React, TypeScript, Vite, Tailwind CSS, Blog, 博客',
  image: '/og-image.png',
  type: 'website' as const,
};

export const SEO = ({
  title = defaultMeta.title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  image = defaultMeta.image,
  url,
  type = defaultMeta.type,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.name = name;
        document.head.appendChild(element);
      }
      element.content = content;
    };

    const updateProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Standard meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);

    // Open Graph
    updateProperty('og:title', title);
    updateProperty('og:description', description);
    updateProperty('og:image', image);
    updateProperty('og:type', type);
    if (url) updateProperty('og:url', url);

    // Twitter
    updateProperty('twitter:card', 'summary_large_image');
    updateProperty('twitter:title', title);
    updateProperty('twitter:description', description);
    updateProperty('twitter:image', image);

    return () => {
      // Cleanup is optional, we keep the meta tags
    };
  }, [title, description, keywords, image, url, type]);

  return null;
};

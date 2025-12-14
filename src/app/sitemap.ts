import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mirabytes.io';
  
  // Define your static routes here
  const routes = [
    '',
    '/work',
    '/services',
    '/methodology',
    '/company',
    '/contact',
    '/security',
    '/privacy',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8, // Homepage has highest priority
  }));
}
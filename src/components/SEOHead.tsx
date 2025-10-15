import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead = ({ 
  title = "Jatin Sharma - Full Stack Developer & Designer",
  description = "Passionate full stack developer with 5+ years of experience building scalable web applications. Specializing in React, Node.js, and modern web technologies.",
  keywords = "full stack developer, web developer, react developer, node.js, typescript, ui/ux designer",
  image = "/og-image.jpg",
  url = "https://alexchen.dev",
  type = "website"
}: SEOHeadProps) => {
  const fullTitle = title.includes("Jatin Sharma") ? title : `${title} | Jatin Sharma`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Jatin Sharma" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Jatin Sharma Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@alexchen" />

      {/* Additional */}
      <meta name="theme-color" content="#7c3aed" />
      <meta name="msapplication-TileColor" content="#7c3aed" />
    </Helmet>
  );
};

export default SEOHead;
import { Helmet } from 'react-helmet-async';
import XPDesktop from '@/components/xp/XPDesktop';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Nehal Chauhan | Full-Stack Developer Portfolio</title>
        <meta name="description" content="Windows XP themed portfolio of Nehal Chauhan - Full-Stack Developer skilled in React, Next.js, Node.js, MongoDB, and Android Development." />
        <meta name="keywords" content="Nehal Chauhan, Full-Stack Developer, React Developer, Node.js, Portfolio, Windows XP" />
        <meta property="og:title" content="Nehal Chauhan | Developer Portfolio" />
        <meta property="og:description" content="Explore my Windows XP themed portfolio showcasing projects, skills, and experience." />
        <meta name="twitter:title" content="Nehal Chauhan | Developer Portfolio" />
      </Helmet>
      <XPDesktop />
    </>
  );
};

export default Index;

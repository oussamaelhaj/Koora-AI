<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#00b894">
  <meta name="description" content="Scores, résultats et actualités football en direct - Application officielle KOORAZONE FOOT">
  <meta name="keywords" content="football, scores, direct, match, live, vidéo, buts, actualités">
  <meta name="author" content="KOORAZONE FOOT">
  <title>KOORAZONE FOOT | Application Football</title>
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700;800&family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <!-- Swiper CSS pour les carrousels -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
  
  <!-- Chart.js pour les diagrammes -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
  <style>
    /* Variables CSS */
    :root {
      --primary-color: #00b894;
      --secondary-color: #2d3436;
      --accent-color: #00a085;
      --danger-color: #e17055;
      --light-bg: #f8f9fa;
      --dark-bg: #2d3436;
      --text-dark: #2d3436;
      --text-light: #fff;
      --text-muted: #636e72;
      --card-shadow: 0 8px 25px rgba(0,0,0,0.08);
      --card-shadow-hover: 0 15px 35px rgba(0,0,0,0.15);
      --transition-fast: all 0.3s ease;
      --section-spacing: 4rem;
      --border-radius: 15px;
      --max-width: 1200px;
      --gradient-primary: linear-gradient(135deg, #00b894, #00cec9);
      --gradient-dark: linear-gradient(135deg, #2d3436, #636e72);
    }
    
    /* Style pour le corps quand le menu mobile est ouvert */
    body.no-scroll {
      overflow: hidden;
    }


    /* Reset CSS */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }
    
    html {
      scroll-behavior: smooth;
      font-size: 16px;
    }
    
    body {
      font-family: 'Raleway', sans-serif;
      background: var(--light-bg);
      color: var(--text-dark);
      line-height: 1.6;
      overflow-x: hidden;
      padding-top: 70px;
      padding-bottom: 70px;
      transition: all 0.4s ease;
    }
    
    /* Style pour l'arabe */
    body.rtl {
      direction: rtl;
      font-family: 'Cairo', sans-serif;
    }
    
    body.rtl .nav-links,
    body.rtl .footer-links,
    body.rtl .page-list,
    body.rtl .contact-info ul,
    body.rtl .footer-contact,
    body.rtl .social-links,
    body.rtl .hero-buttons,
    body.rtl .video-tabs,
    body.rtl .gallery-controls,
    body.rtl .gallery-dots,
    body.rtl .feature-grid {
      direction: rtl;
    }
    
    body.rtl .nav-links a::after,
    body.rtl .page-title::after {
      left: auto;
      right: 50%;
      transform: translateX(50%);
    }
    
    /* Animation d'entrée pour les sections */
    .section-enter {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .container {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    
    section {
      padding: var(--section-spacing) 0;
    }
    
    /* Navigation */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(15px);
      box-shadow: 0 2px 25px rgba(0,0,0,0.1);
      z-index: 1000;
      transition: var(--transition-fast);
    }
    
    .navbar.scrolled {
      background: rgba(255,255,255,0.98);
      box-shadow: 0 4px 30px rgba(0,0,0,0.1);
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      max-width: var(--max-width);
      margin: 0 auto;
    }
    
    .nav-logo {
      font-family: 'Orbitron', monospace;
      font-size: 1.5rem;
      font-weight: 900;
      color: var(--text-dark);
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    
    .nav-logo span {
      color: var(--primary-color);
    }
    
    .nav-links {
      display: flex;
      list-style: none;
      gap: 1.5rem;
      margin: 0;
    }
    
    .nav-links a {
      font-weight: 600;
      color: var(--text-dark);
      position: relative;
      padding: 0.8rem 0;
      transition: var(--transition-fast);
      font-size: 0.9rem;
    }
    
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: var(--gradient-primary);
      transition: var(--transition-fast);
      border-radius: 3px;
    }
    
    .nav-links a:hover,
    .nav-links a.active {
      color: var(--primary-color);
    }
    
    .nav-links a:hover::after,
    .nav-links a.active::after {
      width: 100%;
    }
    
    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      font-size: 1.8rem;
      color: var(--text-dark);
      cursor: pointer;
      z-index: 1001;
    }
    
    /* Sélecteur de langue */
    .language-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-left: 1rem;
      position: relative;
    }
    
    .language-btn {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-weight: 600;
      padding: 0.5rem 0.8rem;
      border-radius: 30px;
      transition: var(--transition-fast);
    }
    
    .language-btn:hover {
      background: rgba(0, 184, 148, 0.1);
    }
    
    .language-btn i {
      font-size: 1.2rem;
    }
    
    .language-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      padding: 0.5rem;
      width: 150px;
      z-index: 100;
      display: none;
      flex-direction: column;
    }
    
    .language-dropdown.show {
      display: flex;
    }
    
    .language-option {
      padding: 0.8rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      cursor: pointer;
      border-radius: 8px;
      transition: var(--transition-fast);
    }
    
    .language-option:hover {
      background: rgba(0, 184, 148, 0.1);
    }
    
    .language-option.active {
      background: rgba(0, 184, 148, 0.2);
      font-weight: 700;
    }
    
    .language-flag {
      width: 24px;
      height: 16px;
      border-radius: 2px;
      object-fit: cover;
    }
    
    /* Hero Section */
    .hero {
      background: var(--gradient-dark), 
                  linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
                  url('https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover;
      color: var(--text-light);
      text-align: center;
      padding: 8rem 1rem 6rem;
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .hero-content {
      max-width: 900px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }
    
    .hero-badge {
      display: inline-block;
      background: var(--gradient-primary);
      color: var(--text-light);
      padding: 0.8rem 1.5rem;
      border-radius: 30px;
      font-size: 0.9rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
    }
    
    .hero h1 {
      font-family: 'Orbitron', monospace;
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      margin-bottom: 1rem;
      font-weight: 900;
    }
    
    .hero-subtitle {
      font-size: clamp(1.1rem, 2.5vw, 1.5rem);
      margin-bottom: 2rem;
      font-weight: 300;
      opacity: 0.9;
    }
    
    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-weight: 700;
      font-size: 1rem;
      transition: var(--transition-fast);
      min-width: 180px;
      justify-content: center;
      text-transform: uppercase;
    }
    
    .btn-primary {
      background: var(--gradient-primary);
      color: var(--text-light);
      box-shadow: 0 6px 25px rgba(0, 184, 148, 0.3);
    }
    
    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(0, 184, 148, 0.4);
    }
    
    .btn-outline {
      background: transparent;
      color: var(--text-light);
      border: 2px solid var(--primary-color);
    }
    
    .btn-outline:hover {
      background: var(--primary-color);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 184, 148, 0.3);
    }
    
    /* Installer l'app btn */
    .install-btn {
      position: fixed;
      bottom: 90px;
      right: 20px;
      background: var(--gradient-primary);
      color: white;
      border: none;
      border-radius: 50px;
      padding: 12px 20px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 15px rgba(0, 184, 148, 0.4);
      z-index: 998;
      transition: all 0.3s ease;
      transform: translateY(100px);
      opacity: 0;
    }
    
    .install-btn.show {
      transform: translateY(0);
      opacity: 1;
    }
    
    /* Section Header */
    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .section-badge {
      display: inline-block;
      background: var(--gradient-primary);
      color: var(--text-light);
      padding: 0.5rem 1.5rem;
      border-radius: 30px;
      font-size: 0.9rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }
    
    .section-title {
      font-family: 'Orbitron', monospace;
      font-size: clamp(2rem, 4vw, 3rem);
      color: var(--text-dark);
      margin-bottom: 1rem;
      font-weight: 900;
    }
    
    .section-description {
      font-size: 1.1rem;
      color: var(--text-muted);
      max-width: 700px;
      margin: 0 auto;
    }
    
    /* Style pour le bouton de rafraîchissement */
    .btn-refresh {
      position: absolute;
      top: 0;
      right: 0;
      background: rgba(0, 184, 148, 0.1);
      border: 1px solid rgba(0, 184, 148, 0.2);
      color: var(--primary-color);
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition-fast);
    }

    .btn-refresh:hover {
      background: var(--primary-color);
      color: white;
    }

    /* Video Section */
    .videos {
      background: #fff;
    }
    .video-tabs {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      background-color: var(--light-bg);
      padding: 0.5rem;
      border-radius: 50px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .tab-btn {
      background: transparent;
      color: var(--text-dark);
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 50px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: var(--transition-fast);
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      box-shadow: none;
    }
    
    .tab-btn i {
      font-size: 1.1rem;
      color: var(--text-muted);
      transition: var(--transition-fast);
    }
    
    .tab-btn.active,
    .tab-btn:hover {
      background: var(--gradient-primary);
      color: var(--text-light);
      box-shadow: 0 8px 25px rgba(0, 184, 148, 0.3);
    }

    .tab-btn.active i,
    .tab-btn:hover i {
      color: var(--text-light);
      transform: scale(1.1);
    }
    
    /* CADRE D'AFFICHAGE AGRANDI */
    .video-content {
      position: relative;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      background: var(--dark-bg);
      padding: 1rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    @media (min-width: 992px) {
      .video-content {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .video-iframe-container {
      width: 100%;
      position: relative;
      border: none;
      height: 65vh;
      min-height: 450px;
      display: none; /* Caché par défaut sur mobile */
    }

    .video-iframe-container.active { /* Affiché si actif sur mobile */
      display: block;
    }

    @media (min-width: 992px) {
      .video-iframe-container {
        display: block !important; /* Toujours visible sur desktop */
      }
    }
    
    .video-iframe {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 10px;
      background: #f0f5f7;
    }
    
    /* Pages supplémentaires */
    .page-section {
      background: white;
      padding: var(--section-spacing) 0;
    }
    
    .page-section:nth-child(even) {
      background: var(--light-bg);
    }
    
    .page-content {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      padding: 2.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--card-shadow);
    }
    
    .page-title {
      font-family: 'Orbitron', monospace;
      font-size: clamp(1.8rem, 3vw, 2.5rem);
      color: var(--text-dark);
      margin-bottom: 1.5rem;
      font-weight: 900;
      text-align: center;
      position: relative;
      padding-bottom: 1rem;
    }
    
    .page-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: var(--gradient-primary);
      border-radius: 2px;
    }
    
    .page-subtitle {
      font-size: 1.2rem;
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      font-weight: 700;
    }
    
    .page-text {
      margin-bottom: 1.5rem;
      line-height: 1.7;
    }
    
    .page-list {
      padding-left: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .page-list li {
      margin-bottom: 0.8rem;
      position: relative;
    }
    
    .page-list li::before {
      content: '•';
      color: var(--primary-color);
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .contact-info {
      background: rgba(0, 184, 148, 0.05);
      padding: 1.5rem;
      border-radius: var(--border-radius);
      border-left: 4px solid var(--primary-color);
    }
    
    .contact-info h3 {
      margin-bottom: 1rem;
      color: var(--secondary-color);
    }
    
    .contact-info ul {
      list-style: none;
    }
    
    .contact-info li {
      margin-bottom: 0.8rem;
      display: flex;
      align-items: flex-start;
      gap: 0.8rem;
    }
    
    .contact-info i {
      color: var(--primary-color);
      min-width: 20px;
    }
    
    /* Footer */
    .footer {
      background: var(--dark-bg);
      color: var(--text-light);
      padding: 4rem 0 2rem;
      position: relative;
    }
    
    .footer::before {
      content: '';
      position: absolute;
      top: -50px;
      left: 0;
      width: 100%;
      height: 50px;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg"><path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="%232d3436"/></svg>') center/cover;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }
    
    .footer-section h3 {
      font-family: 'Orbitron', monospace;
      font-size: 1.3rem;
      margin-bottom: 1.5rem;
      position: relative;
      display: inline-block;
      font-weight: 700;
    }
    
    .footer-section h3::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 50px;
      height: 3px;
      background: var(--gradient-primary);
    }
    
    .footer-links {
      list-style: none;
    }
    
    .footer-links li {
      margin-bottom: 0.8rem;
    }
    
    .footer-links a {
      color: rgba(255,255,255,0.8);
      transition: var(--transition-fast);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
    }
    
    .footer-links a:hover {
      color: var(--primary-color);
    }
    
    .footer-contact {
      list-style: none;
    }
    
    .footer-contact li {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 1rem;
      color: rgba(255,255,255,0.8);
    }
    
    .footer-contact i {
      color: var(--primary-color);
      width: 20px;
      font-size: 1rem;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    
    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      color: var(--text-light);
      border-radius: 50%;
      transition: var(--transition-fast);
      font-size: 1.1rem;
    }
    
    .social-link:hover {
      background: var(--gradient-primary);
      transform: translateY(-3px);
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 1.5rem;
      text-align: center;
    }
    
    .footer-bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      color: rgba(255,255,255,0.7);
      font-size: 0.9rem;
    }
    
    /* WhatsApp Float Button */
    .whatsapp-float {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      width: 60px;
      height: 60px;
      background: #25d366;
      color: var(--text-light);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      box-shadow: 0 6px 25px rgba(37, 211, 102, 0.3);
      z-index: 999;
      transition: var(--transition-fast);
    }
    
    .whatsapp-float:hover {
      transform: scale(1.15);
      box-shadow: 0 10px 35px rgba(37, 211, 102, 0.4);
    }
    
    /* Bottom Navigation (pour mobile) */
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: white;
      display: flex;
      justify-content: space-around;
      padding: 10px 0;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
      z-index: 1000;
      display: none;
    }
    
    .bottom-nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--text-muted);
      font-size: 0.8rem;
      text-decoration: none;
      transition: var(--transition-fast);
    }
    
    .bottom-nav-item i {
      font-size: 1.4rem;
      margin-bottom: 4px;
    }
    
    .bottom-nav-item.active {
      color: var(--primary-color);
    }
    
    /* Section de téléchargement d'application avec image en arrière-plan */
    .app-download-section {
      position: relative;
      padding: 5rem 2rem;
      text-align: center;
      color: white;
      overflow: hidden;
    }
    
    .app-download-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), 
                  url('https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover no-repeat;
      z-index: -1;
    }
    
    .app-download-content {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }
    
    .app-download-title {
      font-family: 'Orbitron', monospace;
      font-size: clamp(1.8rem, 4vw, 3rem);
      margin-bottom: 1.5rem;
      color: white;
    }
    
    .app-download-text {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .app-download-btn {
      display: inline-block;
      background: var(--gradient-primary);
      color: white;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-weight: 700;
      text-decoration: none;
      transition: var(--transition-fast);
      box-shadow: 0 6px 25px rgba(0, 184, 148, 0.3);
    }
    
    .app-download-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(0, 184, 148, 0.4);
    }
    
    /* Section des actualités avec carrousel */
    .news-section {
      padding: var(--section-spacing) 0;
      background: var(--light-bg);
    }
    
    .swiper {
      width: 100%;
      height: 100%;
      padding: 20px 10px 50px;
    }
    
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--card-shadow);
      display: flex;
      flex-direction: column;
      transition: var(--transition-fast);
    }
    
    .swiper-slide:hover {
      transform: translateY(-5px);
      box-shadow: var(--card-shadow-hover);
    }
    
    .news-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    
    .news-content {
      padding: 1.5rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    
    .news-title {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: var(--text-dark);
    }
    
    .news-excerpt {
      color: var(--text-muted);
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }
    
    .news-date {
      color: var(--primary-color);
      font-weight: 600;
      margin-top: auto;
    }
    
    .swiper-pagination-bullet-active {
      background: var(--primary-color);
    }
    
    /* Style pour les tickets d'actualité "Live" */
    .live-badge {
      background-color: var(--danger-color);
      color: white;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
      animation: pulse-live 1.5s infinite;
    }

    /* Section des statistiques avec diagrammes */
    .stats-section {
      padding: var(--section-spacing) 0;
      background: white;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .stat-card {
      background: white;
      border-radius: var(--border-radius);
      padding: 1.5rem;
      box-shadow: var(--card-shadow);
      text-align: center;
    }
    
    .stat-title {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      color: var(--text-dark);
      font-weight: 700;
    }
    
    .chart-container {
      position: relative;
      height: 250px;
      width: 100%;
    }
    
    /* Responsive Design */  
    @media (max-width: 768px) {
      .navbar {
        display: block; /* Afficher la navbar sur mobile */
      }

      .mobile-menu-btn {
        display: flex;
      }
      
      .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 70%;
        height: 100vh;
        background: white;
        flex-direction: column;
        justify-content: center;
        gap: 1.5rem;
        transition: right 0.4s ease;
        box-shadow: -5px 0 20px rgba(0,0,0,0.1);
        z-index: 100;
        padding: 2rem;
      }
      
      .nav-links.active {
        right: 0;
      }
      
      .hero {
        padding: 6rem 1rem 3rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .video-tabs {
        flex-direction: column;
        gap: 1rem;
      }
      
      .tab-btn {
        padding: 1rem 1.5rem;
        font-size: 1rem;
        min-width: 90%;
        max-width: 300px;
      }
      
      .video-iframe-container {
        height: 50vh;
        min-height: 300px;
      }
      
      .footer-bottom-content {
        flex-direction: column;
      }
      
      .page-content {
        padding: 1.5rem;
      }
      
      /* Afficher la bottom nav sur mobile */
      .bottom-nav {
        display: flex;
      }
      
      body {
        padding-top: 0;
      }
      
      .language-selector {
        margin-left: 0;
        margin-right: 1rem;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 480px) {
      .nav-links {
        width: 100%;
      }
      
      .hero h1 {
        font-size: 2.2rem;
      }
      
      .hero-subtitle {
        font-size: 1rem;
      }
      
      .btn {
        min-width: 160px;
        padding: 0.8rem 1.5rem;
      }
      
      .whatsapp-float {
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        bottom: 1rem;
        right: 1rem;
      }
      
      .tab-btn {
        padding: 1rem 1.5rem;
        font-size: 1rem;
      }
      
      .section-title {
        font-size: 1.8rem;
      }
    }
    
    /* Animation pour attirer l'attention sur les onglets */
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .tab-btn.active {
      animation: pulse 0.5s ease;
    }
    
    /* Indicateur de chargement */
    .video-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      background: var(--gradient-primary);
      border-radius: 10px;
      color: white;
      font-size: 1.2rem;
      font-weight: 700;
    }
    
    .video-loading i {
      margin-right: 1rem;
      font-size: 2rem;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    /* Splash screen pour PWA */
    .splash-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--gradient-dark);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      transition: opacity 0.5s ease;
    }
    
    .splash-logo {
      font-family: 'Orbitron', monospace;
      font-size: 3rem;
      font-weight: 900;
      color: white;
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .splash-logo span {
      color: var(--primary-color);
    }
    
    .splash-spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: var(--primary-color);
      animation: spin 1s linear infinite;
    }
    
    /* Bouton de langue en bas d'écran */
    .bottom-language-btn {
      position: fixed;
      bottom: 80px;
      left: 20px;
      background: var(--gradient-primary);
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      box-shadow: 0 4px 15px rgba(0, 184, 148, 0.4);
      z-index: 997;
      cursor: pointer;
    }
    
    .bottom-language-selector {
      position: fixed;
      bottom: 140px;
      left: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      padding: 0.5rem;
      width: 150px;
      z-index: 997;
      display: none;
      flex-direction: column;
    }
    
    .bottom-language-selector.show {
      display: flex;
    }
    
    .bottom-language-option {
      padding: 0.8rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      cursor: pointer;
      border-radius: 8px;
      transition: var(--transition-fast);
    }
    
    .bottom-language-option:hover {
      background: rgba(0, 184, 148, 0.1);
    }
    
    .bottom-language-option.active {
      background: rgba(0, 184, 148, 0.2);
      font-weight: 700;
    }
  </style>
  
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2167865407816280"
     crossorigin="anonymous"></script>
  <script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
</script>
</head>
<body>
  <amp-auto-ads type="adsense"
        data-ad-client="ca-pub-2167865407816280">
</amp-auto-ads>
  
  <!-- Splash screen pour PWA -->
  <div class="splash-screen" id="splashScreen">
    <div class="splash-logo">
      <i class="fas fa-futbol"></i>
      KOORAZONE <span>FOOT</span>
    </div>
    <div class="splash-spinner"></div>
  </div>

  <!-- Navigation -->
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <i class="fas fa-futbol"></i>
        KOORAZONE <span>FOOT</span>
      </div>
      <ul class="nav-links" id="navLinks">
        <li><a href="#accueil" class="nav-link" data-key="nav.home">Accueil</a></li>
        <li><a href="#videos" class="nav-link" data-key="nav.videos">Vidéos</a></li>
        <li><a href="#news" class="nav-link" data-key="nav.news">Actualités</a></li>
        <li><a href="#stories" class="nav-link" data-key="nav.stats">Histoires</a></li>
        <li><a href="#apropos" class="nav-link" data-key="nav.about">À Propos</a></li>
        <li><a href="#confidentialite" class="nav-link" data-key="nav.privacy">Confidentialité</a></li>
        <li><a href="#contact" class="nav-link" data-key="nav.contact">Contact</a></li>
        <li><a href="#ai-assistant" class="nav-link">Assistant IA</a></li>
      </ul>
      
      <!-- Sélecteur de langue -->
      <div class="language-selector">
        <button class="language-btn" id="languageBtn">
          <i class="fas fa-globe"></i>
          <span id="currentLanguage">FR</span>
        </button>
        <div class="language-dropdown" id="languageDropdown">
          <div class="language-option active" data-lang="fr">
            <img src="https://flagcdn.com/w40/fr.png" class="language-flag" alt="Drapeau France">
            <span>Français</span>
          </div>
          <div class="language-option" data-lang="en">
            <img src="https://flagcdn.com/w40/gb.png" class="language-flag" alt="Drapeau Royaume-Uni">
            <span>English</span>
          </div>
          <div class="language-option" data-lang="es">
            <img src="https://flagcdn.com/w40/es.png" class="language-flag" alt="Drapeau Espagne">
            <span>Español</span>
          </div>
          <div class="language-option" data-lang="ar">
            <img src="https://flagcdn.com/w40/sa.png" class="language-flag" alt="Drapeau Arabie Saoudite">
            <span>العربية</span>
          </div>
          <div class="language-option" data-lang="it">
            <img src="https://flagcdn.com/w40/it.png" class="language-flag" alt="Drapeau Italie">
            <span>Italiano</span>
          </div>
        </div>
      </div>
      
      <button class="mobile-menu-btn" id="mobileMenuBtn">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </nav>

  <!-- Bottom Navigation (pour mobile) -->
  <div class="bottom-nav">
    <a href="#accueil" class="bottom-nav-item active">
      <i class="fas fa-home"></i>
      <span data-key="nav.home">Accueil</span>
    </a>
    <a href="#videos" class="bottom-nav-item">
      <i class="fas fa-play"></i>
      <span data-key="nav.videos">Direct</span>
    </a>
    <a href="#news" class="bottom-nav-item">
      <i class="fas fa-newspaper"></i>
      <span data-key="nav.news">Actualités</span>
    </a>
    <a href="#app-download" class="bottom-nav-item">
      <i class="fas fa-download"></i>
      <span data-key="nav.download">Télécharger</span>
    </a>
    <a href="#contact" class="bottom-nav-item">
      <i class="fas fa-user"></i>
      <span data-key="nav.contact">Contact</span>
    </a>
  </div>

  <!-- Hero Section -->
  <section class="hero" id="accueil">
    <div class="hero-content">
      <div class="hero-badge">
        <i class="fas fa-broadcast-tower"></i>
        <span data-key="hero.badge">Scores en Temps Réel</span>
      </div>
      <h1 data-key="hero.title">FOOTBALL LIVE</h1>
      <p class="hero-subtitle" data-key="hero.subtitle">Suivez tous les matchs en direct, résultats et actualités du football mondial</p>
      <div class="hero-buttons">
        <a href="#videos" class="btn btn-primary">
          <i class="fas fa-play"></i>
          <span data-key="hero.btn1">Voir les Matchs</span>
        </a>
        <a href="https://wa.me/0612153519" class="btn btn-outline" target="_blank">
          <i class="fab fa-whatsapp"></i>
          <span data-key="hero.btn2">Nous Contacter</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Video Section -->
  <section class="videos" id="videos">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">
          <i class="fas fa-video"></i>
          <span data-key="videos.badge">Vidéos en Direct</span>
        </div>
        <h2 class="section-title" data-key="videos.title">Buts & Matchs en Direct</h2>
        <p class="section-description" data-key="videos.description">Regardez les buts et les matchs en direct en plein écran</p>
      </div>
      
      <div class="video-tabs">
        <button class="tab-btn active" data-tab="goals">
          <i class="fas fa-futbol"></i>
          <span data-key="videos.tab1">Vidéos des Buts</span>
        </button>
        <button class="tab-btn" data-tab="live">
          <i class="fas fa-video"></i>
          <span data-key="videos.tab2">Matchs en Direct</span>
        </button>
      </div>
      
      <div class="video-content">
        <div class="video-iframe-container active" id="goals-video">
          <iframe class="video-iframe" src="https://www.scorebat.com/embed/videofeed/?token=MjE5ODc2XzE3NTEzODExNTBfMmRmYTU1YmVhZmU1ZjVhYmE2NDA2OTk0MGVlNzRmOTY0OWYzZTEwZQ==" frameborder="0" allow="autoplay; fullscreen; encrypted-media; picture-in-picture"></iframe>
        </div>
        <div class="video-iframe-container" id="live-video">
          <iframe class="video-iframe" src="https://www.scorebat.com/embed/livescore/?token=MjE5ODc2XzE3NTEzODEwMThfNDU1OWY4NWVhYWQxZGQ4ZDgzOWUwMjE5NjI4MjdhZTM5MTcyMWNiZg==" frameborder="0" allow="autoplay; fullscreen; encrypted-media; picture-in-picture"></iframe>
        </div>
      </div>
    </div>
  </section>

  <!-- Section des actualités avec carrousel -->
  <section class="news-section" id="news">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">
          <i class="fas fa-newspaper"></i>
          <span data-key="news.badge">Faits Surprenants</span>
        </div>
        <h2 class="section-title" data-key="news.title">Le Saviez-Vous ?</h2>
        <button id="refresh-news-btn" class="btn-refresh" title="Rafraîchir les actualités">
          <i class="fas fa-sync-alt"></i>
        </button>
        <p class="section-description" data-key="news.description">Découvrez des records et des faits incroyables sur le monde du football.</p>
      </div>
      
      <!-- Slider main container -->
      <div class="swiper newsSwiper">
        <!-- Le contenu des actualités sera injecté ici par JavaScript -->
        <div class="swiper-wrapper" id="news-wrapper"></div>
        <div class="swiper-button-next" style="color: var(--primary-color);"></div>
        <div class="swiper-button-prev" style="color: var(--primary-color);"></div>
        <!-- Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>

  <!-- Section des statistiques avec diagrammes -->
  <section class="stats-section" id="stories">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">
          <i class="fas fa-history"></i>
          <span data-key="stats.badge">Histoires du Foot</span>
        </div>
        <h2 class="section-title" data-key="stats.title">Anecdotes et Moments Légendaires</h2>
        <p class="section-description" data-key="stats.description">Découvrez des histoires fascinantes qui ont marqué le monde du football.</p>
      </div>
      
      <div class="stats-grid" id="stories-grid">
        <!-- Les histoires seront injectées ici par JavaScript -->
        <div class="stat-card">
          <div class="chart-container" style="display:flex; align-items:center; justify-content:center;">
            <i class="fas fa-spinner fa-spin fa-2x"></i>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- Section de téléchargement d'application -->
  <section class="app-download-section" id="app-download">
    <div class="app-download-bg"></div>
    <div class="app-download-content">
      <h2 class="app-download-title" data-key="app.title">Téléchargez Notre Application</h2>
      <p class="app-download-text" data-key="app.description">Accédez à tous les contenus exclusifs, recevez des notifications en direct et profitez d'une expérience optimisée sur mobile</p>
      <a href="https://koorazone.apk.com/" class="app-download-btn" target="_blank" data-key="app.download">
        <i class="fas fa-download"></i> Télécharger l'App
      </a>
    </div>
  </section>

  <!-- NOUVELLE SECTION : Assistant IA -->
  <section class="page-section" id="ai-assistant">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">
          <i class="fas fa-robot"></i>
          <span>Assistant IA</span>
        </div>
        <h2 class="section-title">Posez votre question à l'IA</h2>
        <p class="section-description">Notre assistant IA recherche sur internet pour vous fournir des réponses à jour sur le monde du football.</p>
      </div>

      <div class="page-content" style="max-width: 800px; margin: auto;">
        <div id="ai-form-container">
          <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
            <input type="text" id="ai-question-input" placeholder="Ex: Que se passe-t-il avec le Wydad ?" style="flex-grow: 1; padding: 1rem; border-radius: 50px; border: 2px solid #ddd;">
            <button id="ask-ai-btn" class="btn btn-primary" style="min-width: auto; padding: 1rem 1.5rem;">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>

        <div id="ai-response-container" style="display: none; margin-top: 2rem; padding: 1.5rem; background: rgba(0, 184, 148, 0.05); border-left: 4px solid var(--primary-color); border-radius: var(--border-radius);">
          <h3 style="font-family: 'Orbitron', monospace; margin-bottom: 1rem;">Réponse de l'IA :</h3>
          <div id="ai-response-content" style="line-height: 1.8;">
            <!-- La réponse de l'IA apparaîtra ici -->
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- À Propos Section -->
  <section class="page-section" id="apropos">
    <div class="container">
      <div class="page-content">
        <h2 class="page-title" data-key="about.title">À Propos de KOORAZONE FOOT</h2>
        
        <p class="page-text" data-key="about.text1">
          KOORAZONE FOOT est votre destination ultime pour suivre le football en direct. Notre mission est de fournir aux passionnés de football du monde entier un accès facile et rapide aux scores, aux résultats et aux actualités du football.
        </p>
        
        <p class="page-text" data-key="about.text2">
          Fondé en 2023, KOORAZONE FOOT s'est rapidement imposé comme une référence dans le domaine des informations footballistiques en temps réel. Notre plateforme est conçue pour les fans exigeants qui souhaitent rester informés où qu'ils soient.
        </p>
        
        <h3 class="page-subtitle" data-key="about.subtitle1">Notre Mission</h3>
        <p class="page-text" data-key="about.text3">
          Nous nous engageons à fournir des informations précises, à jour et complètes sur tous les événements footballistiques majeurs à travers le monde. Que vous suiviez la Premier League, la Liga, la Serie A ou toute autre compétition, KOORAZONE FOOT est votre compagnon idéal.
        </p>
        
        <h3 class="page-subtitle" data-key="about.subtitle2">Notre Équipe</h3>
        <p class="page-text" data-key="about.text4">
          Notre équipe est composée de passionnés de football et de professionnels de la technologie qui travaillent sans relâche pour améliorer continuellement votre expérience. Nous combinons expertise technique et connaissance approfondie du football pour vous offrir le meilleur service possible.
        </p>
        
        <h3 class="page-subtitle" data-key="about.subtitle3">Ce que nous offrons</h3>
        <ul class="page-list">
          <li data-key="about.list1">Scores en direct et résultats de matchs</li>
          <li data-key="about.list2">Vidéos des buts et moments forts</li>
          <li data-key="about.list3">Statistiques détaillées et classements</li>
          <li data-key="about.list4">Actualités et transferts en temps réel</li>
          <li data-key="about.list5">Calendriers des matchs et rappels personnalisés</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Politique de Confidentialité Section -->
  <section class="page-section" id="confidentialite">
    <div class="container">
      <div class="page-content">
        <h2 class="page-title" data-key="privacy.title">Politique de Confidentialité</h2>
        
        <p class="page-text" data-key="privacy.text1">
          Cette politique de confidentialité explique comment KOORAZONE FOOT collecte, utilise et protège vos informations personnelles lorsque vous utilisez notre site web.
        </p>
        
        <h3 class="page-subtitle" data-key="privacy.subtitle1">Collecte des informations</h3>
        <p class="page-text" data-key="privacy.text2">
          Nous collectons des informations lorsque vous vous inscrivez sur notre site, vous connectez à votre compte, effectuez un achat, participez à un concours, et/ou lorsque vous vous déconnectez. Les informations collectées incluent votre nom, votre adresse e-mail, votre numéro de téléphone, et/ou votre carte de crédit.
        </p>
        
        <h3 class="page-subtitle" data-key="privacy.subtitle2">Utilisation des informations</h3>
        <p class="page-text" data-key="privacy.text3">
          Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
        </p>
        <ul class="page-list">
          <li data-key="privacy.list1">Personnaliser votre expérience et répondre à vos besoins individuels</li>
          <li data-key="privacy.list2">Fournir un contenu publicitaire personnalisé</li>
          <li data-key="privacy.list3">Améliorer notre site web</li>
          <li data-key="privacy.list4">Améliorer le service client et vos besoins de prise en charge</li>
          <li data-key="privacy.list5">Vous contacter par e-mail</li>
          <li data-key="privacy.list6">Administrer un concours, une promotion, ou une enquête</li>
        </ul>
        
        <h3 class="page-subtitle" data-key="privacy.subtitle3">Protection des informations</h3>
        <p class="page-text" data-key="privacy.text4">
          Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage de pointe pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne.
        </p>
        
        <h3 class="page-subtitle" data-key="privacy.subtitle4">Cookies</h3>
        <p class="page-text" data-key="privacy.text5">
          Notre site utilise des cookies pour améliorer l'accès à notre site et identifier les visiteurs réguliers. En outre, nos cookies améliorent l'expérience utilisateur grâce au suivi et au ciblage de ses intérêts. Cependant, cette utilisation des cookies n'est en aucune façon liée à des informations personnelles identifiables sur notre site.
        </p>
        
        <h3 class="page-subtitle" data-key="privacy.subtitle5">Consentement</h3>
        <p class="page-text" data-key="privacy.text6">
          En utilisant notre site, vous consentez à notre politique de confidentialité.
        </p>
        
        <h3 class="page-subtitle" data-key="privacy.subtitle6">Modifications</h3>
        <p class="page-text" data-key="privacy.text7">
          Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.
        </p>
        
        <p class="page-text">
          <strong data-key="privacy.lastupdate">Dernière mise à jour :</strong> 3 Juillet 2025
        </p>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="page-section" id="contact">
    <div class="container">
      <div class="page-content">
        <h2 class="page-title" data-key="contact.title">Contactez-Nous</h2>
        
        <p class="page-text" data-key="contact.text">
          Vous avez des questions, des suggestions ou besoin d'assistance ? Notre équipe est là pour vous aider. N'hésitez pas à nous contacter par l'un des moyens ci-dessous.
        </p>
        
        <div class="contact-grid">
          <div class="contact-info">
            <h3 data-key="contact.info">Informations de Contact</h3>
            <ul>
              <li>
                <i class="fas fa-map-marker-alt"></i>
                <div>
                  <strong data-key="contact.address">Adresse</strong><br>
                  Casablanca, Maroc
                </div>
              </li>
              <li>
                <i class="fas fa-phone"></i>
                <div>
                  <strong data-key="contact.phone">Téléphone</strong><br>
                  <a href="tel:0612153519">06 12 15 35 19</a>
                </div>
              </li>
              <li>
                <i class="fas fa-envelope"></i>
                <div>
                  <strong data-key="contact.email">Email</strong><br>
                  <a href="mailto:contact@koorazonefoot.ma">contact@koorazonefoot.ma</a>
                </div>
              </li>
              <li>
                <i class="fab fa-whatsapp"></i>
                <div>
                  <strong data-key="contact.whatsapp">WhatsApp</strong><br>
                  <a href="https://wa.me/0612153519" target="_blank" data-key="contact.sendmsg">Envoyez un message</a>
                </div>
              </li>
            </ul>
          </div>
          
          <div class="contact-info">
            <h3 data-key="contact.hours">Heures d'Ouverture</h3>
            <ul>
              <li>
                <i class="fas fa-clock"></i>
                <div>
                  <strong data-key="contact.weekdays">Lundi - Vendredi</strong><br>
                  9h00 - 18h00
                </div>
              </li>
              <li>
                <i class="fas fa-clock"></i>
                <div>
                  <strong data-key="contact.saturday">Samedi</strong><br>
                  10h00 - 16h00
                </div>
              </li>
              <li>
                <i class="fas fa-clock"></i>
                <div>
                  <strong data-key="contact.sunday">Dimanche</strong><br>
                  <span data-key="contact.closed">Fermé</span>
                </div>
              </li>
              <li>
                <i class="fas fa-exclamation-circle"></i>
                <div>
                  <strong data-key="contact.support">Support 24/7</strong><br>
                  <span data-key="contact.emergency">Disponible pour les urgences</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Koorazone Foot</h3>
          <p data-key="footer.description">Votre source #1 pour suivre tous les matchs de football en direct, consulter les résultats et rester informé de l'actualité du football mondial.</p>
          <div class="social-links">
            <a href="#" class="social-link" target="_blank">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-link" target="_blank">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-link" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/0612153519" class="social-link" target="_blank">
              <i class="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h3 data-key="footer.links">Liens Rapides</h3>
          <ul class="footer-links">
            <li><a href="#accueil"><i class="fas fa-home"></i> <span data-key="nav.home">Accueil</span></a></li>
            <li><a href="#videos"><i class="fas fa-video"></i> <span data-key="nav.videos">Vidéos</span></a></li>
            <li><a href="#news"><i class="fas fa-newspaper"></i> <span data-key="nav.news">Actualités</span></a></li>
            <li><a href="#stats"><i class="fas fa-chart-bar"></i> <span data-key="nav.stats">Statistiques</span></a></li>
            <li><a href="#apropos"><i class="fas fa-info-circle"></i> <span data-key="nav.about">À Propos</span></a></li>
            <li><a href="#confidentialite"><i class="fas fa-shield-alt"></i> <span data-key="nav.privacy">Confidentialité</span></a></li>
            <li><a href="#contact"><i class="fas fa-envelope"></i> <span data-key="nav.contact">Contact</span></a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 data-key="footer.contact">Contact</h3>
          <ul class="footer-contact">
            <li><i class="fas fa-map-marker-alt"></i> Casablanca, Maroc</li>
            <li><i class="fas fa-phone"></i> <a href="tel:0612153519">06 12 15 35 19</a></li>
            <li><i class="fas fa-envelope"></i> <a href="mailto:contact@football-live.ma">contact@football-live.ma</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; 2025 KOORAZONE FOOT. <span data-key="footer.rights">Tous droits réservés.</span></p>
          <ul class="footer-links" style="display: flex; gap: 1rem; justify-content: center;">
            <li><a href="#confidentialite" data-key="nav.privacy">Confidentialité</a></li>
            <li><a href="#apropos" data-key="nav.about">À Propos</a></li>
            <li><a href="#contact" data-key="nav.contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>

  <!-- WhatsApp Float Button -->
  <a href="https://wa.me/0612153519" class="whatsapp-float" target="_blank" aria-label="WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>

  <!-- Installer l'application Button -->
  <button class="install-btn" id="installBtn">
    <i class="fas fa-download"></i>
    <span data-key="install.btn">Installer l'App</span>
  </button>

  <!-- Bouton de langue en bas d'écran -->
  <button class="bottom-language-btn" id="bottomLanguageBtn">
    <i class="fas fa-globe"></i>
  </button>
  
  <div class="bottom-language-selector" id="bottomLanguageSelector">
    <div class="bottom-language-option active" data-lang="fr">
      <img src="https://flagcdn.com/w40/fr.png" class="language-flag" alt="Drapeau France">
      <span>Français</span>
    </div>
    <div class="bottom-language-option" data-lang="en">
      <img src="https://flagcdn.com/w40/gb.png" class="language-flag" alt="Drapeau Royaume-Uni">
      <span>English</span>
    </div>
    <div class="bottom-language-option" data-lang="es">
      <img src="https://flagcdn.com/w40/es.png" class="language-flag" alt="Drapeau Espagne">
      <span>Español</span>
    </div>
    <div class="bottom-language-option" data-lang="ar">
      <img src="https://flagcdn.com/w40/sa.png" class="language-flag" alt="Drapeau Arabie Saoudite">
      <span>العربية</span>
    </div>
    <div class="bottom-language-option" data-lang="it">
      <img src="https://flagcdn.com/w40/it.png" class="language-flag" alt="Drapeau Italie">
      <span>Italiano</span>
    </div>
  </div>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
  <script>
    // Traductions
    const translations = {
      fr: {
        "nav.home": "Accueil",
        "nav.videos": "Vidéos",
        "nav.news": "Actualités",
        "nav.stats": "Statistiques",
        "nav.about": "À Propos",
        "nav.privacy": "Confidentialité",
        "nav.contact": "Contact",
        "nav.download": "Télécharger",
        "hero.badge": "Scores en Temps Réel",
        "hero.title": "FOOTBALL LIVE",
        "hero.subtitle": "Suivez tous les matchs en direct, résultats et actualités du football mondial",
        "hero.btn1": "Voir les Matchs",
        "hero.btn2": "Nous Contacter",
        "videos.badge": "Vidéos en Direct",
        "videos.title": "Buts & Matchs en Direct",
        "videos.description": "Regardez les buts et les matchs en direct en plein écran",
        "videos.tab1": "Vidéos des Buts",
        "videos.tab2": "Matchs en Direct",
        "news.badge": "Actualités Football",
        "news.title": "Dernières Actualités",
        "news.description": "Restez informé des dernières nouvelles du monde du football",
        "news.title1": "Nouveau record de buts en Premier League",
        "news.excerpt1": "La saison actuelle bat tous les records avec une moyenne de 3.2 buts par match, du jamais vu depuis 10 ans.",
        "news.title2": "Le Barça signe un jeune prodige brésilien",
        "news.excerpt2": "Le FC Barcelona a officialisé la signature du milieu offensif brésilien de 18 ans pour un montant de 65M€.",
        "news.title3": "L'équipe nationale prépare l'Euro 2026",
        "news.excerpt3": "Les Bleus ont entamé leur préparation avec un stage intensif en altitude pour aborder la compétition dans les meilleures conditions.",
        "news.title4": "Nouveau stade ultra-moderne pour le PSG",
        "news.excerpt4": "Le Paris Saint-Germain a dévoilé les plans de son nouveau stade de 60 000 places qui devrait être inauguré en 2028.",
        "stats.badge": "Statistiques",
        "stats.title": "Statistiques et Analyses",
        "stats.description": "Analyses détaillées et statistiques des championnats majeurs",
        "stats.title1": "Meilleurs Buteurs - Liga",
        "stats.title2": "Possession Moyenne - Top 5",
        "stats.title3": "Buts par Championnat",
        "app.title": "Téléchargez Notre Application",
        "app.description": "Accédez à tous les contenus exclusifs, recevez des notifications en direct et profitez d'une expérience optimisée sur mobile",
        "app.download": "Télécharger l'App",
        "about.title": "À Propos de KOORAZONE FOOT",
        "about.text1": "KOORAZONE FOOT est votre destination ultime pour suivre le football en direct. Notre mission est de fournir aux passionnés de football du monde entier un accès facile et rapide aux scores, aux résultats et aux actualités du football.",
        "about.text2": "Fondé en 2023, KOORAZONE FOOT s'est rapidement imposé comme une référence dans le domaine des informations footballistiques en temps réel. Notre plateforme est conçue pour les fans exigeants qui souhaitent rester informés où qu'ils soient.",
        "about.subtitle1": "Notre Mission",
        "about.text3": "Nous nous engageons à fournir des informations précises, à jour et complètes sur tous les événements footballistiques majeurs à travers le monde. Que vous suiviez la Premier League, la Liga, la Serie A ou toute autre compétition, KOORAZONE FOOT est votre compagnon idéal.",
        "about.subtitle2": "Notre Équipe",
        "about.text4": "Our team is made up of football enthusiasts and technology professionals who work tirelessly to continually improve your experience. We combine technical expertise and in-depth knowledge of football to offer you the best possible service.",
        "about.subtitle3": "Ce que nous offrons",
        "about.list1": "Scores en direct et résultats de matchs",
        "about.list2": "Vidéos des buts et moments forts",
        "about.list3": "Statistiques détaillées et classements",
        "about.list4": "Actualités et transferts en temps réel",
        "about.list5": "Calendriers des matchs et rappels personnalisés",
        "privacy.title": "Politique de Confidentialité",
        "privacy.text1": "Cette politique de confidentialité explique comment KOORAZONE FOOT collecte, utilise et protège vos informations personnelles lorsque vous utilisez notre site web.",
        "privacy.subtitle1": "Collecte des informations",
        "privacy.text2": "Nous collectons des informations lorsque vous vous inscrivez sur notre site, vous connectez à votre compte, effectuez un achat, participez à un concours, et/ou lorsque vous vous déconnectez. Les informations collectées incluent votre nom, votre adresse e-mail, votre numéro de téléphone, et/ou votre carte de crédit.",
        "privacy.subtitle2": "Utilisation des informations",
        "privacy.text3": "Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :",
        "privacy.list1": "Personnaliser votre expérience et répondre à vos besoins individuels",
        "privacy.list2": "Fournir un contenu publicitaire personnalisé",
        "privacy.list3": "Améliorer notre site web",
        "privacy.list4": "Améliorer le service client et vos besoins de prise en charge",
        "privacy.list5": "Vous contacter par e-mail",
        "privacy.list6": "Administrer un concours, une promotion, ou une enquête",
        "privacy.subtitle3": "Protection des informations",
        "privacy.text4": "Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage de pointe pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne.",
        "privacy.subtitle4": "Cookies",
        "privacy.text5": "Notre site utilise des cookies pour améliorer l'accès à notre site et identifier les visiteurs réguliers. En outre, nos cookies amélioren l'expérience utilisateur grâce au suivi et au ciblage de ses intérêts. Cependant, cette utilisation des cookies n'est en aucune façon liée à des informations personnelles identifiables sur notre site.",
        "privacy.subtitle5": "Consentement",
        "privacy.text6": "En utilisant notre site, vous consentez à notre politique de confidentialité.",
        "privacy.subtitle6": "Modifications",
        "privacy.text7": "Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.",
        "privacy.lastupdate": "Dernière mise à jour :",
        "contact.title": "Contactez-Nous",
        "contact.text": "Vous avez des questions, des suggestions ou besoin d'assistance ? Notre équipe est là pour vous aider. N'hésitez pas à nous contacter par l'un des moyens ci-dessous.",
        "contact.info": "Informations de Contact",
        "contact.address": "Adresse",
        "contact.phone": "Téléphone",
        "contact.email": "Email",
        "contact.whatsapp": "WhatsApp",
        "contact.sendmsg": "Envoyez un message",
        "contact.hours": "Heures d'Ouverture",
        "contact.weekdays": "Lundi - Vendredi",
        "contact.saturday": "Samedi",
        "contact.sunday": "Dimanche",
        "contact.closed": "Fermé",
        "contact.support": "Support 24/7",
        "contact.emergency": "Disponible pour les urgences",
        "footer.description": "Votre source #1 pour suivre tous les matchs de football en direct, consulter les résultats et rester informé de l'actualité du football mondial.",
        "footer.links": "Liens Rapides",
        "footer.contact": "Contact",
        "footer.rights": "Tous droits réservés.",
        "install.btn": "Installer l'App"
      },
      en: {
        "nav.home": "Home",
        "nav.videos": "Videos",
        "nav.news": "News",
        "nav.stats": "Statistics",
        "nav.about": "About",
        "nav.privacy": "Privacy",
        "nav.contact": "Contact",
        "nav.download": "Download",
        "hero.badge": "Real-time Scores",
        "hero.title": "FOOTBALL LIVE",
        "hero.subtitle": "Follow all matches live, results and news of world football",
        "hero.btn1": "Watch Matches",
        "hero.btn2": "Contact Us",
        "videos.badge": "Live Videos",
        "videos.title": "Goals & Live Matches",
        "videos.description": "Watch goals and live matches in full screen",
        "videos.tab1": "Goal Videos",
        "videos.tab2": "Live Matches",
        "news.badge": "Football News",
        "news.title": "Latest News",
        "news.description": "Stay informed with the latest news from the football world",
        "news.title1": "New goals record in Premier League",
        "news.excerpt1": "The current season breaks all records with an average of 3.2 goals per match, unseen in 10 years.",
        "news.title2": "Barça signs Brazilian wonderkid",
        "news.excerpt2": "FC Barcelona has officialized the signing of the 18-year-old Brazilian attacking midfielder for €65M.",
        "news.title3": "National team prepares for Euro 2026",
        "news.excerpt3": "The Blues have started their preparation with an intensive high-altitude training camp to approach the competition in the best conditions.",
        "news.title4": "New ultra-modern stadium for PSG",
        "news.excerpt4": "Paris Saint-Germain has unveiled plans for its new 60,000-seat stadium to be inaugurated in 2028.",
        "stats.badge": "Statistics",
        "stats.title": "Statistics and Analysis",
        "stats.description": "Detailed analysis and statistics of major leagues",
        "stats.title1": "Top Scorers - La Liga",
        "stats.title2": "Average Possession - Top 5",
        "stats.title3": "Goals by League",
        "app.title": "Download Our App",
        "app.description": "Access all exclusive content, receive live notifications and enjoy an optimized mobile experience",
        "app.download": "Download App",
        "about.title": "About KOORAZONE FOOT",
        "about.text1": "KOORAZONE FOOT is your ultimate destination for live football. Our mission is to provide football enthusiasts worldwide with easy and quick access to scores, results and football news.",
        "about.text2": "Founded in 2023, KOORAZONE FOOT quickly established itself as a reference in the field of real-time football information. Our platform is designed for demanding fans who want to stay informed wherever they are.",
        "about.subtitle1": "Our Mission",
        "about.text3": "We are committed to providing accurate, up-to-date and comprehensive information on all major football events around the world. Whether you follow the Premier League, La Liga, Serie A or any other competition, KOORAZONE FOOT is your ideal companion.",
        "about.subtitle2": "Our Team",
        "about.text4": "Our team is made up of football enthusiasts and technology professionals who work tirelessly to continually improve your experience. We combine technical expertise and in-depth knowledge of football to offer you the best possible service.",
        "about.subtitle3": "What we offer",
        "about.list1": "Live scores and match results",
        "about.list2": "Goal videos and highlights",
        "about.list3": "Detailed statistics and rankings",
        "about.list4": "Real-time news and transfers",
        "about.list5": "Match calendars and personalized reminders",
        "privacy.title": "Privacy Policy",
        "privacy.text1": "This privacy policy explains how KOORAZONE FOOT collects, uses and protects your personal information when you use our website.",
        "privacy.subtitle1": "Information collection",
        "privacy.text2": "We collect information when you register on our site, log into your account, make a purchase, enter a contest, and/or when you log out. The information collected includes your name, your email address, your phone number, and/or your credit card.",
        "privacy.subtitle2": "Use of information",
        "privacy.text3": "All information we collect from you may be used to:",
        "privacy.list1": "Personalize your experience and meet your individual needs",
        "privacy.list2": "Provide personalized advertising content",
        "privacy.list3": "Improve our website",
        "privacy.list4": "Improve customer service and your support needs",
        "privacy.list5": "Contact you by email",
        "privacy.list6": "Administer a contest, promotion, or survey",
        "privacy.subtitle3": "Information protection",
        "privacy.text4": "We implement a variety of security measures to maintain the security of your personal information. We use state-of-the-art encryption to protect sensitive information transmitted online. We also protect your information offline.",
        "privacy.subtitle4": "Cookies",
        "privacy.text5": "Our site uses cookies to improve access to our site and identify regular visitors. Additionally, our cookies improve the user experience by tracking and targeting their interests. However, this use of cookies is in no way linked to personally identifiable information on our site.",
        "privacy.subtitle5": "Consent",
        "privacy.text6": "By using our site, you consent to our privacy policy.",
        "privacy.subtitle6": "Changes",
        "privacy.text7": "We reserve the right to modify this privacy policy at any time. Any changes will be posted on this page.",
        "privacy.lastupdate": "Last updated:",
        "contact.title": "Contact Us",
        "contact.text": "Do you have questions, suggestions or need assistance? Our team is here to help. Feel free to contact us by any of the means below.",
        "contact.info": "Contact Information",
        "contact.address": "Address",
        "contact.phone": "Phone",
        "contact.email": "Email",
        "contact.whatsapp": "WhatsApp",
        "contact.sendmsg": "Send a message",
        "contact.hours": "Opening Hours",
        "contact.weekdays": "Monday - Friday",
        "contact.saturday": "Saturday",
        "contact.sunday": "Sunday",
        "contact.closed": "Closed",
        "contact.support": "24/7 Support",
        "contact.emergency": "Available for emergencies",
        "footer.description": "Your #1 source to follow all football matches live, check results and stay informed of world football news.",
        "footer.links": "Quick Links",
        "footer.contact": "Contact",
        "footer.rights": "All rights reserved.",
        "install.btn": "Install App"
      },
      es: {
        "nav.home": "Inicio",
        "nav.videos": "Videos",
        "nav.news": "Noticias",
        "nav.stats": "Estadísticas",
        "nav.about": "Acerca de",
        "nav.privacy": "Privacidad",
        "nav.contact": "Contacto",
        "nav.download": "Descargar",
        "hero.badge": "Resultados en Tiempo Real",
        "hero.title": "FÚTBOL EN VIVO",
        "hero.subtitle": "Sigue todos los partidos en directo, resultados y noticias del fútbol mundial",
        "hero.btn1": "Ver Partidos",
        "hero.btn2": "Contáctenos",
        "videos.badge": "Videos en Directo",
        "videos.title": "Goles y Partidos en Directo",
        "videos.description": "Mira goles y partidos en directo en pantalla completa",
        "videos.tab1": "Videos de Goles",
        "videos.tab2": "Partidos en Directo",
        "news.badge": "Noticias de Fútbol",
        "news.title": "Últimas Noticias",
        "news.description": "Mantente informado de las últimas noticias del mundo del fútbol",
        "news.title1": "Nuevo récord de goles en la Premier League",
        "news.excerpt1": "La temporada actual bate todos los récords con una media de 3.2 goles por partido, algo no visto en 10 años.",
        "news.title2": "El Barça ficha a una joven promesa brasileña",
        "news.excerpt2": "El FC Barcelona ha oficializado la firma del mediocampista ofensivo brasileño de 18 años por un monto de 65M€.",
        "news.title3": "La selección nacional se prepara para la Euro 2026",
        "news.excerpt3": "Les Bleus han comenzado su preparación con un stage intensivo en altitud para afrontar la competición en las mejores condiciones.",
        "news.title4": "Nuevo estadio ultramoderno para el PSG",
        "news.excerpt4": "El Paris Saint-Germain ha desvelado los planes de su nuevo estadio de 60,000 asientos que se inaugurará en 2028.",
        "stats.badge": "Estadísticas",
        "stats.title": "Estadísticas y Análisis",
        "stats.description": "Análisis detallado y estadísticas de las principales ligas",
        "stats.title1": "Máximos Goleadores - La Liga",
        "stats.title2": "Posesión Media - Top 5",
        "stats.title3": "Goles por Liga",
        "app.title": "Descarga Nuestra App",
        "app.description": "Accede a todos los contenidos exclusivos, recibe notificaciones en directo y disfruta de una experiencia móvil optimizada",
        "app.download": "Descargar App",
        "about.title": "Acerca de KOORAZONE FOOT",
        "about.text1": "KOORAZONE FOOT es tu destino definitivo para seguir el fútbol en directo. Nuestra misión es proporcionar a los apasionados del fútbol de todo el mundo un acceso fácil y rápido a los resultados y noticias del fútbol.",
        "about.text2": "Fundado en 2023, KOORAZONE FOOT se estableció rápidamente como una referencia en el campo de la información futbolística en tiempo real. Nuestra plataforma está diseñada para fans exigentes que desean mantenerse informados dondequiera que estén.",
        "about.subtitle1": "Nuestra Misión",
        "about.text3": "Nos comprometemos a proporcionar información precisa, actualizada y completa sobre todos los principales eventos futbolísticos en todo el mundo. Ya sigas la Premier League, La Liga, la Serie A o cualquier otra competición, KOORAZONE FOOT es tu compañero ideal.",
        "about.subtitle2": "Nuestro Equipo",
        "about.text4": "Nuestro equipo está formado por apasionados del fútbol y profesionales de la tecnología que trabajan incansablemente para mejorar continuamente tu experiencia. Combinamos experiencia técnica y conocimiento profundo del fútbol para ofrecerte el mejor servicio posible.",
        "about.subtitle3": "Lo que ofrecemos",
        "about.list1": "Resultados en directo y marcadores de partidos",
        "about.list2": "Videos de goles y momentos destacados",
        "about.list3": "Estadísticas detalladas y clasificaciones",
        "about.list4": "Noticias y transferencias en tiempo real",
        "about.list5": "Calendarios de partidos y recordatorios personalizados",
        "privacy.title": "Política de Privacidad",
        "privacy.text1": "Esta política de privacidad explica cómo KOORAZONE FOOT recopila, utiliza y protege su información personal cuando utiliza nuestro sitio web.",
        "privacy.subtitle1": "Recopilación de información",
        "privacy.text2": "Recopilamos información cuando se registra en nuestro sitio, inicia sesión en su cuenta, realiza una compra, participa en un concurso y/o cuando cierra sesión. La información recopilada incluye su nombre, dirección de correo electrónico, número de teléfono y/o tarjeta de crédito.",
        "privacy.subtitle2": "Uso de la información",
        "privacy.text3": "Toda la información que recopilamos de usted puede ser utilizada para:",
        "privacy.list1": "Personalizar su experiencia y satisfacer sus necesidades individuales",
        "privacy.list2": "Proporcionar contenido publicitario personalizado",
        "privacy.list3": "Mejorar nuestro sitio web",
        "privacy.list4": "Mejorar el servicio al cliente y sus necesidades de soporte",
        "privacy.list5": "Contactarle por correo electrónico",
        "privacy.list6": "Administrar un concurso, promoción o encuesta",
        "privacy.subtitle3": "Protección de la información",
        "privacy.text4": "Implementamos una variedad de medidas de seguridad para preservar la seguridad de su información personal. Utilizamos encriptación de última generación para proteger la información sensible transmitida en línea. También protegemos su información fuera de línea.",
        "privacy.subtitle4": "Cookies",
        "privacy.text5": "Nuestro sitio utiliza cookies para mejorar el acceso a nuestro sitio e identificar a los visitantes habituales. Además, nuestras cookies mejoran la experiencia del usuario mediante el seguimiento y la orientación de sus intereses. Sin embargo, este uso de cookies no está de ninguna manera vinculado a información personal identificable en nuestro sitio.",
        "privacy.subtitle5": "Consentimiento",
        "privacy.text6": "Al utilizar nuestro sitio, usted acepta nuestra política de privacidad.",
        "privacy.subtitle6": "Modificaciones",
        "privacy.text7": "Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio se publicará en esta página.",
        "privacy.lastupdate": "Última actualización:",
        "contact.title": "Contáctenos",
        "contact.text": "¿Tiene preguntas, sugerencias o necesita asistencia? Nuestro equipo está aquí para ayudarle. No dude en contactarnos por cualquiera de los medios a continuación.",
        "contact.info": "Información de Contacto",
        "contact.address": "Dirección",
        "contact.phone": "Teléfono",
        "contact.email": "Email",
        "contact.whatsapp": "WhatsApp",
        "contact.sendmsg": "Enviar mensaje",
        "contact.hours": "Horario de Atención",
        "contact.weekdays": "Lunes - Viernes",
        "contact.saturday": "Sábado",
        "contact.sunday": "Domingo",
        "contact.closed": "Cerrado",
        "contact.support": "Soporte 24/7",
        "contact.emergency": "Disponible para emergencias",
        "footer.description": "Tu fuente #1 para seguir todos los partidos de fútbol en directo, consultar resultados y mantenerte informado de las noticias del fútbol mundial.",
        "footer.links": "Enlaces Rápidos",
        "footer.contact": "Contacto",
        "footer.rights": "Todos los derechos reservados.",
        "install.btn": "Instalar App"
      },
      ar: {
        "nav.home": "الصفحة الرئيسية",
        "nav.videos": "فيديوهات",
        "nav.news": "أخبار",
        "nav.stats": "إحصائيات",
        "nav.about": "من نحن",
        "nav.privacy": "الخصوصية",
        "nav.contact": "اتصل بنا",
        "nav.download": "تحميل",
        "hero.badge": "النتائج المباشرة",
        "hero.title": "كرة القدم مباشر",
        "hero.subtitle": "تابع جميع المباريات مباشرة، النتائج وأخبار كرة القدم العالمية",
        "hero.btn1": "شاهد المباريات",
        "hero.btn2": "اتصل بنا",
        "videos.badge": "فيديوهات مباشرة",
        "videos.title": "الأهداف والمباريات المباشرة",
        "videos.description": "شاهد الأهداف والمباريات المباشرة في ملء الشاشة",
        "videos.tab1": "فيديوهات الأهداف",
        "videos.tab2": "مباريات مباشرة",
        "news.badge": "أخبار كرة القدم",
        "news.title": "آخر الأخبار",
        "news.description": "ابق على اطلاع بآخر أخبار عالم كرة القدم",
        "news.title1": "رقم قياسي جديد للأهداف في الدوري الإنجليزي",
        "news.excerpt1": "الموسم الحالي يحطم جميع الأرقام القياسية بمعدل 3.2 هدف في المباراة، لم يشهد منذ 10 سنوات.",
        "news.title2": "برشلونة يوقع مع نجم برازيلي صاعد",
        "news.excerpt2": "أعلن نادي برشلونة رسميًا توقيع عقد مع الوسط الهجومي البرازيلي البالغ 18 عامًا مقابل 65 مليون يورو.",
        "news.title3": "المنتخب الوطني يستعد لبطولة أمم أوروبا 2026",
        "news.excerpt3": "بدأ المنتخب الفرنسي تحضيراته بمعسكر مكثف على المرتفعات لمواجهة المنافسة في أفضل الظروف.",
        "news.title4": "ملعب جديد فائق التطور لباريس سان جيرمان",
        "news.excerpt4": "كشف باريس سان جيرمان عن خطط ملعبه الجديد الذي يتسع لـ60,000 متفرض ومن المقرر افتتاحه في 2028.",
        "stats.badge": "إحصائيات",
        "stats.title": "الإحصائيات والتحليلات",
        "stats.description": "تحليلات مفصلة وإحصائيات لأهم البطولات",
        "stats.title1": "أفضل الهدافين - الدوري الإسباني",
        "stats.title2": "متوسط الاستحواذ - أفضل 5",
        "stats.title3": "الأهداف حسب البطولة",
        "app.title": "حمّل تطبيقنا",
        "app.description": "تمتع بالوصول إلى جميع المحتويات الحصرية، واستقبل الإشعارات المباشرة واستمتع بتجربة محسنة على الهاتف المحمول",
        "app.download": "تحميل التطبيق",
        "about.title": "عن كورة زون فوت",
        "about.text1": "كورة زون فوت هي وجهتك النهائية لمتابعة كرة القدم مباشرة. مهمتنا هي تزويد عشاق كرة القدم في جميع أنحاء العالم بوصول سهل وسريع إلى النتائج والأخبار.",
        "about.text2": "تأسست في عام 2023، سرعان ما أصبحت كورة زون فوت مرجعًا في مجال معلومات كرة القدم في الوقت الفعلي. تم تصميم منصتنا للجماهير المتطلبة التي ترغب في البقاء على اطلاع أينما كانت.",
        "about.subtitle1": "مهمتنا",
        "about.text3": "نلتزم بتقديم معلومات دقيقة وحديثة وشاملة عن جميع الأحداث الكروية الكبرى حول العالم. سواء كنت تتابع الدوري الإنجليزي، الليغا، السيريا أ أو أي منافسة أخرى، كورة زون فوت هي رفيقك المثالي.",
        "about.subtitle2": "فريقنا",
        "about.text4": "يتكون فريقنا من عشاق كرة القدم ومحترفي التكنولوجيا الذين يعملون بلا كلل لتحسين تجربتك باستمرار. نجمع بين الخبرة الفنية والمعرفة العميقة بكرة القدم لتقديم أفضل خدمة ممكنة.",
        "about.subtitle3": "ما نقدمه",
        "about.list1": "النتائج المباشرة ونتائج المباريات",
        "about.list2": "فيديوهات الأهداف وأبرز اللحظات",
        "about.list3": "الإحصائيات التفصيلية والترتيب",
        "about.list4": "الأخبار والانتقالات في الوقت الفعلي",
        "about.list5": "تقويمات المباريات وتذكيرات مخصصة",
        "privacy.title": "سياسة الخصوصية",
        "privacy.text1": "تشرح سياسة الخصوصية هذه كيف تجمع كورة زون فوت وتستخدم وتحمي معلوماتك الشخصية عند استخدامك لموقعنا الإلكتروني.",
        "privacy.subtitle1": "جمع المعلومات",
        "privacy.text2": "نقوم بجمع المعلومات عند التسجيل في موقعنا، تسجيل الدخول إلى حسابك، إجراء عملية شراء، المشاركة في مسابقة، و/أو عند تسجيل الخروج. تشمل المعلومات التي تم جمعها اسمك، عنوان بريدك الإلكتروني، رقم هاتفك، و/أو بطاقتك الائتمانية.",
        "privacy.subtitle2": "استخدام المعلومات",
        "privacy.text3": "يمكن استخدام جميع المعلومات التي نجمعها منك من أجل:",
        "privacy.list1": "تخصيص تجربتك وتلبية احتياجاتك الفردية",
        "privacy.list2": "تقديم محتوى إعلاني مخصص",
        "privacy.list3": "تحسين موقعنا الإلكتروني",
        "privacy.list4": "تحسين خدمة العملاء واحتياجات الدعم الخاصة بك",
        "privacy.list5": "الاتصال بك عبر البريد الإلكتروني",
        "privacy.list6": "إدارة مسابقة، عرض ترويجي، أو استطلاع",
        "privacy.subtitle3": "حماية المعلومات",
        "privacy.text4": "ننفذ مجموعة متنوعة من إجراءات الأمن للحفاظ على أمان معلوماتك الشخصية. نستخدم تشفيرًا متقدمًا لحماية المعلومات الحساسة المنقولة عبر الإنترنت. كما نقوم بحماية معلوماتك دون اتصال بالإنترنت.",
        "privacy.subtitle4": "الكوكيز",
        "privacy.text5": "يستخدم موقعنا الكوكيز لتحسين الوصول إلى موقعنا وتحديد الزوار المنتظمين. بالإضافة إلى ذلك، تحسن كوكيزنا تجربة المستخدم من خلال تتبع وتهيئة اهتماماته. ومع ذلك، فإن هذا الاستخدام للكوكيز لا يرتبط بأي حال بمعلومات تعريف شخصية على موقعنا.",
        "privacy.subtitle5": "الموافقة",
        "privacy.text6": "باستخدام موقعنا، فإنك توافق على سياسة الخصوصية الخاصة بنا.",
        "privacy.subtitle6": "التعديلات",
        "privacy.text7": "نحتفظ بالحق في تعديل سياسة الخصوصية هذه في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة.",
        "privacy.lastupdate": "آخر تحديث:",
        "contact.title": "اتصل بنا",
        "contact.text": "هل لديك أسئلة أو اقتراحات أو تحتاج إلى مساعدة؟ فريقنا هنا لمساعدتك. لا تتردد في الاتصال بنا بأي من الوسائل أدناه.",
        "contact.info": "معلومات الاتصال",
        "contact.address": "العنوان",
        "contact.phone": "الهاتف",
        "contact.email": "البريد الإلكتروني",
        "contact.whatsapp": "واتساب",
        "contact.sendmsg": "أرسل رسالة",
        "contact.hours": "ساعات العمل",
        "contact.weekdays": "الإثنين - الجمعة",
        "contact.saturday": "السبت",
        "contact.sunday": "الأحد",
        "contact.closed": "مغلق",
        "contact.support": "دعم 24/7",
        "contact.emergency": "متاح للطوارئ",
        "footer.description": "مصدرك الأول لمتابعة جميع مباريات كرة القدم مباشرة، الاطلاع على النتائج والبقاء على اطلاع بأخبار كرة القدم العالمية.",
        "footer.links": "روابط سريعة",
        "footer.contact": "اتصل بنا",
        "footer.rights": "جميع الحقوق محفوظة.",
        "install.btn": "تثبيت التطبيق",
        "videos.loading": "جاري التحميل..."
      },
      it: {
        "nav.home": "Home",
        "nav.videos": "Video",
        "nav.news": "Notizie",
        "nav.stats": "Statistiche",
        "nav.about": "Chi siamo",
        "nav.privacy": "Privacy",
        "nav.contact": "Contatto",
        "nav.download": "Scarica",
        "hero.badge": "Punteggi in Tempo Reale",
        "hero.title": "CALCIO IN DIRETTA",
        "hero.subtitle": "Segui tutte le partite in diretta, i risultati e le notizie del calcio mondiale",
        "hero.btn1": "Guarda le Partite",
        "hero.btn2": "Contattaci",
        "videos.badge": "Video in Diretta",
        "videos.title": "Gol e Partite in Diretta",
        "videos.description": "Guarda i gol e le partite in diretta a schermo intero",
        "videos.tab1": "Video dei Gol",
        "videos.tab2": "Partite in Diretta",
        "news.badge": "Notizie di Calcio",
        "news.title": "Ultime Notizie",
        "news.description": "Rimani informato sulle ultime notizie dal mondo del calcio",
        "news.title1": "Nuovo record di gol in Premier League",
        "news.excerpt1": "La stagione attuale batte tutti i record con una media di 3.2 gol a partita, mai vista da 10 anni.",
        "news.title2": "Il Barça ingaggia un giovane prodigio brasiliano",
        "news.excerpt2": "Il FC Barcelona ha ufficializzato l'ingaggio del trequartista brasiliano di 18 anni per 65 milioni di euro.",
        "news.title3": "La nazionale si prepara per Euro 2026",
        "news.excerpt3": "I Bleus hanno iniziato la loro preparazione con un ritiro intensivo in altura per affrontare la competizione nelle migliori condizioni.",
        "news.title4": "Nuovo stadio ultramoderno per il PSG",
        "news.excerpt4": "Il Paris Saint-Germain ha svelato i piani per il suo nuovo stadio da 60.000 posti che dovrebbe essere inaugurato nel 2028.",
        "stats.badge": "Statistiche",
        "stats.title": "Statistiche e Analisi",
        "stats.description": "Analisi dettagliate e statistiche dei principali campionati",
        "stats.title1": "Migliori Marcatori - La Liga",
        "stats.title2": "Possesso Palla Medio - Top 5",
        "stats.title3": "Gol per Campionato",
        "app.title": "Scarica la Nostra App",
        "app.description": "Accedi a tutti i contenuti esclusivi, ricevi notifiche in diretta e goditi un'esperienza mobile ottimizzata",
        "app.download": "Scarica l'App",
        "footer.description": "La tua fonte n.1 per seguire tutte le partite di calcio in diretta, consultare i risultati e rimanere informato sulle notizie del calcio mondiale.",
        "footer.links": "Link Rapidi",
        "footer.contact": "Contatto",
        "footer.rights": "Tutti i diritti riservati.",
        "install.btn": "Installa l'App",
        "videos.loading": "Caricamento in corso..."
      }
    };

    // DOM Elements
    const elements = {
      navbar: document.getElementById('navbar'),
      navLinks: document.getElementById('navLinks'),
      mobileMenuBtn: document.getElementById('mobileMenuBtn'),
      installBtn: document.getElementById('installBtn'),
      splashScreen: document.getElementById('splashScreen'),
      languageBtn: document.getElementById('languageBtn'),
      languageDropdown: document.getElementById('languageDropdown'),
      currentLanguage: document.getElementById('currentLanguage'),
      bottomLanguageBtn: document.getElementById('bottomLanguageBtn'),
      bottomLanguageSelector: document.getElementById('bottomLanguageSelector')
    };

    // Set initial language
    let currentLang = 'fr';

    // Initialize App
    function initializeApp() {
      setupNavigation();
      setupVideoTabs();
      setupSmoothScrolling();
      setupVideoLoading();
      setupPWA();
      setupBottomNav();
      setupSplashScreen();
      setupLanguageSelector();
      setupBottomLanguageSelector();
      initSwiper();
      loadStories(); // Remplacer initCharts par loadStories
      setupSectionObserver(); // Initialiser l'observateur pour les animations
      setupRefreshButton(); // Initialiser le bouton de rafraîchissement
    } 
    
    // NOUVEAU : Logique pour charger les actualités automatiquement
    async function loadNews() {
      const newsWrapper = document.getElementById('news-wrapper');
      newsWrapper.innerHTML = `
        <div class="swiper-slide">
          <div class="news-content" style="justify-content: center; align-items: center; height: 300px;">
            <i class="fas fa-spinner fa-spin fa-2x"></i>
            <p style="margin-top: 1rem;">Chargement des actualités...</p>
          </div>
        </div>
      `;

      try {
        const url = 'https://koora-ai.onrender.com/latest-news' + (force ? '?force=true' : '');
        const response = await fetch(url);
        if (!response.ok) throw new Error('La réponse du serveur n\'est pas OK');
        const newsList = await response.json();

        newsWrapper.innerHTML = ''; // Vider le loader

        newsList.forEach(news => {
          const newsSlide = document.createElement('div');
          newsSlide.className = 'swiper-slide';
          newsSlide.innerHTML = `
            <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=60" alt="Live Football" class="news-image">
            <div class="news-content">
              <h3 class="news-title" style="font-size: 1.1rem;">${news.title}</h3>
              <p class="news-excerpt">${news.excerpt}</p>
              <span class="news-date">${new Date().toLocaleDateString('fr-FR')}</span>
            </div>
          `;
          newsWrapper.appendChild(newsSlide);
        });

        // Ré-initialiser Swiper après avoir ajouté les slides
        initSwiper();

        // Relancer le chargement après 5 minutes
        setTimeout(() => loadNews(true), 1000 * 60 * 5); // 5 minutes

      } catch (error) {
        console.error("Erreur lors du chargement des actualités:", error);
        newsWrapper.innerHTML = `
          <div class="swiper-slide"><div class="news-content" style="justify-content: center; align-items: center; height: 300px;">
            <p>Impossible de charger les actualités.</p>
          </div></div>`;
      }
    }

    // NOUVEAU : Animation des sections au défilement
    function setupSectionObserver() {
      const sections = document.querySelectorAll('section');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('section-enter');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      sections.forEach(section => { section.classList.add('section-enter'); observer.observe(section); });
    }

    // NOUVEAU : Logique pour le bouton de rafraîchissement
    function setupRefreshButton() {
      const refreshBtn = document.getElementById('refresh-news-btn');
      if (!refreshBtn) return;

      refreshBtn.addEventListener('click', async () => {
        const icon = refreshBtn.querySelector('i');
        icon.classList.add('fa-spin'); // Animer l'icône
        refreshBtn.disabled = true;

        await loadNews(true); // Appeler loadNews avec le paramètre 'force'

        icon.classList.remove('fa-spin');
        refreshBtn.disabled = false;
      });
    }

    // NOUVEAU : Logique pour l'assistant IA
    function setupAIAssistant() {
      const askBtn = document.getElementById('ask-ai-btn');
      const questionInput = document.getElementById('ai-question-input');
      const responseContainer = document.getElementById('ai-response-container');
      const responseContent = document.getElementById('ai-response-content');

      askBtn.addEventListener('click', async () => {
        const question = questionInput.value;
        if (!question.trim()) {
          alert('Veuillez poser une question.');
          return;
        }

        askBtn.disabled = true;
        askBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        responseContainer.style.display = 'none';

        try {
          const response = await fetch('https://koora-ai.onrender.com/ask-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: question })
          });

          const data = await response.json();
          responseContent.textContent = data.answer;
          responseContainer.style.display = 'block';

        } catch (error) {
          console.error("Erreur:", error);
          responseContent.textContent = "Impossible de contacter l'assistant IA. Vérifiez que le serveur est bien démarré.";
          responseContainer.style.display = 'block';
        } finally {
          askBtn.disabled = false;
          askBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
          questionInput.value = ''; // Vider le champ de question
        }
      });
    }

    // Navigation
    function setupNavigation() {
      elements.mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
      
      // Close menu when clicking on links
      elements.navLinks?.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
          closeMobileMenu();
        }
      });
      
      // Navbar scroll effect
      window.addEventListener('scroll', handleNavbarScroll, { passive: true });
      setupAIAssistant(); // Initialiser l'assistant IA
      loadNews(); // Charger les actualités au démarrage
    }

    function toggleMobileMenu() {
      elements.navLinks?.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
      
      const icon = elements.mobileMenuBtn?.querySelector('i');
      if (icon) {
        icon.className = elements.navLinks?.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    }

    function closeMobileMenu() {
      elements.navLinks?.classList.remove('active');
      document.body.classList.remove('no-scroll');
      
      const icon = elements.mobileMenuBtn?.querySelector('i');
      if (icon) {
        icon.className = 'fas fa-bars';
      }
    }

    function handleNavbarScroll() {
      const scrolled = window.scrollY > 50;
      elements.navbar?.classList.toggle('scrolled', scrolled);
    }

    // Video Tabs
    function setupVideoTabs() {
      const tabButtons = document.querySelectorAll('.video-tabs .tab-btn');
      
      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          const tabType = button.getAttribute('data-tab');
          
          // Mettre à jour les onglets actifs
          tabButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Sur mobile, on bascule la classe 'active' pour afficher/cacher
          if (window.innerWidth < 992) {
            document.querySelectorAll('.video-iframe-container').forEach(iframe => {
              iframe.classList.remove('active');
            });
            document.getElementById(`${tabType}-video`).classList.add('active');
          }
          // Sur desktop, les deux sont déjà visibles, donc pas d'action nécessaire.
        });
      });
      // Afficher le premier onglet par défaut sur mobile
      document.querySelector('.video-iframe-container').classList.add('active');
    }

    // Smooth Scrolling
    function setupSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const navbarHeight = elements.navbar?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }

    // Video Loading Indicator
    function setupVideoLoading() {
      const iframes = document.querySelectorAll('.video-iframe');
      
      iframes.forEach(iframe => {
        const container = iframe.parentElement;
        const loader = document.createElement('div');
        loader.className = 'video-loading';
        loader.innerHTML = '<i class="fas fa-spinner"></i> <span data-key="videos.loading">Chargement en cours...</span>';
        
        // Add loader before iframe
        container.appendChild(loader);
        
        iframe.addEventListener('load', () => {
          // Hide loader when video is loaded
          loader.style.display = 'none';
        });
      });
    }

    // Bottom Navigation
    function setupBottomNav() {
      const navItems = document.querySelectorAll('.bottom-nav-item');
      
      navItems.forEach(item => {
        item.addEventListener('click', function() {
          navItems.forEach(i => i.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }

    // Splash Screen
    function setupSplashScreen() {
      // Simuler un temps de chargement
      setTimeout(() => {
        elements.splashScreen.style.opacity = '0';
        setTimeout(() => {
          elements.splashScreen.style.display = 'none';
        }, 500);
      }, 2000);
    }

    // Language Selector
    function setupLanguageSelector() {
      // Toggle dropdown
      elements.languageBtn.addEventListener('click', () => {
        elements.languageDropdown.classList.toggle('show');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) {
          elements.languageDropdown.classList.remove('show');
        }
      });
      
      // Handle language change
      document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => {
          const lang = option.getAttribute('data-lang');
          changeLanguage(lang);
          elements.languageDropdown.classList.remove('show');
        });
      });
    }
    
    // Bottom Language Selector
    function setupBottomLanguageSelector() {
      // Toggle dropdown
      elements.bottomLanguageBtn.addEventListener('click', () => {
        elements.bottomLanguageSelector.classList.toggle('show');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.bottom-language-btn') && !e.target.closest('.bottom-language-selector')) {
          elements.bottomLanguageSelector.classList.remove('show');
        }
      });
      
      // Handle language change
      document.querySelectorAll('.bottom-language-option').forEach(option => {
        option.addEventListener('click', () => {
          const lang = option.getAttribute('data-lang');
          changeLanguage(lang);
          elements.bottomLanguageSelector.classList.remove('show');
        });
      });
    }
    
    // Change language
    function changeLanguage(lang) {
      currentLang = lang;
      
      // Update UI elements
      elements.currentLanguage.textContent = lang.toUpperCase();
      
      // Update body direction for RTL languages
      if (lang === 'ar') {
        document.body.classList.add('rtl');
        document.body.setAttribute('dir', 'rtl');
      } else {
        document.body.classList.remove('rtl');
        document.body.setAttribute('dir', 'ltr');
      }
      
      // Update all translatable elements
      document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
          element.textContent = translations[lang][key];
        }
      });

      // Mettre à jour le texte du loader
      const loaderText = document.querySelector('.video-loading span');
      if(loaderText) {
        loaderText.textContent = translations[lang]["videos.loading"] || "Chargement en cours...";
      }
    }

    // Initialize Swiper carousel
    function initSwiper() {
      new Swiper('.newsSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        loop: true,
      });
    }

    // Initialize Charts
    async function loadStories() {
      const storiesGrid = document.getElementById('stories-grid');
      try {
        const response = await fetch('https://koora-ai.onrender.com/football-stories');
        if (!response.ok) throw new Error('La réponse du serveur pour les histoires n\'est pas OK');
        const stories = await response.json();

        storiesGrid.innerHTML = ''; // Vider le loader

        const icons = ['fa-trophy', 'fa-futbol', 'fa-history', 'fa-star'];

        stories.forEach((story, index) => {
          const storyCard = document.createElement('div');
          storyCard.className = 'stat-card';
          storyCard.innerHTML = `
            <i class="fas ${icons[index % icons.length]} fa-2x" style="color: var(--primary-color); margin-bottom: 1rem;"></i>
            <h3 class="stat-title">${story.title}</h3>
            <p style="text-align: left; color: var(--text-muted);">${story.story}</p>
          `;
          storiesGrid.appendChild(storyCard);
        });

      } catch (error) {
        console.error("Erreur lors du chargement des histoires:", error);
        storiesGrid.innerHTML = '<p>Impossible de charger les histoires pour le moment.</p>';
      }
    }

    // PWA Setup
    function setupPWA() {
      let deferredPrompt;

      // Événement déclenché lorsque le navigateur détecte que l'app est installable
      window.addEventListener('beforeinstallprompt', (e) => {
        // Empêcher le navigateur de montrer immédiatement la bannière d'installation
        e.preventDefault();
        // Stocker l'événement pour qu'il puisse être déclenché plus tard
        deferredPrompt = e;
        // Montrer le bouton d'installation
        elements.installBtn.classList.add('show');
      });
      
      // Gestion du clic sur le bouton d'installation
      elements.installBtn.addEventListener('click', () => {
        // Montrer la bannière d'installation
        deferredPrompt.prompt();
        // Attendre que l'utilisateur réponde à la bannière
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('L\'utilisateur a installé l\'application');
          } else {
            console.log('L\'utilisateur a refusé d\'installer l\'application');
          }
          // Réinitialiser la variable
          deferredPrompt = null;
          // Cacher le bouton
          elements.installBtn.classList.remove('show');
        });
      });
      
      // Événement déclenché après l'installation
      window.addEventListener('appinstalled', () => {
        console.log('L\'application a été installée avec succès');
        elements.installBtn.classList.remove('show');
      });
    }

    // Initialize everything when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
      initializeApp();
    }
  </script>
  
  <!-- ScoreBat API Script -->
  <script>
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://www.scorebat.com/embed/embed.js?v=arrv';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'scorebat-jssdk'));
  </script>
  
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2167865407816280"
     crossorigin="anonymous"></script>
  <!-- Pub -->
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-2167865407816280"
       data-ad-slot="4533702374"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
       (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</body>
</html>

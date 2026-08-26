import { Product } from '../types';
import { gtaViBase64 } from './gtaImage';
import eafc27Cover from '../assets/images/eafc_27_cover_1787767502324.jpg';

export const products: Product[] = [
  {
    id: 'gta-vi',
    name: 'Grand Theft Auto VI',
    description: 'Grand Theft Auto VI vai até o estado de Leonida, onde ficam as ruas cheias de neon de Vice City e além, na maior e mais envolvente evolução da série Grand Theft Auto até hoje.',
    image: gtaViBase64,
    platform: 'PC / Consoles (Rockstar Games)',
    category: 'Ação / Mundo Aberto',
    price: 349.90,
    originalPrice: 399.90,
    badge: 'Lançamento',
    discount: 12,
    featured: true,
    developer: 'Rockstar Games',
    rating: 5.0
  },
  {
    id: 'eafc-27',
    name: 'EA SPORTS FC 27 — Standard Edition',
    description: 'O futuro do futebol virtual com tecnologia HyperMotionV atualizada, modos Ultimate Team reformulados e todas as ligas mundiais licenciadas.',
    image: eafc27Cover,
    platform: 'PC (EA App / Steam)',
    category: 'Esportes',
    price: 129.90,
    badge: 'Lançamento',
    featured: true,
    developer: 'EA Sports',
    rating: 4.8
  },
  {
    id: 'rdr-2',
    name: 'Red Dead Redemption 2',
    description: 'Vencedor de mais de 175 prêmios de Jogo do Ano. Uma saga épica sobre honra, lealdade e sobrevivência nos estertores do Velho Oeste americano.',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg',
    platform: 'PC (Rockstar / Steam)',
    category: 'Ação / Mundo Aberto',
    price: 89.90,
    originalPrice: 299.90,
    badge: 'Oferta',
    discount: 70,
    featured: true,
    developer: 'Rockstar Games',
    rating: 5.0
  },
  {
    id: 'cyberpunk-2077',
    name: 'Cyberpunk 2077: Ultimate Edition',
    description: 'Explore a megalópole futurista de Night City como V, um mercenário urbano. Inclui a aclamada expansão de suspense de espionagem Phantom Liberty.',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg',
    platform: 'PC (GOG / Steam)',
    category: 'RPG',
    price: 79.90,
    originalPrice: 199.90,
    badge: 'Destaque',
    discount: 60,
    featured: true,
    developer: 'CD PROJEKT RED',
    rating: 4.8
  },
  {
    id: 'elden-ring',
    name: 'Elden Ring: Shadow of the Erdtree Edition',
    description: 'Levante-se, Maculado, e seja guiado pela graça até as Terras Intermédias para brandir o poder do Anel Prístino e se tornar um Lorde Prístino.',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
    platform: 'PC (Steam)',
    category: 'RPG',
    price: 149.90,
    originalPrice: 229.90,
    badge: 'Mais vendido',
    discount: 35,
    developer: 'FromSoftware',
    rating: 4.9
  },
  {
    id: 'hogwarts-legacy',
    name: 'Hogwarts Legacy: Digital Deluxe',
    description: 'Viva o inesperado no Mundo Bruxo do século XIX. Explore Hogwarts, domine feitiços, crie poções e decida o destino do mundo mágico.',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/990080/header.jpg',
    platform: 'PC (Steam)',
    category: 'RPG / Mundo Aberto',
    price: 69.90,
    originalPrice: 249.90,
    badge: 'Oferta',
    discount: 72,
    developer: 'Avalanche Software',
    rating: 4.7
  },
  {
    id: 'forza-horizon-5',
    name: 'Forza Horizon 5: Premium Edition',
    description: 'Sua derradeira aventura Horizon te aguarda! Explore as vibrantes e em constante evolução paisagens do México ao volante de centenas dos melhores carros do mundo.',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1551360/header.jpg',
    platform: 'PC (Xbox / Windows)',
    category: 'Corrida',
    price: 84.90,
    originalPrice: 249.90,
    badge: 'Oferta',
    discount: 66,
    developer: 'Playground Games',
    rating: 4.8
  },
  {
    id: 'resident-evil-4',
    name: 'Resident Evil 4 Remake: Gold Edition',
    description: 'A sobrevivência é apenas o começo. Leon S. Kennedy é enviado a um vilarejo europeu isolado para resgatar a filha do presidente dos EUA.',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg',
    platform: 'PC (Steam)',
    category: 'Terror',
    price: 99.90,
    originalPrice: 199.90,
    badge: 'Destaque',
    discount: 50,
    developer: 'Capcom',
    rating: 4.9
  },
  {
    id: 'age-of-empires-4',
    name: 'Age of Empires IV: Anniversary Edition',
    description: 'Comande civilizações históricas em batalhas épicas em tempo real com fidelidade gráfica impressionante e campanhas estratégicas profundas.',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1466860/header.jpg',
    platform: 'PC (Steam / Xbox)',
    category: 'Estratégia',
    price: 64.90,
    originalPrice: 129.90,
    discount: 50,
    developer: 'Relic Entertainment',
    rating: 4.6
  }
];

export const categories: string[] = [
  'Todos',
  'Ação',
  'Esportes',
  'RPG',
  'Corrida',
  'Terror',
  'Mundo Aberto',
  'Estratégia'
];

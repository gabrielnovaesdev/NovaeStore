import { Product } from '../types';

/**
 * IMPORTANTE SOBRE O CATÁLOGO:
 * Os produtos listados abaixo são dados de demonstração (mockados) para o desenvolvimento do frontend da NovaeStore.
 * A comercialização de jogos, chaves, licenças ou acessos digitais reais deve ocorrer somente quando houver devida autorização/integração com distribuidoras oficiais.
 * Esta estrutura está pronta para ser substituída por uma requisição GET /api/products no backend Antigravity.
 */
export const products: Product[] = [
  {
    id: 'gta-iv',
    name: 'Grand Theft Auto IV: The Complete Edition',
    description: 'Niko Bellic chega a Liberty City em busca do Sonho Americano. Inclui o jogo base e os episódios The Lost and Damned e The Ballad of Gay Tony.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
    platform: 'PC (Steam / Rockstar)',
    category: 'Ação / Mundo Aberto',
    price: 49.90,
    originalPrice: 99.90,
    badge: 'Mais vendido',
    discount: 50,
    featured: true,
    developer: 'Rockstar Games',
    rating: 4.9
  },
  {
    id: 'eafc-27',
    name: 'EA SPORTS FC 27 — Standard Edition',
    description: 'O futuro do futebol virtual com tecnologia HyperMotionV atualizada, modos Ultimate Team reformulados e todas as ligas mundiais licenciadas.',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1000',
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
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000',
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
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
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
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1000',
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
    image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&q=80&w=1000',
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
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1000',
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
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1000',
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
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=1000',
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

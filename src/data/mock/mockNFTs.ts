import { type NFT } from '../../types/nft';

// Import local NFT images
import BoredApeImg from '../../assets/Bored_Ape_Yacht_Club.jpg';
import AzukiImg from '../../assets/Azuki.jpg';
import PudgyPenguinsImg from '../../assets/Pudgy_Penguins.jpg';
import CryptoPunksImg from '../../assets/CryptoPunks.jpg';
import DoodlesImg from '../../assets/Doodles.jpg';
import MoonbirdsImg from '../../assets/Moonbirds.jpg';
import CloneXImg from '../../assets/CloneX.jpg';
import DeGodImg from '../../assets/DeGod.jpg';
import MutantApeImg from '../../assets/Mutant_Ape.jpg';
import MeebitImg from '../../assets/Meebit.jpg';
import VeeFriendsImg from '../../assets/VeeFriends.jpg';
import CoolCatImg from '../../assets/cool_cat.png';
import WorldOfWomenImg from '../../assets/World_of_Women.jpg';
import CyberWarriorImg from '../../assets/Cyber_Warrior.jpg';
import AbstractRealmImg from '../../assets/Abstract_Realm.jpg';

// Real NFT Collections with local images
export const mockNFTs: NFT[] = [
  // Bored Ape Yacht Club
  {
    id: 'bayc-1',
    name: 'Bored Ape #8817',
    description: 'Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain.',
    image: BoredApeImg,
    price: 35.5,
    currency: 'ETH',
    creator: {
      name: 'Yuga Labs',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'Bored Ape Yacht Club',
      floorPrice: 30.2
    },
    rarity: 'Legendary',
    likes: 2847,
    views: 15234,
    lastSale: 33.8,
    onSale: true
  },
  // Azuki
  {
    id: 'azuki-1',
    name: 'Azuki #3333',
    description: 'A brand for the metaverse built by Chiru Labs. Take the red bean to join the garden.',
    image: AzukiImg,
    price: 12.8,
    currency: 'ETH',
    creator: {
      name: 'Chiru Labs',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'Azuki',
      floorPrice: 11.5
    },
    rarity: 'Epic',
    likes: 1923,
    views: 8745,
    lastSale: 12.2,
    onSale: true
  },
  // Pudgy Penguins
  {
    id: 'pudgy-1',
    name: 'Pudgy Penguin #6969',
    description: 'Pudgy Penguins is a collection of 8,888 NFTs waddling around on the Ethereum blockchain.',
    image: PudgyPenguinsImg,
    price: 8.9,
    currency: 'ETH',
    creator: {
      name: 'Pudgy Penguins',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'Pudgy Penguins',
      floorPrice: 8.2
    },
    rarity: 'Rare',
    likes: 1456,
    views: 6234,
    lastSale: 8.5,
    onSale: true
  },
  // CryptoPunks
  {
    id: 'punk-1',
    name: 'CryptoPunk #5217',
    description: '10,000 unique collectible characters with proof of ownership stored on the Ethereum blockchain.',
    image: CryptoPunksImg,
    price: 65.0,
    currency: 'ETH',
    creator: {
      name: 'Larva Labs',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'CryptoPunks',
      floorPrice: 60.0
    },
    rarity: 'Legendary',
    likes: 5234,
    views: 25678,
    lastSale: 62.5,
    onSale: true,
    auction: {
      endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
      highestBid: 68.0
    }
  },
  // Doodles
  {
    id: 'doodle-1',
    name: 'Doodle #4242',
    description: 'A community-driven collectibles project featuring art by Burnt Toast.',
    image: DoodlesImg,
    price: 3.4,
    currency: 'ETH',
    creator: {
      name: 'Doodles',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'Doodles',
      floorPrice: 3.0
    },
    rarity: 'Rare',
    likes: 876,
    views: 4321,
    lastSale: 3.2,
    onSale: true
  },
  // Moonbirds
  {
    id: 'moonbird-1',
    name: 'Moonbirds #7777',
    description: 'A collection of 10,000 utility-enabled PFPs that feature a richly diverse ecosystem of rarity-powered traits.',
    image: MoonbirdsImg,
    price: 2.8,
    currency: 'ETH',
    creator: {
      name: 'PROOF',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'Moonbirds',
      floorPrice: 2.5
    },
    rarity: 'Epic',
    likes: 645,
    views: 3456,
    lastSale: 2.6,
    onSale: true
  },
  // Clone X
  {
    id: 'clonex-1',
    name: 'CloneX #5555',
    description: 'Next-gen Avatars, combining the worlds of fashion, gaming, and culture.',
    image: CloneXImg,
    price: 4.2,
    currency: 'ETH',
    creator: {
      name: 'RTFKT x Takashi Murakami',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'CloneX',
      floorPrice: 3.8
    },
    rarity: 'Epic',
    likes: 923,
    views: 5234,
    lastSale: 4.0,
    onSale: true
  },
  // DeGods
  {
    id: 'degods-1',
    name: 'DeGod #2222',
    description: 'A digital art collective of 10,000 hand-drawn gods with world-class artists.',
    image: DeGodImg,
    price: 6.7,
    currency: 'ETH',
    creator: {
      name: 'DeGods',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b765?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'DeGods',
      floorPrice: 6.2
    },
    rarity: 'Legendary',
    likes: 1234,
    views: 7654,
    lastSale: 6.5,
    onSale: true,
    auction: {
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      highestBid: 7.1
    }
  },
  // Mutant Ape Yacht Club
  {
    id: 'mayc-1',
    name: 'Mutant Ape #12345',
    description: 'A collection of up to 20,000 Mutant Apes that can only be created by exposing an existing Bored Ape to a vial of MUTANT SERUM.',
    image: MutantApeImg,
    price: 18.5,
    currency: 'ETH',
    creator: {
      name: 'Yuga Labs',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'Mutant Ape Yacht Club',
      floorPrice: 16.8
    },
    rarity: 'Epic',
    likes: 1567,
    views: 8234,
    lastSale: 17.9,
    onSale: true
  },
  // Meebits
  {
    id: 'meebit-1',
    name: 'Meebit #9876',
    description: '20,000 unique 3D voxel characters, created by a custom generative algorithm.',
    image: MeebitImg,
    price: 5.2,
    currency: 'ETH',
    creator: {
      name: 'Larva Labs',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'Meebits',
      floorPrice: 4.8
    },
    rarity: 'Rare',
    likes: 734,
    views: 3891,
    lastSale: 5.0,
    onSale: true
  },
  // VeeFriends
  {
    id: 'veefriends-1',
    name: 'VeeFriends #1111',
    description: 'VeeFriends Series 1 characters designed by Gary Vaynerchuk.',
    image: VeeFriendsImg,
    price: 2.1,
    currency: 'ETH',
    creator: {
      name: 'Gary Vaynerchuk',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'VeeFriends',
      floorPrice: 1.9
    },
    rarity: 'Rare',
    likes: 456,
    views: 2345,
    lastSale: 2.0,
    onSale: true
  },
  // Cool Cats
  {
    id: 'coolcats-1',
    name: 'Cool Cat #7890',
    description: 'Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs.',
    image: CoolCatImg,
    price: 3.2,
    currency: 'ETH',
    creator: {
      name: 'Cool Cats',
      avatar: 'https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'Cool Cats NFT',
      floorPrice: 2.9
    },
    rarity: 'Rare',
    likes: 678,
    views: 3456,
    lastSale: 3.0,
    onSale: true
  },
  // World of Women
  {
    id: 'wow-1',
    name: 'World of Women #5432',
    description: 'World of Women is a collection of 10,000 diverse and powerful women NFTs.',
    image: WorldOfWomenImg,
    price: 4.8,
    currency: 'ETH',
    creator: {
      name: 'World of Women',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b765?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'World of Women',
      floorPrice: 4.3
    },
    rarity: 'Epic',
    likes: 923,
    views: 5123,
    lastSale: 4.5,
    onSale: true
  },
  // Cyber Warrior
  {
    id: 'cyber-1',
    name: 'Cyber Warrior #808',
    description: 'A futuristic collection blending cyberpunk aesthetics with digital art.',
    image: CyberWarriorImg,
    price: 7.2,
    currency: 'ETH',
    creator: {
      name: 'Cyber Studios',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'Cyber Warriors',
      floorPrice: 6.5
    },
    rarity: 'Epic',
    likes: 1045,
    views: 6234,
    lastSale: 6.9,
    onSale: true
  },
  // Abstract Realm
  {
    id: 'abstract-1',
    name: 'Abstract Realm #1337',
    description: 'Mind-bending abstract digital art from renowned crypto artists.',
    image: AbstractRealmImg,
    price: 5.5,
    currency: 'ETH',
    creator: {
      name: 'Abstract Collective',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
      verified: true
    },
    collection: {
      name: 'Abstract Realms',
      floorPrice: 4.9
    },
    rarity: 'Epic',
    likes: 812,
    views: 4321,
    lastSale: 5.2,
    onSale: true,
    auction: {
      endTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
      highestBid: 5.9
    }
  }
];

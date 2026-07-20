export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  popular?: boolean;
  spicy?: boolean;
  veg?: boolean;
};

export type MenuSection = {
  id: string;
  name: string;
  items: MenuItem[];
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  emoji: string;
  gradient: string;
  accent: string;
  featured?: boolean;
  promo?: string;
  description: string;
  menu: MenuSection[];
};

export const CATEGORIES = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "italian", label: "Italian", emoji: "🍝" },
  { id: "japanese", label: "Japanese", emoji: "🍣" },
  { id: "mexican", label: "Mexican", emoji: "🌮" },
  { id: "indian", label: "Indian", emoji: "🍛" },
  { id: "american", label: "Burgers", emoji: "🍔" },
  { id: "healthy", label: "Healthy", emoji: "🥗" },
  { id: "dessert", label: "Dessert", emoji: "🍰" },
  { id: "thai", label: "Thai", emoji: "🍜" },
] as const;

export const restaurants: Restaurant[] = [
  {
    id: "nonna-trattoria",
    name: "Nonna's Trattoria",
    cuisine: ["Italian", "Pasta", "Pizza"],
    rating: 4.8,
    reviewCount: 1240,
    deliveryTime: "25–35 min",
    deliveryFee: 1.99,
    minOrder: 12,
    emoji: "🍝",
    gradient: "from-amber-600 via-orange-500 to-red-500",
    accent: "#c2410c",
    featured: true,
    promo: "Free garlic bread over $25",
    description:
      "Wood-fired pizzas and handmade pasta from Nonna's kitchen. Warm, rustic, unforgettable.",
    menu: [
      {
        id: "starters",
        name: "Starters",
        items: [
          {
            id: "nt-bruschetta",
            name: "Classic Bruschetta",
            description: "Toasted ciabatta, ripe tomatoes, basil, balsamic glaze",
            price: 9.5,
            emoji: "🍅",
            veg: true,
            popular: true,
          },
          {
            id: "nt-caprese",
            name: "Caprese Salad",
            description: "Buffalo mozzarella, heirloom tomatoes, fresh basil",
            price: 12,
            emoji: "🧀",
            veg: true,
          },
        ],
      },
      {
        id: "pasta",
        name: "Pasta",
        items: [
          {
            id: "nt-carbonara",
            name: "Spaghetti Carbonara",
            description: "Guanciale, egg yolk, pecorino, black pepper",
            price: 18.5,
            emoji: "🍝",
            popular: true,
          },
          {
            id: "nt-bolognese",
            name: "Tagliatelle Bolognese",
            description: "Slow-simmered beef ragu, fresh tagliatelle",
            price: 19,
            emoji: "🥩",
          },
          {
            id: "nt-pesto",
            name: "Pesto Genovese",
            description: "Basil pesto, pine nuts, parmesan, fusilli",
            price: 16.5,
            emoji: "🌿",
            veg: true,
          },
        ],
      },
      {
        id: "pizza",
        name: "Wood-Fired Pizza",
        items: [
          {
            id: "nt-margherita",
            name: "Margherita",
            description: "San Marzano, fior di latte, basil",
            price: 15,
            emoji: "🍕",
            veg: true,
            popular: true,
          },
          {
            id: "nt-diavola",
            name: "Diavola",
            description: "Spicy salami, chili oil, mozzarella",
            price: 17.5,
            emoji: "🌶️",
            spicy: true,
          },
        ],
      },
    ],
  },
  {
    id: "sakura-sushi",
    name: "Sakura Sushi Bar",
    cuisine: ["Japanese", "Sushi", "Ramen"],
    rating: 4.9,
    reviewCount: 2103,
    deliveryTime: "30–40 min",
    deliveryFee: 2.49,
    minOrder: 15,
    emoji: "🍣",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
    accent: "#db2777",
    featured: true,
    promo: "20% off first order",
    description:
      "Omakase-quality rolls and steaming bowls of ramen, delivered with care.",
    menu: [
      {
        id: "rolls",
        name: "Signature Rolls",
        items: [
          {
            id: "ss-dragon",
            name: "Dragon Roll",
            description: "Eel, cucumber, avocado, unagi sauce",
            price: 16,
            emoji: "🐉",
            popular: true,
          },
          {
            id: "ss-spicy-tuna",
            name: "Spicy Tuna Roll",
            description: "Fresh tuna, spicy mayo, scallion, sesame",
            price: 14,
            emoji: "🌶️",
            spicy: true,
          },
          {
            id: "ss-veggie",
            name: "Garden Roll",
            description: "Avocado, cucumber, carrot, asparagus",
            price: 12,
            emoji: "🥬",
            veg: true,
          },
        ],
      },
      {
        id: "ramen",
        name: "Ramen",
        items: [
          {
            id: "ss-tonkotsu",
            name: "Tonkotsu Ramen",
            description: "Rich pork broth, chashu, soft egg, nori",
            price: 17.5,
            emoji: "🍜",
            popular: true,
          },
          {
            id: "ss-miso",
            name: "Miso Ramen",
            description: "Savory miso broth, corn, butter, bamboo",
            price: 16,
            emoji: "🥣",
          },
        ],
      },
      {
        id: "sides",
        name: "Sides",
        items: [
          {
            id: "ss-edamame",
            name: "Salted Edamame",
            description: "Steamed soybeans, sea salt",
            price: 6,
            emoji: "🫛",
            veg: true,
          },
          {
            id: "ss-gyoza",
            name: "Pork Gyoza",
            description: "Pan-fried dumplings, ponzu dip (6 pcs)",
            price: 9.5,
            emoji: "🥟",
          },
        ],
      },
    ],
  },
  {
    id: "casa-verde",
    name: "Casa Verde",
    cuisine: ["Mexican", "Tacos", "Burritos"],
    rating: 4.7,
    reviewCount: 890,
    deliveryTime: "20–30 min",
    deliveryFee: 0,
    minOrder: 10,
    emoji: "🌮",
    gradient: "from-lime-600 via-green-500 to-emerald-600",
    accent: "#16a34a",
    featured: true,
    promo: "Free delivery",
    description:
      "Street-style tacos and slow-cooked carnitas with house salsas.",
    menu: [
      {
        id: "tacos",
        name: "Tacos (3 pcs)",
        items: [
          {
            id: "cv-al-pastor",
            name: "Al Pastor",
            description: "Marinated pork, pineapple, onion, cilantro",
            price: 13.5,
            emoji: "🍍",
            popular: true,
          },
          {
            id: "cv-carnitas",
            name: "Carnitas",
            description: "Braised pork, pickled onion, salsa verde",
            price: 13.5,
            emoji: "🐷",
          },
          {
            id: "cv-fish",
            name: "Baja Fish",
            description: "Beer-battered cod, cabbage slaw, crema",
            price: 14.5,
            emoji: "🐟",
          },
          {
            id: "cv-veggie",
            name: "Roasted Veggie",
            description: "Charred cauliflower, black beans, avocado",
            price: 12.5,
            emoji: "🥑",
            veg: true,
          },
        ],
      },
      {
        id: "bowls",
        name: "Bowls",
        items: [
          {
            id: "cv-burrito-bowl",
            name: "Burrito Bowl",
            description: "Rice, beans, protein of choice, pico, guac",
            price: 15,
            emoji: "🥗",
            popular: true,
          },
        ],
      },
    ],
  },
  {
    id: "spice-route",
    name: "Spice Route",
    cuisine: ["Indian", "Curry", "Tandoor"],
    rating: 4.6,
    reviewCount: 1567,
    deliveryTime: "30–45 min",
    deliveryFee: 1.49,
    minOrder: 15,
    emoji: "🍛",
    gradient: "from-yellow-500 via-orange-500 to-red-600",
    accent: "#ea580c",
    description:
      "Fragrant curries and tandoor-fired breads from the spice markets of Delhi.",
    menu: [
      {
        id: "curries",
        name: "Curries",
        items: [
          {
            id: "sr-butter-chicken",
            name: "Butter Chicken",
            description: "Tender chicken in creamy tomato makhani sauce",
            price: 17,
            emoji: "🍗",
            popular: true,
          },
          {
            id: "sr-tikka-masala",
            name: "Chicken Tikka Masala",
            description: "Smoky tikka, spiced tomato cream",
            price: 17.5,
            emoji: "🍛",
          },
          {
            id: "sr-palak",
            name: "Palak Paneer",
            description: "Spinach curry with fresh paneer cubes",
            price: 15.5,
            emoji: "🥬",
            veg: true,
          },
          {
            id: "sr-vindaloo",
            name: "Lamb Vindaloo",
            description: "Fiery Goan-style lamb curry",
            price: 19,
            emoji: "🔥",
            spicy: true,
          },
        ],
      },
      {
        id: "breads",
        name: "Breads & Sides",
        items: [
          {
            id: "sr-naan",
            name: "Garlic Naan",
            description: "Tandoor-baked, buttered garlic",
            price: 4.5,
            emoji: "🫓",
            veg: true,
            popular: true,
          },
          {
            id: "sr-samosa",
            name: "Veg Samosas",
            description: "Crispy pastry, spiced potato (2 pcs)",
            price: 6.5,
            emoji: "🥟",
            veg: true,
          },
        ],
      },
    ],
  },
  {
    id: "ember-burger",
    name: "Ember Burger Co.",
    cuisine: ["American", "Burgers", "Fries"],
    rating: 4.5,
    reviewCount: 2340,
    deliveryTime: "15–25 min",
    deliveryFee: 0.99,
    minOrder: 10,
    emoji: "🍔",
    gradient: "from-stone-700 via-amber-700 to-yellow-600",
    accent: "#a16207",
    featured: true,
    description:
      "Smash burgers, hand-cut fries, and milkshakes worth the trip.",
    menu: [
      {
        id: "burgers",
        name: "Burgers",
        items: [
          {
            id: "eb-classic",
            name: "The Ember Classic",
            description: "Double smash, American cheese, pickles, special sauce",
            price: 14,
            emoji: "🍔",
            popular: true,
          },
          {
            id: "eb-truffle",
            name: "Truffle Mushroom",
            description: "Swiss, sautéed mushrooms, truffle aioli",
            price: 16.5,
            emoji: "🍄",
            veg: true,
          },
          {
            id: "eb-spicy",
            name: "Hot Honey Crunch",
            description: "Crispy chicken, hot honey, slaw, pickles",
            price: 15,
            emoji: "🍯",
            spicy: true,
          },
        ],
      },
      {
        id: "sides",
        name: "Sides & Shakes",
        items: [
          {
            id: "eb-fries",
            name: "Hand-Cut Fries",
            description: "Sea salt, herb seasoning",
            price: 5.5,
            emoji: "🍟",
            veg: true,
            popular: true,
          },
          {
            id: "eb-shake",
            name: "Vanilla Bean Shake",
            description: "Thick, creamy, real vanilla",
            price: 7,
            emoji: "🥤",
            veg: true,
          },
        ],
      },
    ],
  },
  {
    id: "green-bowl",
    name: "The Green Bowl",
    cuisine: ["Healthy", "Salads", "Bowls"],
    rating: 4.7,
    reviewCount: 654,
    deliveryTime: "20–30 min",
    deliveryFee: 1.99,
    minOrder: 12,
    emoji: "🥗",
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    accent: "#0d9488",
    description:
      "Bright bowls and salads packed with color, crunch, and clean protein.",
    menu: [
      {
        id: "bowls",
        name: "Build-Your-Bowl",
        items: [
          {
            id: "gb-harvest",
            name: "Harvest Bowl",
            description: "Quinoa, roasted squash, kale, goat cheese, pepitas",
            price: 14.5,
            emoji: "🎃",
            veg: true,
            popular: true,
          },
          {
            id: "gb-mediterranean",
            name: "Mediterranean Bowl",
            description: "Farro, hummus, cucumber, olives, feta, lemon",
            price: 14,
            emoji: "🫒",
            veg: true,
          },
          {
            id: "gb-protein",
            name: "Power Protein",
            description: "Brown rice, grilled chicken, avocado, edamame",
            price: 16,
            emoji: "💪",
            popular: true,
          },
        ],
      },
      {
        id: "smoothies",
        name: "Smoothies",
        items: [
          {
            id: "gb-berry",
            name: "Berry Glow",
            description: "Mixed berries, banana, almond milk, chia",
            price: 8.5,
            emoji: "🫐",
            veg: true,
          },
          {
            id: "gb-green",
            name: "Green Machine",
            description: "Spinach, mango, ginger, coconut water",
            price: 8.5,
            emoji: "🥝",
            veg: true,
          },
        ],
      },
    ],
  },
  {
    id: "sweet-crust",
    name: "Sweet Crust Bakery",
    cuisine: ["Dessert", "Bakery", "Coffee"],
    rating: 4.9,
    reviewCount: 432,
    deliveryTime: "25–35 min",
    deliveryFee: 2.99,
    minOrder: 8,
    emoji: "🍰",
    gradient: "from-pink-400 via-rose-400 to-fuchsia-500",
    accent: "#e11d48",
    description:
      "Laminated pastries, seasonal tarts, and cakes that steal the show.",
    menu: [
      {
        id: "cakes",
        name: "Cakes & Tarts",
        items: [
          {
            id: "sc-basque",
            name: "Basque Cheesecake",
            description: "Burnt top, creamy center, slice",
            price: 8,
            emoji: "🧀",
            veg: true,
            popular: true,
          },
          {
            id: "sc-lemon",
            name: "Lemon Meringue Tart",
            description: "Meyer lemon curd, torched meringue",
            price: 7.5,
            emoji: "🍋",
            veg: true,
          },
          {
            id: "sc-chocolate",
            name: "Dark Chocolate Gateau",
            description: "70% cacao, sea salt, raspberry",
            price: 9,
            emoji: "🍫",
            veg: true,
          },
        ],
      },
      {
        id: "pastries",
        name: "Pastries",
        items: [
          {
            id: "sc-croissant",
            name: "Butter Croissant",
            description: "72-layer laminated dough",
            price: 4.5,
            emoji: "🥐",
            veg: true,
            popular: true,
          },
          {
            id: "sc-cookie",
            name: "Sea Salt Cookie",
            description: "Brown butter, dark chocolate chunks",
            price: 4,
            emoji: "🍪",
            veg: true,
          },
        ],
      },
    ],
  },
  {
    id: "bangkok-night",
    name: "Bangkok Night Market",
    cuisine: ["Thai", "Noodles", "Curry"],
    rating: 4.6,
    reviewCount: 978,
    deliveryTime: "25–40 min",
    deliveryFee: 1.99,
    minOrder: 14,
    emoji: "🍜",
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    accent: "#7c3aed",
    description:
      "Night-market energy: pad thai, green curry, and crispy wings.",
    menu: [
      {
        id: "noodles",
        name: "Noodles",
        items: [
          {
            id: "bn-pad-thai",
            name: "Pad Thai",
            description: "Rice noodles, tamarind, shrimp, peanuts, egg",
            price: 15.5,
            emoji: "🍜",
            popular: true,
          },
          {
            id: "bn-drunken",
            name: "Drunken Noodles",
            description: "Wide rice noodles, Thai basil, chili",
            price: 15,
            emoji: "🌶️",
            spicy: true,
          },
        ],
      },
      {
        id: "curries",
        name: "Curries",
        items: [
          {
            id: "bn-green",
            name: "Green Curry",
            description: "Coconut milk, Thai eggplant, basil, jasmine rice",
            price: 16.5,
            emoji: "💚",
            spicy: true,
            popular: true,
          },
          {
            id: "bn-massaman",
            name: "Massaman Curry",
            description: "Mild peanut curry, potato, onion",
            price: 16,
            emoji: "🥜",
            veg: true,
          },
        ],
      },
      {
        id: "apps",
        name: "Starters",
        items: [
          {
            id: "bn-wings",
            name: "Fish Sauce Wings",
            description: "Crispy wings, fish sauce caramel, chili",
            price: 12,
            emoji: "🍗",
            spicy: true,
          },
          {
            id: "bn-spring",
            name: "Fresh Spring Rolls",
            description: "Shrimp, herbs, peanut sauce (3 pcs)",
            price: 9,
            emoji: "🥬",
          },
        ],
      },
    ],
  },
  {
    id: "coastal-catch",
    name: "Coastal Catch",
    cuisine: ["Seafood", "American", "Fish"],
    rating: 4.4,
    reviewCount: 512,
    deliveryTime: "30–45 min",
    deliveryFee: 2.99,
    minOrder: 18,
    emoji: "🦞",
    gradient: "from-sky-600 via-blue-500 to-cyan-500",
    accent: "#0284c7",
    description:
      "Fresh catch of the day — grilled, fried, or in a buttery roll.",
    menu: [
      {
        id: "mains",
        name: "Mains",
        items: [
          {
            id: "cc-lobster-roll",
            name: "Lobster Roll",
            description: "Chilled lobster, lemon aioli, toasted brioche",
            price: 24,
            emoji: "🦞",
            popular: true,
          },
          {
            id: "cc-fish-chips",
            name: "Fish & Chips",
            description: "Beer-battered cod, tartar, mushy peas",
            price: 18,
            emoji: "🐟",
          },
          {
            id: "cc-salmon",
            name: "Grilled Salmon",
            description: "Miso glaze, roasted veg, rice",
            price: 22,
            emoji: "🍣",
          },
        ],
      },
      {
        id: "sides",
        name: "Sides",
        items: [
          {
            id: "cc-chowder",
            name: "Clam Chowder",
            description: "New England style, oyster crackers",
            price: 9,
            emoji: "🥣",
          },
          {
            id: "cc-coleslaw",
            name: "Citrus Coleslaw",
            description: "Light, bright, crunchy",
            price: 5,
            emoji: "🥗",
            veg: true,
          },
        ],
      },
    ],
  },
];

export function getRestaurant(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export function getMenuItem(
  restaurantId: string,
  itemId: string,
): (MenuItem & { restaurantId: string; restaurantName: string }) | undefined {
  const restaurant = getRestaurant(restaurantId);
  if (!restaurant) return undefined;
  for (const section of restaurant.menu) {
    const item = section.items.find((i) => i.id === itemId);
    if (item) {
      return {
        ...item,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
      };
    }
  }
  return undefined;
}

export function searchRestaurants(query: string, category?: string): Restaurant[] {
  const q = query.trim().toLowerCase();
  return restaurants.filter((r) => {
    const matchCategory =
      !category ||
      category === "all" ||
      r.cuisine.some((c) => c.toLowerCase().includes(category.toLowerCase())) ||
      (category === "healthy" && r.cuisine.some((c) => /healthy|salad|bowl/i.test(c))) ||
      (category === "dessert" && r.cuisine.some((c) => /dessert|bakery/i.test(c))) ||
      (category === "american" && r.cuisine.some((c) => /american|burger/i.test(c))) ||
      (category === "italian" && r.cuisine.some((c) => /italian|pasta|pizza/i.test(c))) ||
      (category === "japanese" && r.cuisine.some((c) => /japanese|sushi|ramen/i.test(c))) ||
      (category === "mexican" && r.cuisine.some((c) => /mexican|taco/i.test(c))) ||
      (category === "indian" && r.cuisine.some((c) => /indian|curry|tandoor/i.test(c))) ||
      (category === "thai" && r.cuisine.some((c) => /thai/i.test(c)));

    if (!matchCategory) return false;
    if (!q) return true;

    const inName = r.name.toLowerCase().includes(q);
    const inCuisine = r.cuisine.some((c) => c.toLowerCase().includes(q));
    const inMenu = r.menu.some((s) =>
      s.items.some(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q),
      ),
    );
    return inName || inCuisine || inMenu;
  });
}

export function getFeatured(): Restaurant[] {
  return restaurants.filter((r) => r.featured);
}

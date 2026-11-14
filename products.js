/* ===== Store settings: edit these ===== */
const STORE = {
  name: "Trend To Cart",
  whatsapp: "918610601717",              // country code + number, no + or spaces
  email: "trendtocartofficial@gmail.com",
  phone: "+91 8610601717",
  imageFolder: "images/",                // product images are read from this folder
  social: {
    instagram: "https://www.instagram.com/trendtocart_",
    facebook: "https://www.facebook.com/profile.php?id=61595599118036",
    youtube: "https://youtube.com/@trend-tocart?si=UNp-BOsPCME01uMo"
  },
  // Replace with real customer reviews when you have them
  testimonials: [
    { name: "Customer name", text: "Add a real customer review here." },
    { name: "Customer name", text: "Add a real customer review here." },
    { name: "Customer name", text: "Add a real customer review here." }
  ]
};

/* ===== Products =====
   Image file names must match the files inside the images folder exactly (capital letters included).
   Optional: variants: [{ label: "Small", price: 499 }] for size/color options. */
const PRODUCTS = [
  {
    id: "TTC-001",
    name: "7-in-1 Electronic Cleaner Kit",
    category: "Gadgets & Electronics",
    price: 269,
    originalPrice: 599,
    shortDesc: "All-in-one cleaning kit for keyboards, earbuds and electronic devices.",
    fullDesc: "All-in-one cleaning kit for keyboards, earbuds and electronic devices.",
    inStock: true,
    images: ["TTC-001-1.webp"],
    tags: ["Best Seller"]
  },
  {
    id: "TTC-002",
    name: "Mini Macaron Screen Cleaner",
    category: "Gadgets & Electronics",
    price: 265,
    originalPrice: 489,
    shortDesc: "Compact portable cleaner for everyday screen cleaning.",
    fullDesc: "Compact portable cleaner for everyday screen cleaning.",
    inStock: true,
    images: ["TTC-001-2.webp"],
    tags: ["Best Seller"]
  },
  {
    id: "TTC-003",
    name: "Rotating Panda Toy",
    category: "Toys & Kids",
    price: 379,
    originalPrice: 749,
    shortDesc: "Fun panda toy with rotating, spinning and moving actions.",
    fullDesc: "Fun panda toy with rotating, spinning and moving actions.",
    inStock: true,
    images: ["TTC-001-3.webp"],
    tags: ["Popular"]
  },
  {
    id: "TTC-004",
    name: "Dancing Jellyfish Toy",
    category: "Toys & Kids",
    price: 389,
    originalPrice: 679,
    shortDesc: "Cute dancing toy that brings fun and entertainment to kids.",
    fullDesc: "Cute dancing toy that brings fun and entertainment to kids.",
    inStock: true,
    images: ["TTC-001-4.webp"],
    tags: ["Trending"]
  },
  {
    id: "TTC-005",
    name: "Foldable Chopping Board",
    category: "Home & Kitchen",
    price: 295,
    originalPrice: 545,
    shortDesc: "Space-saving chopping board for convenient kitchen use.",
    fullDesc: "Space-saving chopping board for convenient kitchen use.",
    inStock: true,
    images: ["TTC-001-5.webp"],
    tags: ["Best Seller"]
  },
  {
    id: "TTC-006",
    name: "Magic Eraser Sponge (Pack of 5)",
    category: "Home & Kitchen",
    price: 149,
    originalPrice: 379,
    shortDesc: "Multi-surface cleaning sponge for everyday cleaning needs.",
    fullDesc: "Multi-surface cleaning sponge for everyday cleaning needs.",
    inStock: true,
    images: ["TTC-001-6.webp"],
    tags: ["Value Pack"]
  },
  {
    id: "TTC-007",
    name: "Power Knee Support",
    category: "Personal Care & Wellness",
    price: 625,
    originalPrice: 899,
    shortDesc: "Comfortable knee support for everyday activities.",
    fullDesc: "Comfortable knee support for everyday activities.",
    inStock: true,
    images: ["TTC-001-7.webp"],
    tags: ["Popular"]
  },
  {
    id: "TTC-008",
    name: "Washing Machine Cleaner Tablet (12 Pcs)",
    category: "Home & Kitchen",
    price: 99,
    originalPrice: 329,
    shortDesc: "Helps clean your washing machine and remove built-up residue.",
    fullDesc: "Helps clean your washing machine and remove built-up residue.",
    inStock: true,
    images: ["TTC-001-8.webp"],
    tags: ["Value Pack"]
  },
  {
    id: "TTC-009",
    name: "Automatic Cat Teaser Ball",
    category: "Toys & Kids",
    price: 195,
    originalPrice: 449,
    shortDesc: "Interactive moving toy to keep your cat entertained.",
    fullDesc: "Interactive moving toy to keep your cat entertained.",
    inStock: true,
    images: ["TTC-001-9.webp"],
    tags: ["Trending"]
  },
  {
    id: "TTC-010",
    name: "Portable Mesh Nebulizer",
    category: "Health & Wellness",
    price: 235,
    originalPrice: 489,
    shortDesc: "Compact portable mesh nebulizer device.",
    fullDesc: "Compact portable mesh nebulizer device.",
    inStock: true,
    images: ["TTC-001-10.webp"],
    tags: ["Popular"]
  },
  {
    id: "TTC-011",
    name: "Drain Pipe Cleaning Spring Stick",
    category: "Home & Kitchen",
    price: 145,
    originalPrice: 395,
    shortDesc: "Flexible cleaning tool for removing blockages from drain pipes.",
    fullDesc: "Flexible cleaning tool for removing blockages from drain pipes.",
    inStock: true,
    images: ["TTC-001-11.webp"],
    tags: ["Best Seller"]
  },
  {
    id: "TTC-012",
    name: "Mini Mop",
    category: "Home & Kitchen",
    price: 179,
    originalPrice: 429,
    shortDesc: "Compact mop for quick and easy everyday cleaning.",
    fullDesc: "Compact mop for quick and easy everyday cleaning.",
    inStock: true,
    images: ["TTC-001-12.webp"],
    tags: ["Popular"]
  },
  {
    id: "TTC-013",
    name: "2-in-1 Hair Color Stick",
    category: "Beauty & Personal Care",
    price: 259,
    originalPrice: 529,
    shortDesc: "Easy-to-use 2-in-1 hair color stick for quick and convenient grey hair touch-ups.",
    fullDesc: "Easy-to-use 2-in-1 hair color stick for quick and convenient grey hair touch-ups.",
    inStock: true,
    images: ["TTC-001-13.webp"],
    tags: ["Trending"]
  }
];

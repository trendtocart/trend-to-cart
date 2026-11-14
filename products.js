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
    name: "Crawling Crab",
    category: "Toy",
    price: 499,
    originalPrice: 899,
    shortDesc: "Crawling Crab Toy",
    fullDesc: "Crawling Crab Toy",
    inStock: true,
    images: ["TTC-001-1.jpg"],
    tags: ["Best Seller"]
  }
];

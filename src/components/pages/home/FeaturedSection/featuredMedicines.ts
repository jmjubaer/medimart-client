interface Medicine {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
    discount?: number;
  }
  
  export const featuredMedicines: Medicine[] = [
    {
      id: "1",
      name: "Advanced Multivitamin Complex",
      description: "Complete daily nutrition with essential vitamins and minerals",
      price: 29.99,
      rating: 4.8,
      image: "https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg",
      discount: 15,
    },
    {
      id: "2",
      name: "Omega-3 Fish Oil Plus",
      description: "Premium fish oil with EPA & DHA for heart and brain health",
      price: 34.99,
      rating: 4.9,
      image: "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg",
    },
    {
      id: "3",
      name: "Probiotic Defense",
      description: "10 billion CFU probiotics for digestive and immune health",
      price: 39.99,
      rating: 4.7,
      image: "https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg",
      discount: 10,
    },
    {
      id: "4",
      name: "Joint Support Formula",
      description: "Glucosamine & chondroitin complex for joint health",
      price: 44.99,
      rating: 4.8,
      image: "https://images.pexels.com/photos/3683101/pexels-photo-3683101.jpeg",
      discount: 20,
    },
    {
      id: "5",
      name: "Sleep & Relaxation Aid",
      description: "Natural blend with melatonin for quality sleep support",
      price: 24.99,
      rating: 4.6,
      image: "https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg",
    },
    {
      id: "6",
      name: "Immune Defense Plus",
      description: "Powerful antioxidant blend with Vitamin C, D3 & Zinc",
      price: 32.99,
      rating: 4.9,
      image: "https://images.pexels.com/photos/4021808/pexels-photo-4021808.jpeg",
      discount: 12,
    },
    {
        id: "7",
        name: "Calcium & Vitamin D3",
        description: "Essential supplement for bone health and strength",
        price: 27.99,
        rating: 4.7,
        image: "https://images.pexels.com/photos/3683096/pexels-photo-3683096.jpeg",
        discount: 8,
      },
      {
        id: "8",
        name: "B-Complex Supreme",
        description: "Complete B-vitamin complex for energy and metabolism",
        price: 36.99,
        rating: 4.8,
        image: "https://images.pexels.com/photos/3683097/pexels-photo-3683097.jpeg",
      },
  ];
  
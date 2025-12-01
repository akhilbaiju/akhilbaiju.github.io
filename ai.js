// AI Prompts data - ADD YOUR IMAGES AND PROMPTS HERE
const aiPrompts = [
    {
        title: "Cyberpunk Cityscape",
        image: "PromptImages/VHScapsule.webp",  // Your image path
        category: "Studio",  // Choose: Realistic, Cartoon, Cinema, Anime, or Digital Painting
        prompt: "A neon-lit cyberpunk city at night, flying cars, holographic advertisements, rain-soaked streets, highly detailed, cinematic lighting, 8k resolution"
    },
    {
        title: "Fantasy Forest",
        image: "imageforprompt2.jpg",  // Your image path
        category: "Cartoon", 
        prompt: "A Mystical Forest with bioluminescent plants, fairy lights, ancient trees, magical atmosphere, fantasy art style, ethereal glow"
    },
    {
        title: "Abstract Geometry",
        image: "imageforprompt3.jpg",  // Your image path
        prompt: "Abstract geometric shapes, vibrant gradients, modern minimalist design, 3D render, pastel colors, floating elements"
    },
    {
        title: "Space Explorer",
        image: "imageforprompt4.jpg",  // Your image path
        prompt: "Astronaut exploring alien planet, two suns in sky, exotic flora, sci-fi concept art, photorealistic, dramatic lighting"
    },
    {
        title: "Vintage Portrait",
        image: "imageforprompt5.jpg",  // Your image path
        prompt: "Vintage 1920s portrait, art deco style, elegant fashion, golden hour lighting, film grain, nostalgic atmosphere"
    },
    {
        title: "Ocean Depths",
        image: "imageforprompt6.jpg",  // Your image path
        prompt: "Underwater scene with coral reefs, colorful fish, rays of sunlight penetrating water, peaceful, highly detailed marine life"
    },
    {
        title: "Mountain Sunset",
        image: "imageforprompt7.jpg",  // Your image path
        prompt: "Majestic mountain range at sunset, purple and orange sky, misty valleys, landscape photography, dramatic clouds"
    },
    {
        title: "Steampunk Machine",
        image: "imageforprompt8.jpg",  // Your image path
        prompt: "Intricate steampunk machinery, brass gears, Victorian aesthetic, mechanical details, industrial design, sepia tones"
    },
    {
        title: "Minimalist Room",
        image: "imageforprompt9.jpg",  // Your image path
        prompt: "Modern minimalist interior design, natural light, neutral colors, clean lines, Scandinavian style, cozy atmosphere"
    }
];

// Generate AI prompt cards
const aiGrid = document.getElementById('ai-grid');
let currentCategory = 'All';

// Category filter functionality
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter and display cards
    renderCards();
}

function renderCards() {
    aiGrid.innerHTML = '';
    
    const filteredPrompts = currentCategory === 'All' 
        ? aiPrompts 
        : aiPrompts.filter(item => item.category === currentCategory);
    
    filteredPrompts.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'ai-card';
        card.dataset.category = item.category;
        card.onclick = () => copyPrompt(item.prompt, card);
        
        card.innerHTML = `
            <div class="ai-image-container">
                <img src="${item.image}" alt="${item.title}" class="ai-placeholder" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="ai-content">
                <div class="ai-title">${item.title}</div>
                <div class="ai-prompt">${item.prompt}</div>
            </div>
            <div class="copy-indicator">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Copied!
            </div>
        `;
        
        aiGrid.appendChild(card);
        
        // Animate on load
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 50);
    });
}

// Initial render
renderCards();

// Copy prompt to clipboard
function copyPrompt(prompt, card) {
    navigator.clipboard.writeText(prompt).then(() => {
        // Show toast
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        
        // Add copied class to card
        card.classList.add('copied');
        
        setTimeout(() => {
            toast.classList.remove('show');
            card.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}




// Gallery images array - ADD YOUR IMAGE PATHS HERE
const imageUrls = [
    'Images/GalleryImages/bluemoon_11zon.webp',
    'Images/GalleryImages/blackndwhite_11zon.webp',
  //  'Images/GalleryImages/daredevil_11zon.webp',
    'Images/GalleryImages/ai.webp',
  //  'Images/GalleryImages/blackndwhite.jpg',
    //'Images/GalleryImages/blackndwhite.jpg',
    'Images/GalleryImages/daredevil_11zon.webp'
];

const gallery = document.getElementById('gallery');
const galleryImages = [];

// Create gallery items from image URLs
imageUrls.forEach((imageUrl, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.onclick = () => openLightbox(index);
    
    const img = document.createElement('img');
    img.className = 'gallery-image';
    img.src = imageUrl;
    img.alt = `Gallery image ${index + 1}`;
    img.loading = 'lazy'; // Lazy load for performance
    
    item.appendChild(img);
    gallery.appendChild(item);
    
    galleryImages.push(imageUrl);
    
    // Animate on load
    setTimeout(() => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 50);
    }, index * 80);
});

// Lightbox functionality
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    // Load the actual image
    lightboxImage.src = galleryImages[index];
    lightboxImage.alt = `Gallery image ${index + 1}`;
    
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    openLightbox(currentImageIndex);
}

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
    }
});

// Close lightbox on background click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

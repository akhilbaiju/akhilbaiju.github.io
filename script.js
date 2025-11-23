90// Music Player functionality
const playlist = [
    {
        title: "Sunflower - Spiderman into the Spider-Verse",
        artist: "Postmalone",
        cover: "Images/Songimages/spiderman2.jpg"
    },
    {
        title: "Dil Diyan Gallan (From \"Tiger Zinda Hai\")",
        artist: "Atif Aslam",
        cover: "Images/Songimages/DilDiyaGallan.webp"
    },
    {
        title: "Levitating",
        artist: "Dua Lipa",
        cover: "Images/Songimages/Levitating.webp"
    },
    {
        title: "Ordinary Person (From 'Leo')",
        artist: "Anirudh Ravichander",
        cover: "Images/Songimages/Ordinaryperson.webp"
    },
    {
        title: "Ranam Title Track",
        artist: "Jakes Bejoy, Ajaey Shravan",
        cover: "Images/Songimages/ranam.webp"
    }
];

let progress = 0;
let progressInterval = null;

// Initialize music player
function initMusicPlayer() {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    const song = playlist[randomIndex];
    
    document.getElementById('songTitle').textContent = song.title;
    document.getElementById('songArtist').textContent = song.artist;
    document.getElementById('songCover').src = song.cover;
    
    // Auto-start playing
    startProgress();
}

function startProgress() {
    clearInterval(progressInterval);
    
    // Duration: 5 minutes = 300,000ms
    // Update every 100ms
    // Total steps = 300,000 / 100 = 3000
    // Increment per step = 100% / 3000 = 0.03333%
    const durationSteps = (5 * 60 * 1000) / 100;
    const increment = 100 / durationSteps;
    
    progressInterval = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
            progress = 0; // Loop
        }
        document.getElementById('progressBar').style.width = `${progress}%`;
    }, 100);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initMusicPlayer);

// Terminal functionality
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
    help: () => {
        return `Available commands:
  help      - Show this help message
  about     - Learn more about me
  projects  - View my projects
  ping      - Check connection
  joke      - Get a random joke
  clear     - Clear terminal`;
    },
    about: () => {
        return `I'm a creator who loves building tiny, delightful things on the internet. I focus on minimal, functional projects that bring joy.`;
    },
    projects: () => {
        return `Projects onm illa podey`;
    },
    ping: () => {
        return `Pong! Response time: ${Math.floor(Math.random() * 50) + 10}ms`;
    },
    joke: () => {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs!",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
            "Why did the developer go broke? Because he used up all his cache!",
            "What's a programmer's favorite hangout? The Foo Bar!",
            "Why do Java developers wear glasses? Because they don't C#!"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    },
    clear: () => {
        terminalOutput.innerHTML = '<div class="terminal-line">Terminal cleared. Type \'help\' for commands.</div>';
        return null;
    }
};

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim();
        
        if (input) {
            // Display command
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `<span class="terminal-command">$ ${input}</span>`;
            terminalOutput.appendChild(commandLine);
            
            // Execute command
            const output = commands[input.toLowerCase()];
            if (output) {
                const result = output();
                if (result !== null) {
                    const outputLine = document.createElement('div');
                    outputLine.className = 'terminal-line';
                    outputLine.textContent = result;
                    terminalOutput.appendChild(outputLine);
                }
            } else {
                const errorLine = document.createElement('div');
                errorLine.className = 'terminal-line';
                errorLine.textContent = `Command not found: ${input}. Type 'help' for available commands.`;
                terminalOutput.appendChild(errorLine);
            }
            
            // Scroll to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            
            // Clear input
            terminalInput.value = '';
        }
    }
});

// Keep input focused
document.addEventListener('click', (e) => {
    // If the click is inside another interactive element, don't steal focus.
    if (e.target.closest('.visiting-card-container') || e.target.closest('.music-player')) {
        return;
    }

    if (document.activeElement !== terminalInput) {
        terminalInput.focus();
    }
});

// --- Kerala News & Movies Dashboard ---

const newsContainer = document.getElementById('news-list-container');
const moviesContainer = document.getElementById('movies-grid-container');

// Fallback Data
const fallbackNews = [
    { title: 'Heavy rain expected in Kerala, red alert issued', link: '#' },
    { title: 'Political tensions rise over new infrastructure project', link: '#' },
    { title: 'Major crime bust in the city, several arrested', link: '#' },
    { title: 'State celebrates successful harvest festival', link: '#' },
    { title: 'New tech park to create thousands of jobs', link: '#' }
];

const fallbackMovies = [
    { title: 'Marakkar: Lion of the Arabian Sea', description: '<img src="https://via.placeholder.com/150x220.png?text=Marakkar" />', link: '#' },
    { title: 'Drishyam 2', description: '<img src="https://via.placeholder.com/150x220.png?text=Drishyam+2" />', link: '#' },
    { title: 'Joji', description: '<img src="https://via.placeholder.com/150x220.png?text=Joji" />', link: '#' },
    { title: 'Minnal Murali', description: '<img src="https://via.placeholder.com/150x220.png?text=Minnal+Murali" />', link: '#' },
    { title: 'The Great Indian Kitchen', description: '<img src="https://via.placeholder.com/150x220.png?text=TGIK" />', link: '#' }
];

// --- News Logic ---

const getNewsIcon = (headline) => {
    const lowerCaseHeadline = headline.toLowerCase();
    if (lowerCaseHeadline.includes('rain') || lowerCaseHeadline.includes('weather')) {
        return 'fa-solid fa-cloud-showers-heavy';
    }
    if (lowerCaseHeadline.includes('politic') || lowerCaseHeadline.includes('election')) {
        return 'fa-solid fa-landmark';
    }
    if (lowerCaseHeadline.includes('crime') || lowerCaseHeadline.includes('arrest')) {
        return 'fa-solid fa-handcuffs';
    }
    if (lowerCaseHeadline.includes('film') || lowerCaseHeadline.includes('movie')) {
        return 'fa-solid fa-film';
    }
    return 'fa-solid fa-newspaper';
};

const renderNews = (items) => {
    const dateElement = document.getElementById('news-date');
    const today = new Date();
    const dateString = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
    if (dateElement) {
        dateElement.textContent = dateString;
    }

    newsContainer.innerHTML = items.slice(0, 5).map(item => `
        <div class="news-item">
            <i class="${getNewsIcon(item.title)}"></i>
            <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
        </div>
    `).join('');
};

const fetchNews = async () => {
    const NEWS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.onmanorama.com/news/kerala.xml';
    try {
        const response = await fetch(NEWS_URL, { signal: AbortSignal.timeout(5000) });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.status === 'ok' && data.items.length > 0) {
            renderNews(data.items);
        } else {
            renderNews(fallbackNews);
        }
    } catch (error) {
        console.error('Failed to fetch news, using fallback.', error);
        renderNews(fallbackNews);
    }
};

// --- Movies Logic ---

const getMoviePoster = (description) => {
    // This regex looks for src='...' or src="..."
    const match = description.match(/src='([^']*)'|src="([^"]*)"/);
    // The result can be in either capture group 1 or 2
    return match ? (match[1] || match[2]) : 'https://via.placeholder.com/150x220.png?text=No+Image';
};

const generateStarRating = () => {
    const rating = (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else if (i < Math.ceil(rating)) {
            stars += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            stars += '<i class="fa-regular fa-star"></i>';
        }
    }
    return `${stars} ${rating}`;
};

const renderMovies = (items) => {
    moviesContainer.innerHTML = items.slice(0, 5).map(item => `
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="movie-card">
            <img src="${getMoviePoster(item.description)}" alt="${item.title}">
            <div class="movie-card-content">
                <h3>${item.title}</h3>
                <div class="star-rating">${generateStarRating()}</div>
            </div>
        </a>
    `).join('');
};

const fetchMovies = async () => {
    const MOVIES_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://timesofindia.indiatimes.com/rssfeeds/12198692.cms';
    try {
        const response = await fetch(MOVIES_URL, { signal: AbortSignal.timeout(5000) });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.status === 'ok' && data.items.length > 0) {
            renderMovies(data.items);
        } else {
            renderMovies(fallbackMovies);
        }
    } catch (error) {
        console.error('Failed to fetch movies, using fallback.', error);
        renderMovies(fallbackMovies);
    }
};

// --- Initialize ---
function fetchNewsAndMovies() {
    fetchNews();
    fetchMovies();
}

window.addEventListener('DOMContentLoaded', () => {
    fetchNewsAndMovies();
k
    // --- Visiting Card Download ---
    const downloadBtn = document.getElementById('download-card-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling that might interfere with hover states

            const cardBack = document.querySelector('.card-back');
            
            // Create a clone to capture, avoiding issues with CSS transforms
            const clone = cardBack.cloneNode(true);
            
            // Style the clone to be rendered off-screen
            clone.style.position = 'absolute';
            clone.style.left = '-9999px';
            clone.style.top = '0px';
            clone.style.transform = 'none'; // Ensure no rotation
            clone.style.width = `${cardBack.offsetWidth}px`; // Set explicit width
            clone.style.height = `${cardBack.offsetHeight}px`; // Set explicit height

            document.body.appendChild(clone);

            html2canvas(clone, {
                backgroundColor: null, // Transparent background
                useCORS: true,
                // Ensure it renders at the correct dimensions
                width: clone.offsetWidth,
                height: clone.offsetHeight,
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = 'akhil-baiju-vcard.png';
                link.href = canvas.toDataURL('image/png');
                link.click();

                // Clean up the clone from the DOM
                document.body.removeChild(clone);
            }).catch(err => {
                console.error("Error generating card image:", err);
                // Clean up the clone even if there's an error
                document.body.removeChild(clone);
            });
        });
    }

    // --- Conditional Terminal Focus ---
    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput && window.innerWidth > 968) {
        terminalInput.focus();
    }
});
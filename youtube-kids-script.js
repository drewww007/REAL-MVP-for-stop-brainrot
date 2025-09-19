// YouTube Kids Plus - Interactive Owl Mascot & Preference System

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const owl = document.getElementById('owl');
    const owlSpeech = document.getElementById('owl-speech');
    const preferenceModal = document.getElementById('preference-modal');
    const preferencesBtn = document.getElementById('preferences-btn');
    const closeModal = document.getElementById('close-modal');
    const savePreferences = document.getElementById('save-preferences');
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.getElementById('sidebar');
    const videoCards = document.querySelectorAll('.video-card');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    // Owl state
    let owlInteracting = false;
    let speechTimeout;
    let welcomeShown = false;
    
    // Owl messages
    const owlMessages = {
        welcome: "Hi! I'm Owly! Click me to set up your safe viewing preferences! 🌟",
        click: [
            "Let's make YouTube safe and fun together! 🦉✨",
            "I'll help you find the best videos! 🌊",
            "Ready to explore amazing content? 🚀",
            "Let's discover something wonderful! 🌟"
        ],
        encouragement: [
            "Great choice! This looks educational! 📚",
            "I love learning videos! 🎓",
            "This one teaches cool things! ⭐",
            "Perfect for curious minds! 🧠",
            "You're going to learn so much! 🌟"
        ],
        search: [
            "What cool things do you want to learn about? 🔍",
            "I'll help you find the perfect videos! 🎯",
            "Let's search for something amazing! ✨"
        ],
        safety: [
            "Don't worry, I'm keeping you safe! 🛡️",
            "Only the best content for you! 🌟",
            "I've filtered out anything inappropriate! ✅"
        ]
    };
    
    // Show Axolotl speech bubble
    function showAxolotlSpeech(message, duration = 3000) {
        axolotlSpeech.textContent = message;
        axolotlSpeech.classList.add('show');
        
        clearTimeout(speechTimeout);
        speechTimeout = setTimeout(() => {
            axolotlSpeech.classList.remove('show');
        }, duration);
    }
    
    // Get random message from array
    function getRandomMessage(messageArray) {
        return messageArray[Math.floor(Math.random() * messageArray.length)];
    }
    
    // Axolotl welcome message after fly-up animation
    setTimeout(() => {
        if (!welcomeShown) {
            showAxolotlSpeech(axolotlMessages.welcome, 5000);
            welcomeShown = true;
        }
    }, 3000);
    
    // Axolotl click handler
    axolotl.addEventListener('click', function() {
        if (!axolotlInteracting) {
            axolotlInteracting = true;
            
            // Create sparkle effect
            createSparkleEffect();
            
            // Show preference modal
            preferenceModal.classList.add('show');
            showAxolotlSpeech(getRandomMessage(axolotlMessages.click), 4000);
            
            // Reset interaction state
            setTimeout(() => {
                axolotlInteracting = false;
            }, 1000);
        }
    });
    
    // Axolotl hover effect
    axolotl.addEventListener('mouseenter', function() {
        if (!axolotlInteracting && !preferenceModal.classList.contains('show')) {
            showAxolotlSpeech("Click me to customize your experience! 🦴", 2500);
        }
    });
    
    // Preferences button (header)
    if (preferencesBtn) {
        preferencesBtn.addEventListener('click', function() {
            preferenceModal.classList.add('show');
            showAxolotlSpeech("Let's update your preferences! 🎯", 3000);
        });
    }
    
    // Close modal handlers
    closeModal.addEventListener('click', function() {
        preferenceModal.classList.remove('show');
        showAxolotlSpeech("No problem! I'm here when you need me! 😊", 3000);
    });
    
    // Close modal when clicking outside
    preferenceModal.addEventListener('click', function(e) {
        if (e.target === preferenceModal) {
            preferenceModal.classList.remove('show');
            showAxolotlSpeech("I'll be right here if you change your mind! 🦴", 3000);
        }
    });
    
    // Save preferences
    savePreferences.addEventListener('click', function() {
        const bannedItems = [];
        const wantedItems = [];
        
        // Collect banned content preferences
        document.querySelectorAll('input[name="ban"]:checked').forEach(checkbox => {
            bannedItems.push(checkbox.value);
        });
        
        // Collect wanted content preferences
        document.querySelectorAll('input[name="want"]:checked').forEach(checkbox => {
            wantedItems.push(checkbox.value);
        });
        
        // Save to localStorage (in real app, this would go to backend)
        localStorage.setItem('youtube-kids-banned', JSON.stringify(bannedItems));
        localStorage.setItem('youtube-kids-wanted', JSON.stringify(wantedItems));
        
        // Close modal
        preferenceModal.classList.remove('show');
        
        // Show success message
        showAxolotlSpeech("Perfect! Your preferences are saved! Now enjoy safe, fun videos! 🎉", 4000);
        
        // Update video recommendations (simulate)
        setTimeout(() => {
            updateVideoRecommendations(wantedItems);
            showAxolotlSpeech("I've updated your video feed with your favorite topics! 🌟", 3500);
        }, 2000);
    });
    
    // Load saved preferences
    function loadSavedPreferences() {
        const savedBanned = JSON.parse(localStorage.getItem('youtube-kids-banned') || '[]');
        const savedWanted = JSON.parse(localStorage.getItem('youtube-kids-wanted') || '[]');
        
        // Check saved banned items
        savedBanned.forEach(value => {
            const checkbox = document.querySelector(`input[name="ban"][value="${value}"]`);
            if (checkbox) checkbox.checked = true;
        });
        
        // Check saved wanted items
        savedWanted.forEach(value => {
            const checkbox = document.querySelector(`input[name="want"][value="${value}"]`);
            if (checkbox) checkbox.checked = true;
        });
        
        return { banned: savedBanned, wanted: savedWanted };
    }
    
    // Update video recommendations based on preferences
    function updateVideoRecommendations(wantedItems) {
        const videoTitles = document.querySelectorAll('.video-title');
        const channels = document.querySelectorAll('.channel-name');
        
        // Sample content based on preferences
        const contentMap = {
            animals: {
                titles: ["Amazing Animal Families", "Safari Adventure for Kids", "Pet Care Basics"],
                channels: ["Animal Planet Kids", "Wildlife Explorer", "Pet Academy"]
            },
            space: {
                titles: ["Journey to Mars", "Solar System Song", "Astronaut Training"],
                channels: ["Space Kids TV", "NASA for Kids", "Cosmic Academy"]
            },
            art: {
                titles: ["Watercolor Magic", "Clay Sculpture Fun", "Digital Art Basics"],
                channels: ["Art Studio Kids", "Creative Corner", "Draw With Me"]
            },
            science: {
                titles: ["Cool Chemistry Experiments", "Physics Fun Facts", "Biology Basics"],
                channels: ["Science Lab Kids", "Experiment Station", "Discovery Junior"]
            },
            nature: {
                titles: ["Rainforest Expedition", "Ocean Depths", "Mountain Adventures"],
                channels: ["Nature Explorers", "Eco Kids", "Planet Earth Jr"]
            }
        };
        
        // Update titles and channels based on preferences
        videoTitles.forEach((title, index) => {
            if (wantedItems.length > 0) {
                const randomCategory = wantedItems[Math.floor(Math.random() * wantedItems.length)];
                const categoryContent = contentMap[randomCategory];
                
                if (categoryContent) {
                    const randomTitle = categoryContent.titles[Math.floor(Math.random() * categoryContent.titles.length)];
                    const randomChannel = categoryContent.channels[Math.floor(Math.random() * categoryContent.channels.length)];
                    
                    title.textContent = randomTitle;
                    if (channels[index]) {
                        channels[index].textContent = randomChannel;
                    }
                }
            }
        });
    }
    
    // Menu button functionality
    menuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        showAxolotlSpeech("Great! Explore different categories to find what you love! 📚", 3000);
    });
    
    // Video card interactions
    videoCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const title = card.querySelector('.video-title').textContent;
            showAxolotlSpeech(getRandomMessage(axolotlMessages.encouragement), 3000);
            
            // Simulate video loading
            setTimeout(() => {
                showAxolotlSpeech(`"${title}" is a great choice! Enjoy learning! 📺`, 3000);
            }, 2000);
        });
        
        // Encouraging messages on hover
        card.addEventListener('mouseenter', function() {
            if (!axolotlInteracting && Math.random() < 0.3) {
                const encouragements = [
                    "This looks interesting! 🌟",
                    "Great choice! 👍",
                    "I recommend this one! ⭐",
                    "You'll love this! 💖",
                    "Educational and fun! 🎓"
                ];
                showAxolotlSpeech(encouragements[Math.floor(Math.random() * encouragements.length)], 2000);
            }
        });
    });
    
    // Search functionality
    searchInput.addEventListener('focus', function() {
        showAxolotlSpeech(getRandomMessage(axolotlMessages.search), 2500);
    });
    
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            showAxolotlSpeech(`Searching for "${query}"... I'll find the safest, most educational content! 🔍`, 4000);
            
            // Simulate search results
            setTimeout(() => {
                showAxolotlSpeech("Here are some great videos I found for you! All safe and educational! ✅", 3500);
            }, 2000);
        } else {
            showAxolotlSpeech("What would you like to search for? Type something fun! 🎯", 2500);
        }
    });
    
    // Enter key search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
    
    // Navigation item clicks
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            const section = this.textContent.trim();
            showAxolotlSpeech(`Welcome to ${section}! I've curated the best content for you! 🌟`, 3000);
            
            // Simulate content filtering
            setTimeout(() => {
                showAxolotlSpeech(getRandomMessage(axolotlMessages.safety), 3000);
            }, 1500);
        });
    });
    
    // Periodic helpful tips
    setInterval(() => {
        if (!axolotlInteracting && !preferenceModal.classList.contains('show') && Math.random() < 0.1) {
            const tips = [
                "💡 Tip: Click on me anytime to update your preferences!",
                "🌟 Remember: All content here is safe and educational!",
                "🎯 Try searching for your favorite topics!",
                "📚 Explore different categories in the sidebar!",
                "🦴 I'm always here to help you find great videos!",
                "✨ Don't forget to take breaks from screen time!",
                "🌈 Learning is fun when it's safe and age-appropriate!"
            ];
            showAxolotlSpeech(tips[Math.floor(Math.random() * tips.length)], 4000);
        }
    }, 20000); // Every 20 seconds
    
    // Sparkle effect function
    function createSparkleEffect() {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.fontSize = '20px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.animation = 'sparkle 1.5s ease-out forwards';
                sparkle.style.left = (Math.random() * 80) + 'px';
                sparkle.style.top = (Math.random() * 80) + 'px';
                sparkle.style.zIndex = '1000';
                
                axolotl.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.remove();
                    }
                }, 1500);
            }, i * 200);
        }
    }
    
    // Responsive sidebar handling
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('open');
        }
    });
    
    // Load preferences on startup
    loadSavedPreferences();
    
    // Welcome message for returning users
    const hasVisited = localStorage.getItem('youtube-kids-visited');
    if (hasVisited) {
        setTimeout(() => {
            showAxolotlSpeech("Welcome back! Ready for more safe, fun learning? 🎉", 4000);
        }, 3500);
    } else {
        localStorage.setItem('youtube-kids-visited', 'true');
        setTimeout(() => {
            showAxolotlSpeech("Welcome to YouTube Kids Plus! I'm Axie, your safety companion! 🦴✨", 5000);
        }, 8000);
    }
});

// Additional CSS animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    .axolotl-body:active {
        transform: scale(0.95);
    }
    
    .checkbox-item input[type="checkbox"]:checked + span {
        color: #00d4ff;
        font-weight: 500;
    }
    
    .video-card:hover .placeholder-video {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(additionalStyles);
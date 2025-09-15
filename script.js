document.addEventListener('DOMContentLoaded', function() {
    const genie = document.querySelector('.genie-face');
    const speechBubble = document.querySelector('.genie-speech-bubble');
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const videoCards = document.querySelectorAll('.video-card');
    
    let isGenieInteracting = false;
    let speechTimeout;
    
    const genieMessages = [
        "Welcome to GenieVid! I'm here to help you discover amazing videos!",
        "Click on any video to start watching!",
        "Try using the search bar to find specific content!",
        "Don't forget to check out the trending videos!",
        "I can help you navigate through the platform!",
        "Looking for something specific? Just ask!",
        "Explore different categories in the sidebar!",
        "New videos are added daily - check back soon!"
    ];
    
    function showGenieMessage(message, duration = 3000) {
        speechBubble.textContent = message;
        speechBubble.classList.add('show');
        
        clearTimeout(speechTimeout);
        speechTimeout = setTimeout(() => {
            speechBubble.classList.remove('show');
        }, duration);
    }
    
    function getRandomMessage() {
        return genieMessages[Math.floor(Math.random() * genieMessages.length)];
    }
    
    genie.addEventListener('click', function() {
        if (!isGenieInteracting) {
            isGenieInteracting = true;
            showGenieMessage(getRandomMessage(), 4000);
            
            setTimeout(() => {
                isGenieInteracting = false;
            }, 5000);
        }
    });
    
    genie.addEventListener('mouseenter', function() {
        if (!isGenieInteracting) {
            showGenieMessage("Hi there! Click me for tips and suggestions!", 2000);
        }
    });
    
    menuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        showGenieMessage("Here's the navigation menu! Explore different sections.", 3000);
    });
    
    videoCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const title = card.querySelector('.video-title').textContent;
            showGenieMessage(`Great choice! "${title}" looks interesting!`, 3000);
            
            setTimeout(() => {
                showGenieMessage("Enjoy watching! I'll be here if you need help.", 2500);
            }, 3500);
        });
        
        card.addEventListener('mouseenter', function() {
            if (!isGenieInteracting && Math.random() < 0.3) {
                const encouragements = [
                    "This one looks interesting!",
                    "Popular choice!",
                    "Highly recommended!",
                    "Trending now!",
                    "You might like this one!"
                ];
                showGenieMessage(encouragements[Math.floor(Math.random() * encouragements.length)], 2000);
            }
        });
    });
    
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchInput.addEventListener('focus', function() {
        showGenieMessage("What are you looking for? I can help you find it!", 2500);
    });
    
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            showGenieMessage(`Searching for "${query}"... Great choice!`, 3000);
        } else {
            showGenieMessage("Type something in the search box first!", 2000);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
    
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            const section = this.textContent.trim();
            showGenieMessage(`Navigating to ${section}! Let me know if you need help finding anything.`, 3000);
        });
    });
    
    setTimeout(() => {
        showGenieMessage("Welcome to GenieVid! I'm your friendly guide. Click me anytime!", 4000);
    }, 1000);
    
    setInterval(() => {
        if (!isGenieInteracting && Math.random() < 0.1) {
            const randomTips = [
                "💡 Tip: Use the search bar to find specific videos!",
                "🔥 Check out trending videos for popular content!",
                "📚 Your library keeps track of your favorite videos!",
                "⏰ Watch Later helps you save videos for later!",
                "👍 Like videos to help others discover great content!"
            ];
            showGenieMessage(randomTips[Math.floor(Math.random() * randomTips.length)], 3500);
        }
    }, 15000);
    
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('open');
        }
    });
});

function createSparkleEffect() {
    const genie = document.querySelector('.genie');
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = '20px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    sparkle.style.left = Math.random() * 60 + 'px';
    sparkle.style.top = Math.random() * 60 + 'px';
    
    genie.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

document.querySelector('.genie-face').addEventListener('click', createSparkleEffect);
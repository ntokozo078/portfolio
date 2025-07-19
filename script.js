// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved user preference
if (localStorage.getItem('theme') === 'dark-mode') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', '');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navContainer = document.getElementById('nav-container');
const closeBtn = document.getElementById('close-btn');

menuToggle.addEventListener('click', function() {
    navContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', function() {
    navContainer.classList.remove('active');
    document.body.style.overflow = '';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navContainer.classList.remove('active');
        document.body.style.overflow = '';
        
        // Update active link
        document.querySelectorAll('.nav-links a').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Update active link on scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Mouse Move Animation for Floating Words
const floatingWords = document.querySelectorAll('.move-with-mouse');

// Initialize floating words with random rotation
floatingWords.forEach((word, index) => {
    // Random rotation between -5 and 5 degrees
    const rotation = (Math.random() * 10) - 5;
    word.style.setProperty('--rotation', `${rotation}deg`);
});

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    floatingWords.forEach(word => {
        // Get original position from inline styles
        const originalX = parseInt(word.style.left) || 0;
        const originalY = parseInt(word.style.top) || 0;
        
        // Calculate distance from mouse to word
        const rect = word.getBoundingClientRect();
        const wordX = rect.left + rect.width / 2;
        const wordY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - wordX;
        const distanceY = mouseY - wordY;
        
        // Calculate movement (further from mouse = less movement)
        const moveX = distanceX * -0.02;
        const moveY = distanceY * -0.02;
        
        // Apply movement with limits
        const maxMove = 30;
        const limitedX = Math.max(-maxMove, Math.min(maxMove, moveX));
        const limitedY = Math.max(-maxMove, Math.min(maxMove, moveY));
        
        // Apply the transformation
        word.style.transform = `translate(${limitedX}px, ${limitedY}px) rotate(var(--rotation))`;
    });
});
// Initialize EmailJS with your Public Key
(function() {
    emailjs.init('ZEXsRSOLUb728uCPr'); // Replace with your actual public key
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const messageDiv = document.getElementById('form-message');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    messageDiv.style.display = 'none';
    
// Send the email using EmailJS
emailjs.sendForm('service_lixckkh', 'template_84udy4l', this)
    .then(function(response) {
            console.log('Email successfully sent!', response);
            messageDiv.textContent = 'Message sent successfully!';
            messageDiv.className = 'success';
            messageDiv.style.display = 'block';
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.error('Failed to send email:', error);
            messageDiv.textContent = 'Failed to send message. Please try again later. Error: ' + error.text;
            messageDiv.className = 'error';
            messageDiv.style.display = 'block';
        })
        .finally(function() {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
});
// Loading Screen Animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const typingText = document.getElementById('typing-text');
    const text = "Hello 😁!, welcome ";
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();
    
    // Hide loading screen after animation completes
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
    
    // Mouse Move Background Animation
    const circles = document.querySelectorAll('.bg-circle');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        circles.forEach((circle, index) => {
            const moveX = (x - 0.5) * 50 * (index + 1);
            const moveY = (y - 0.5) * 50 * (index + 1);
            circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Add hover effect to background circles
    circles.forEach(circle => {
        circle.addEventListener('mouseenter', () => {
            circle.style.opacity = '0.7';
            circle.style.transform = 'scale(1.1)';
        });
        
        circle.addEventListener('mouseleave', () => {
            circle.style.opacity = '1';
            circle.style.transform = 'scale(1)';
        });
    });
    
    // Rest of your existing JavaScript
    // ...
});
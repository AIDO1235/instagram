// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const passwordToggle = document.getElementById('passwordToggle');
const loadingSpinner = document.getElementById('loadingSpinner');
const messageContainer = document.getElementById('messageContainer');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// Slide elements for phone mockup
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSlideshow();
    setupEventListeners();
    addInputAnimations();
});

// Slideshow functionality
function initializeSlideshow() {
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto-advance slides every 4 seconds
    setInterval(nextSlide, 4000);

    // Click handlers for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// Event listeners setup
function setupEventListeners() {
    // Form submission
    loginForm.addEventListener('submit', handleLogin);
    
    // Password toggle
    passwordToggle.addEventListener('click', togglePassword);
    
    // Input focus animations
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
        input.addEventListener('input', handleInputChange);
    });
    
    // Button hover effects
    loginBtn.addEventListener('mouseenter', handleButtonHover);
    loginBtn.addEventListener('mouseleave', handleButtonLeave);
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    // Clear previous messages
    hideMessages();
    
    // Validate inputs
    if (!username || !password) {
        showErrorMessage('Please fill in all fields.');
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Simulate API call delay
    setTimeout(() => {
        // Check credentials (user: "user", password: "1234")
        if (username.toLowerCase() === 'user' && password === '1234') {
            showSuccessMessage();
            setTimeout(() => {
                // Simulate redirect or app loading
                document.body.style.transform = 'scale(1.05)';
                document.body.style.opacity = '0.8';
                setTimeout(() => {
                    alert('Welcome to Instagram! (This is a demo)');
                    resetForm();
                }, 1000);
            }, 1500);
        } else {
            showErrorMessage('Sorry, your password was incorrect. Please double-check your password.');
        }
        
        hideLoadingState();
    }, 1500);
}

// Show loading state
function showLoadingState() {
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
}

// Hide loading state
function hideLoadingState() {
    loginBtn.classList.remove('loading');
    loginBtn.disabled = false;
}

// Show success message
function showSuccessMessage() {
    hideMessages();
    successMessage.classList.add('show');
    
    // Add success animation to form
    loginForm.style.transform = 'scale(1.02)';
    setTimeout(() => {
        loginForm.style.transform = 'scale(1)';
    }, 200);
}

// Show error message
function showErrorMessage(message = 'Sorry, your password was incorrect. Please double-check your password.') {
    hideMessages();
    errorMessage.querySelector('span').textContent = message;
    errorMessage.classList.add('show');
    
    // Add shake animation to form
    loginForm.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        loginForm.style.animation = '';
    }, 500);
    
    // Add shake keyframes if not exists
    if (!document.querySelector('#shake-keyframes')) {
        const style = document.createElement('style');
        style.id = 'shake-keyframes';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Hide all messages
function hideMessages() {
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');
}

// Reset form
function resetForm() {
    loginForm.reset();
    hideMessages();
    document.body.style.transform = '';
    document.body.style.opacity = '';
}

// Toggle password visibility
function togglePassword() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = passwordToggle.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
    
    // Add animation
    passwordToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        passwordToggle.style.transform = 'scale(1)';
    }, 100);
}

// Input focus handling
function handleInputFocus(e) {
    const container = e.target.closest('.input-container');
    container.style.transform = 'translateY(-2px)';
    
    // Add glow effect
    container.style.boxShadow = '0 0 0 2px rgba(56, 151, 240, 0.2)';
    container.style.borderRadius = '8px';
}

// Input blur handling
function handleInputBlur(e) {
    const container = e.target.closest('.input-container');
    container.style.transform = '';
    container.style.boxShadow = '';
}

// Input change handling
function handleInputChange(e) {
    const input = e.target;
    const container = input.closest('.input-container');
    
    // Add subtle animation when typing
    if (input.value.length > 0) {
        container.classList.add('has-content');
    } else {
        container.classList.remove('has-content');
    }
}

// Button hover effects
function handleButtonHover(e) {
    if (!loginBtn.disabled) {
        loginBtn.style.transform = 'translateY(-2px) scale(1.02)';
    }
}

function handleButtonLeave(e) {
    if (!loginBtn.disabled) {
        loginBtn.style.transform = '';
    }
}

// Add input animations and effects
function addInputAnimations() {
    // Add floating label effect
    [usernameInput, passwordInput].forEach(input => {
        const container = input.closest('.input-container');
        
        // Create floating label if not exists
        if (!container.querySelector('.floating-label')) {
            const label = document.createElement('span');
            label.className = 'floating-label';
            label.textContent = input.placeholder;
            container.appendChild(label);
        }
        
        // Handle floating label animation
        input.addEventListener('focus', () => {
            const label = container.querySelector('.floating-label');
            if (label) {
                label.style.transform = 'translateY(-25px) scale(0.8)';
                label.style.color = '#3897f0';
                label.style.opacity = '1';
            }
        });
        
        input.addEventListener('blur', () => {
            const label = container.querySelector('.floating-label');
            if (label && input.value === '') {
                label.style.transform = '';
                label.style.color = '';
                label.style.opacity = '0';
            }
        });
    });
}

// Particle effect for successful login
function createParticleEffect() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: 50%;
                top: 50%;
                animation: particleFloat 2s ease-out forwards;
            `;
            
            // Add particle animation
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 100 + Math.random() * 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, i * 50);
    }
    
    // Add particle animation keyframes if not exists
    if (!document.querySelector('#particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translate(-50%, -50%) translate(0, 0) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced success message with particles
const originalShowSuccess = showSuccessMessage;
showSuccessMessage = function() {
    originalShowSuccess();
    createParticleEffect();
};

// Add CSS for floating labels
const labelStyle = document.createElement('style');
labelStyle.textContent = `
    .floating-label {
        position: absolute;
        left: 45px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.9);
        padding: 0 5px;
        font-size: 0.8rem;
        color: #8e8e8e;
        pointer-events: none;
        transition: all 0.3s ease;
        opacity: 0;
        z-index: 1;
    }
    
    .input-container.has-content .floating-label {
        transform: translateY(-25px) scale(0.8);
        opacity: 1;
    }
`;
document.head.appendChild(labelStyle);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form when focused on inputs
    if (e.key === 'Enter' && (e.target === usernameInput || e.target === passwordInput)) {
        e.preventDefault();
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape key to clear form
    if (e.key === 'Escape') {
        resetForm();
    }
});

// Add smooth scrolling for mobile
if (window.innerWidth <= 768) {
    window.addEventListener('resize', function() {
        if (document.activeElement && (document.activeElement === usernameInput || document.activeElement === passwordInput)) {
            setTimeout(() => {
                document.activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    });
}

// Preload any resources
window.addEventListener('load', function() {
    // Add any initialization code here
    console.log('Instagram Login Page Loaded Successfully');
});

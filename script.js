// Wait for the page to fully load before running our code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS FIRST
    emailjs.init("lbV_UwSVIENMX1neJ");
    
    // Get references to important elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile menu toggle function
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            // Toggle the mobile menu open/closed
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Add scroll effect to navigation bar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
    
    // Animate service cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Watch all service cards for animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });
});

// Function to scroll smoothly to the services section
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Function to open contact form (scrolls to contact section)
function openContactForm() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle form submission with EmailJS
   function handleFormSubmit(event) {
    event.preventDefault();
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    
    // Get form data
    const form = event.target;
    const name = form.querySelector('input[placeholder="Your Name"]').value;
    const email = form.querySelector('input[placeholder="Your Email"]').value;
    const company = form.querySelector('input[placeholder="Company Name"]').value;
    const message = form.querySelector('textarea').value;
    
    // Prepare template parameters
    const templateParams = {
        // For both templates
        name: name,
        company: company,
        message: message,
        
        // For notification (to you)
        to_business: "codecrafters583@gmail.com",  // Your business email
        
        // For auto-reply (to customer)
        from_email: email,  // Customer's email for reply-to and sending auto-reply
        
        // Keep this for backward compatibility with your templates
        email: email  // This will change to customer's email!
    };
    
    // First, send the auto-reply to the customer
    emailjs.send('service_oapqtbu', 'template_fwdjjtm', templateParams)
        .then(function(response) {
            console.log('Auto-reply sent!');
            
            // Then send notification to your business email
            return emailjs.send('service_oapqtbu', 'template_nd4ttpl', templateParams);
        })
        .then(function(response) {
            console.log('Notification sent!');
            submitBtn.textContent = "Message Sent!";
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch(function(error) {
            console.log('Failed to send email', error);
            submitBtn.textContent = "Error! Try Again";
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
}

// Add smooth hover effects to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add typing effect to the hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Lazy loading for better performance
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to images when they're about to be visible
    const images = document.querySelectorAll('img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.transition = 'opacity 0.3s';

                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.style.opacity = '0';
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                }

                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});


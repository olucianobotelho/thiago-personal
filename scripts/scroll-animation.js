/**
 * Scroll Animation for Section Titles
 * This script changes section titles to yellow when they become visible on screen
 * with a gradual light bulb effect
 */

document.addEventListener('DOMContentLoaded', function() {
    // Select all section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    
    // Create options for the Intersection Observer
    const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin
        threshold: 0.3 // Trigger when 30% of the element is visible
    };
    
    // Create a new Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Add the light-up class to create the animation effect
                entry.target.classList.add('light-up');
                
                // Stop observing the element after it's been animated
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Start observing each section title
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
});
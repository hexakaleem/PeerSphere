// * Script for Footer.
document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackMessage = document.getElementById('feedback-message');

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = feedbackForm.querySelector('input[type="email"]').value;
        const message = feedbackForm.querySelector('textarea').value;

        // Here you would typically send the feedback to your server
        console.log('Feedback submitted:', { email, message });

        // Show the feedback message
        feedbackMessage.style.display = 'block';

        // Hide the message after 3 seconds
        setTimeout(() => {
            feedbackMessage.style.display = 'none';
        }, 3000);

        // Reset the form
        feedbackForm.reset();
    });
});
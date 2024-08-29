// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const forgotPasswordLink = document.querySelector('.forgot-password');

    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetForm = tab.getAttribute('data-tab');
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${targetForm}-form`).classList.add('active');
        });
    });

    // Toggle password visibility
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.closest('.input-group').querySelector('input[type="password"], input[type="text"]');
            if (input && input.type === 'password') {
                input.type = 'text';
                btn.classList.replace('fa-eye-slash', 'fa-eye');
            } else if (input) {
                input.type = 'password';
                btn.classList.replace('fa-eye', 'fa-eye-slash');
            }
        });
    });
    

    // Sign In form submission
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        // Here you would typically send the credentials to your server for authentication
        console.log('Sign In:', { email, password });
        // For demo purposes, we'll just show an alert
        alert('Sign In successful!');
    });

    // Sign Up form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        // Here you would typically send the registration data to your server
        console.log('Sign Up:', { name, email, password });
        // For demo purposes, we'll just show an alert
        alert('Sign Up successful!');
    });

    // Forgot password functionality
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = prompt('Enter your email address to reset your password:');
        if (email) {
            // Here you would typically send a password reset email
            console.log('Password reset requested for:', email);
            // For demo purposes, we'll just show an alert
            alert('Password reset link sent to your email!');
        }
    });

    // Form validation
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        return isValid;
    }

    signinForm.addEventListener('submit', (e) => {
        if (!validateForm(signinForm)) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });

    signupForm.addEventListener('submit', (e) => {
        if (!validateForm(signupForm)) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
});
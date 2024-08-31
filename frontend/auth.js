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

    // Custom alert function
    function showCustomAlert(message, type = 'success') {
        const alertElement = document.createElement('div');
        alertElement.className = `custom-alert ${type}`;
        alertElement.textContent = message;
        document.body.appendChild(alertElement);
        setTimeout(() => {
            alertElement.remove();
        }, 3000);
    }

    // Sign In form submission
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(signinForm)) {
            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;
            // Here you would typically send the credentials to your server for authentication
            console.log('Sign In:', { email, password });
            showCustomAlert('Sign In successful!');
            signinForm.reset();
        }
    });

    // Sign Up form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(signupForm)) {
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;

            if (password !== confirmPassword) {
                showCustomAlert("Passwords don't match!", 'error');
                return;
            }

            // Here you would typically send the registration data to your server
            console.log('Sign Up:', { name, email, password });
            showCustomAlert('Sign Up successful!');
            signupForm.reset();
        }
    });

    // Forgot password functionality
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        const popup = document.createElement('div');
        popup.className = 'forgot-password-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <h3>Reset Password</h3>
                <input type="email" id="reset-email" placeholder="Enter your email" required>
                <button id="reset-submit">Send Reset Link</button>
                <button id="reset-cancel">Cancel</button>
            </div>
        `;
        document.body.appendChild(popup);

        document.getElementById('reset-submit').addEventListener('click', () => {
            const email = document.getElementById('reset-email').value;
            if (email && validateEmail(email)) {
                // Here you would typically send a password reset email
                console.log('Password reset requested for:', email);
                showCustomAlert('Password reset link sent to your email!');
                popup.remove();
            } else {
                showCustomAlert('Please enter a valid email address.', 'error');
            }
        });

        document.getElementById('reset-cancel').addEventListener('click', () => {
            popup.remove();
        });
    });

    // Form validation
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                showCustomAlert(`Please fill in ${input.placeholder}`, 'error');
            } else {
                input.classList.remove('error');
            }
        });
        return isValid;
    }

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
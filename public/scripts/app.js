// Add these lines to the top of app.js if they are missing!
const contactForm = document.querySelector('.contact-form');
const name = document.getElementById('name');
const dob = document.getElementById('dob');
const tel = document.getElementById('tel');
const email = document.getElementById('email');
const inquiry = document.getElementById('inquiry');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button');
    const originalText = submitBtn.innerText;

    try {
        // Start Loading
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';

        const response = await fetch('/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                dob: document.getElementById('dob').value,
                tel: document.getElementById('tel').value,
                email: document.getElementById('email').value,
                subject: "Inquiry",
                message: document.getElementById('inquiry').value
            })
        });

        const result = await response.json();
        console.log(result.message);
        if (result.status === 'success') contactForm.reset();

    } catch (err) {
        console.error(err);
        alert("Could not connect to server.");
    } finally {
        // Stop Loading
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
    }
});
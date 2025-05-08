// Function to validate the petition form
function validateForm() {
    // Capture the name and email values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const signatureFeedback = document.getElementById('signatureFeedback');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate name and email
    if (name === "" || !emailRegex.test(email)) {
        signatureFeedback.textContent = "Please enter a valid name and email address.";
        signatureFeedback.style.display = "block";
        document.getElementById('email').classList.add('invalid');
        return false;
    }

    // Clear error message if valid
    signatureFeedback.style.display = "none";
    document.getElementById('email').classList.remove('invalid');

    // Add signature to the list
    const signaturesList = document.getElementById('signaturesList');
    const newSignature = document.createElement('div');
    newSignature.classList.add('signature-box');
    const currentDate = new Date().toLocaleDateString();
    newSignature.innerHTML = `
        <div class="signature-name">${name}</div>
        <div class="signature-email">${email}</div>
        <div class="signature-date">${currentDate}</div>
        <button class="signature-button">Signed</button>
    `;
    signaturesList.appendChild(newSignature);

    // Update signature count
    const signatureCount = signaturesList.children.length;
    document.getElementById('signatureCountDisplay').textContent = `Signatures: ${signatureCount - 2}`;

    // Show popup with user's name
    showPopup(name);

    return false; // Prevent form submission and page reload
}

// Show the popup with the user's name
function showPopup(name) {
    console.log("Popup called with name: " + name);  // Debugging line

    // Check if the name is valid
    if (!name) {
        console.error("Name is not defined properly!");
        return;
    }

    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');

    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });
    
    // Dynamically update the popup HTML with the name
    const popupMessage = `
        <div class="overlay-message">
            <p><strong>${name}</strong></p>
            <p>${currentDate}</p>
            <p>Sign Petition</p>
        </div>
        <p>Thank you for signing the petition to protect the Chincoteague National Wildlife Refuge!</p>
        <h2>Thank You, ${name}!</h2>
        <img src="img/Chincoteague_Refuge_advocacy_campaign.jpg" alt="Chincoteague National Wildlife Refuge" class="popup-image">
    `;

    // Insert the dynamically created popup message into the popup
    popup.innerHTML = popupMessage + popup.querySelector('button').outerHTML;
    
    // Display the popup
    popup.style.display = 'block';
    overlay.style.display = 'block';

    // Close popup after 5 seconds
    setTimeout(() => {
        closePopup();
    }, 5000);  // 5 seconds
}

// Close the popup
function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    popup.style.display = 'none';
    overlay.style.display = 'none';
}


const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const target = entry.target;
        if (entry.isIntersecting) {
            target.classList.add('visible'); // Section becomes visible when scrolled down
        } else {
            target.classList.remove('visible'); // Section fades out when scrolled up
        }
    });
}, { threshold: 0.5 }); // Add a threshold to trigger when 50% of the section is visible

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});

// Toggle Get Involved Form
function toggleForm() {
    const petitionSection = document.getElementById('petition');
    petitionSection.style.display = petitionSection.style.display === 'none' ? 'block' : 'none';
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Reduce Motion toggle
let reduceMotionEnabled = false;
document.getElementById('reduceMotionButton').addEventListener('click', function () {
    reduceMotionEnabled = !reduceMotionEnabled;
    document.body.classList.toggle('reduce-motion', reduceMotionEnabled);
});

// Navigation Toggle
function toggleNav() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('open');
}

// News Item Toggle
function toggleNews(index) {
    const newsItem = document.getElementById(`news-item-${index}`);
    newsItem.style.display = newsItem.style.display === 'none' ? 'block' : 'none';
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add event listeners for form submission and modal closing
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("sign-petition");
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const modalName = document.getElementById("modalName");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from submitting normally

        // Get the name input value
        const nameInput = document.getElementById("name").value;

        // Set the name in the popup
        modalName.textContent = nameInput;

        // Show the popup and overlay
        popup.style.display = "block";
        overlay.style.display = "block";
    });

    // Close the popup
    window.closePopup = () => {
        popup.style.display = "none";
        overlay.style.display = "none";
    };
});

// Event listener to close the modal
document.querySelector('.close-btn').addEventListener('click', () => {
    closeModal();
});

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
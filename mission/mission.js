// Toggle menu visibility on small screens
document.querySelector('.menu-button').addEventListener('click', function() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('hide');
});

// Handle window resizing
function handleResize() {
    const nav = document.querySelector('nav ul');
    if (window.innerWidth > 1000) {
        nav.classList.remove('hide');
    } else {
        nav.classList.add('hide');
    }
}
window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// Function to generate the viewer modal's HTML structure
function viewerTemplate(pic, alt) {
    return `<div class="viewer">
        <button class="close-viewer">X</button>
        <img src="norris-sm.jpeg" alt="${alt}">
    </div>`;
}

// Function to handle the image click and open the viewer
function viewHandler(event) {
    const clickedElement = event.target;

    if (clickedElement.tagName === 'IMG') {
        // Get the current image source and alt text
        const src = clickedElement.src;
        const alt = clickedElement.alt;

        // Replace "-sm" with "-full" for the full-size image
        const fullImageSrc = src.replace('-sm', '-full');
        
        // Insert the modal HTML with the full-size image at the top of the body
        document.body.insertAdjacentHTML("afterbegin", viewerTemplate(fullImageSrc, alt));

        // Add event listener to close the modal
        document.querySelector('.close-viewer').addEventListener('click', closeViewer);
    }
}

// Function to close the modal
function closeViewer() {
    const viewer = document.querySelector('.viewer');
    if (viewer) {
        viewer.remove();
    }
}

// Add click event listener to the gallery section
document.querySelector('.gallery').addEventListener('click', viewHandler);

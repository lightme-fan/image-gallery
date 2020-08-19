console.log("let's code our gallery!");

// We need to create a Closure
function Gallery(gallery) {
    // Throwing errors
    if (!gallery) {
        throw new Error('No variable found');
    }
    
    // Select the elements we need. Change the images into arrays
    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');

    // Create an empy variable
    let currentImage;
    
    // Open modal 
    function openModal() {
        console.info('Opening modal');

        // Check if the modal is already open
        if (modal.matches('.open')) { // OR if (modal.contains('.open)) {}
            console.log('Modal already open');
        }

        // Add the open class to the modal
        modal.classList.add('open');

        // Event listeners to be bound when modal is open
        window.addEventListener('keyup', handleEscapeBttun);

        // Add event listener to show the next image
        nextButton.addEventListener('click', showNextImage);
        
        // Add event listener to show the prev image
        prevButton.addEventListener('click', showPrevImage);
    }

    // Remove modal
    function closeModal() {
        modal.classList.remove('open');
        // TODO: Add event listener for click and escape

        // Removing event listener when modal is close
        window.removeEventListener('keyup', handleEscapeBttun);

        // remove event listener to show the next image
        nextButton.removeEventListener('click', showNextImage);

        // Remove event listener to show the next image
        prevButton.removeEventListener('click', showPrevImage);
    }

    // Handle Click Outside
    function handleClickOutside(e) {
        if (e.currentTarget === e.target) {
            return closeModal();
        }
    }

    // Listen to the keydown 
    function handleEscapeBttun(e) {
        if (e.key === 'Escape') {
            return closeModal();
        }

        // Handle the left key to show the prev image
        if (e.key === 'ArrowLeft') {
            return showPrevImage();
        }

        // Handle the right key to show the next image
        if (e.key === 'ArrowRight') {
            return showNextImage();
        }

        // Handle the up key to show the prev image
        if (e.key === 'ArrowUp') {
            return showPrevImage();
        }

        // Handle the down key to show the next image
        if (e.key === 'ArrowDown') {
            return showNextImage();
        }
    }

    // Showing the next imaGE when I click the next button 
    function showNextImage() {
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }

    // Showing the prev imaGE when I click the prev button 
    function showPrevImage() {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }

    // A function to show an image
    function showImage(el) {
        // Safety check
        if (!el) {
            return;
        }
        console.info('No gallery founfd');

        // Update the modal with this info
        console.log(el);
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent = el.dataset.description;
        
        // Store a reference current image for later
        currentImage = el;

        // Call the openModal here
        openModal();
    }

    // Looping through the images
    images.forEach(image => image.addEventListener(('click'), e => {
        showImage(e.currentTarget);
    }));

    // Looping thorough the images to handle the Enter key
    images.forEach(image => image.addEventListener(('keydown'), e => {
        // Attach an event listener for each image
        if (e.key === 'Enter') {
            // show the image when the Enter is pressed
            showImage(e.currentTarget);
        }
    }));

    // Modal event listener
    modal.addEventListener('click', handleClickOutside);

}

// Call the Gallery function to seize the gallery one and two 
const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
const gallery3 = Gallery(document.querySelector('.gallery3'));


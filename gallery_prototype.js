console.log("let's code our gallery!");

// We need to create a Closure
function Gallery(gallery) {
    // Throwing errors
    if (!gallery) {
        throw new Error('No variable found');
    }
    
    this.gallery = gallery;
    
    // Select the elements we need. Change the images into arrays
    this.images = Array.from(gallery.querySelectorAll('img'));
    this.modal = document.querySelector('.modal');
    this.prevButton = this.modal.querySelector('.prev');
    this.nextButton = this.modal.querySelector('.next');

    
    // Looping through the images
    this.images.forEach(image => image.addEventListener(('click'), e => {
        this.showImage(e.currentTarget);
    }));

    this.showNextImage = this.showNextImage.bind(this);
    this.showPrevImage = this.showPrevImage.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleEscapeBttun = this.handleEscapeBttun.bind(this);

    // Looping thorough the images to handle the Enter key
    this.images.forEach(image => image.addEventListener(('keydown'), e => {
        // Attach an event listener for each image
        if (e.key === 'Enter') {
            // show the image when the Enter is pressed
            this.showImage(e.currentTarget);
        }
    }));
}

// Open modal 
Gallery.prototype.openModal = function() {
    console.info('Opening modal');

    // Check if the modal is already open
    if (this.modal.matches('.open')) { // OR if (modal.contains('.open)) {}
        console.log('Modal already open');
    }

    // Add the open class to the modal
    this.modal.classList.add('open');

    // Event listeners to be bound when modal is open
    window.addEventListener('keyup', this.handleEscapeBttun);

    // Add event listener to show the next image
    this.nextButton.addEventListener('click', this.showNextImage);
    
    // Add event listener to show the prev image
    this.prevButton.addEventListener('click', this.showPrevImage);
}

// Remove modal
Gallery.prototype.closeModal = function() {
    this.modal.classList.remove('open');
    // TODO: Add event listener for click and escape

    // Removing event listener when modal is close
    window.removeEventListener('keyup', this.handleEscapeBttun);

    // remove event listener to show the next image
    this.nextButton.removeEventListener('click', this.showNextImage);

    // Remove event listener to show the next image
    this.prevButton.removeEventListener('click', this.showPrevImage);
}

// Handle Click Outside
Gallery.prototype.handleClickOutside = function(e) {
    if (e.currentTarget === e.target) {
        console.log(this);
        this.closeModal();
    }
}

// Showing the prev imaGE when I click the prev button 
Gallery.prototype.showPrevImage = function() {
    this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);
}

// Showing the next imaGE when I click the next button 
Gallery.prototype.showNextImage = function() {
    this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
}

// A Gallery.prototype.to = function show an image
Gallery.prototype.showImage = function(el) {
    // Safety check
    if (!el) {
        return;
    }
    console.info('No gallery founfd');

    // Update the modal with this info
    console.log(el);
    this.modal.querySelector('img').src = el.src;
    this.modal.querySelector('h2').textContent = el.title;
    this.modal.querySelector('figure p').textContent = el.dataset.description;
    
    // Store a reference current image for later
    this.currentImage = el;

    // Call the openModal here
    this.openModal();
}

// Listen to the keydown 
Gallery.prototype.handleEscapeBttun = function(e) {
    if (e.key === 'Escape') {
        this.closeModal();
    }

    // Handle the left key to show the prev image
    if (e.key === 'ArrowLeft') {
        this.showPrevImage();
    }

    // Handle the right key to show the next image
    if (e.key === 'ArrowRight') {
        this.showNextImage();
    }

    // Handle the up key to show the prev image
    if (e.key === 'ArrowUp') {
        this.showPrevImage();
    }

    // Handle the down key to show the next image
    if (e.key === 'ArrowDown') {
        this.showNextImage();
    }
}


// Call the Gallery function to seize the gallery one and two 
const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
const gallery3 = new Gallery(document.querySelector('.gallery3'));

console.log(gallery1, gallery2, gallery3)
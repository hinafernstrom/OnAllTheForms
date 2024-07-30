document.addEventListener('DOMContentLoaded', function () {
  // Set perspective using regular JavaScript
  document.getElementById('container').style.perspective = '2000px';
  document.getElementById('containertwo').style.perspective = '2000px'; // Set perspective for the second container
  document.getElementById('containerthree').style.perspective = '2000px'; // Set perspective for the third container

  const n = 20; 
  const imageUrls = [
    'img.png',
    'https://hina-image-hosting.s3.amazonaws.com/img/bird.png',
    'https://hina-image-hosting.s3.amazonaws.com/img/bg.png',
    'https://hina-image-hosting.s3.amazonaws.com/img/water.png',
    'https://hina-image-hosting.s3.amazonaws.com/img/mine.png',
    'finalbg.png',
    'large.png',
    'https://hina-image-hosting.s3.amazonaws.com/img/historyweek2.png',
    // 'za.gif',
  ];

  const waterImageUrl = 'water.png'; 
  const additionalImagesForContainertwo = [
    'https://hina-image-hosting.s3.amazonaws.com/img/plant.png',
    'https://hina-image-hosting.s3.amazonaws.com/img/water.png',
    'https://hina-image-hosting.s3.amazonaws.com/img/im.gif',
    'https://hina-image-hosting.s3.amazonaws.com/img/historyweek2.png',
  ];

  const imagesForContainerthree = [
    // 'plant.png',
    // 'za.gif',
    // 'bg.png',
  ];

  const imagesForContainerfour = [
    // 'fire.png',
    // 'fire2.png',
    // 'flower.png',

  ];
  

  function createBoxes(containerId, topPosition, images, customWidth, customHeight) {
    const container = document.getElementById(containerId);

    for (let i = 0; i < n; i++) {
      let b = document.createElement('div');
      b.classList.add('box');
      container.appendChild(b);

      b.style.left = '50%';
      b.style.top = `calc(${topPosition} + 5%)`; 
      b.style.transform = 'translate(-50%, -50%)';
      b.style.color = '#fff';
      b.style.zIndex = '2000';
      b.style.width = customWidth || '80%'; 
      b.style.height = customHeight || '110%';
      b.style.transformOrigin = '50% 50% -1000%';


      if (containerId === 'containertwo') {
        // Use additional images for the second container
        b.style.backgroundImage = `url(${additionalImagesForContainertwo[i % additionalImagesForContainertwo.length]})`;
      } else if (containerId === 'containerthree') {
        // Use specific images for the third container
        b.style.backgroundImage = `url(${images[i % images.length]})`;
      } else {
        b.style.backgroundImage = `url(${images[i % images.length]})`;
      }

      b.style.backgroundPosition = `${i * (100 / n)}% -220px`; // Corrected background position calculation
      b.style.backgroundSize = 'cover'; 
      b.style.position = 'absolute';

      b.style.transform += ` rotateY(${(i / n) * 360}deg)`;

      b.addEventListener('click', function () {
        downloadImage(images[i % images.length]);
      });

      b.title = 'Download';
    }
  }

  createBoxes('container', '50%', imageUrls);
  createBoxes('containertwo', '110%', additionalImagesForContainertwo, '300px', '120%');
  // createBoxes('containerthree', '60px', imagesForContainerthree, '200px', '80%');
  // createBoxes('containerfour', '50%', imagesForContainerfour, '850px', '90%');
  

  window.onmousemove = (e) => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, i) => {
      box.style.transition = 'transform 0.6s';
      // Adjust rotationY based on mouse position
      box.style.transform = `translate(-50%, -50%) rotateY(${-180 + (i / n) * 360 + 360 * (e.clientX / window.innerWidth)}deg)`;
    });
  };

  // Function to initiate image download
  function downloadImage(imageUrl) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop(); // Set the filename for download
    link.click();
  }
});

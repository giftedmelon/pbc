 // Smooth scroll for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var fabBtn = document.getElementById('fabBtn');
    var fabContent = document.getElementById('fabContent');
  
    fabBtn.addEventListener('click', function () {
      // Toggle the visibility of the fab content
      if (fabContent.style.display === 'block') {
        fabContent.style.display = 'none';
      } else {
        fabContent.style.display = 'block';
      }
    });
  });
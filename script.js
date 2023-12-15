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

    mainBtn.addEventListener('click', function () {
      // Toggle the visibility of the fab content
      if (fabContent.style.display === 'block') {
        fabContent.style.display = 'none';
      } 
    });
  });

  function submitForm() {
    var comment = document.getElementById("comment").value;
  
    if (comment.trim() === "") {
      alert("Please enter a comment.");
      return;
    }
  
    var formData = new FormData();
    formData.append("comment", comment);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://script.google.com/macros/s/AKfycbygLOAslc6EapkwoINOiVH_ZG9CbpbqgGp88EwKMUU2jcH6nF4FiILvmlz0J_YooHsV/exec", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            alert("Comment submitted successfully!");
            document.getElementById("commentForm").reset();
          } else {
            console.error("Error: Unable to submit comment", xhr.responseText);
          }
        }
      };
  
    xhr.send(formData);
  }


  document.addEventListener('DOMContentLoaded', function() {
    // Hide the comment form initially
    var commentForm = document.getElementById("commentForm");
    commentForm.style.display = "none";
  })

  function toggleContent() {
    var content = document.getElementById("content");
    var helloContent = document.getElementById("helloContent");
    var byeContent = document.getElementById("byeContent");
    var switchInput = document.querySelector('.toggle-switch input');
    var modeText = document.getElementById("modeText");
    var commentForm = document.getElementById("commentForm");

  
    if (switchInput.checked) {
      // Switching to Edit Mode
      modeText.innerText = "Edit Mode ON";
      helloContent.style.display = "none";
      commentForm.style.display = "block";
    } else {
      // Switching to Common Mode
      modeText.innerText = "Edit Mode";
      helloContent.style.display = "block";
      commentForm.style.display = "none";
    }
  }

  
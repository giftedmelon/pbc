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
    var option1 = document.getElementById("option1").checked;
    var option2 = document.getElementById("option2").checked;
    var option3 = document.getElementById("option3").checked;
    var currentDate = new Date();
    

    console.log(option1);
  
    if (comment.trim() === "") {
      alert("Please enter a comment.");
      return;
    }
  
    var formData = new FormData();
    formData.append("comment", comment);
    formData.append("option1", option1);
    formData.append("option2", option2);
    formData.append("option3", option3);
    formData.append("submissionTime", currentDate);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://script.google.com/macros/s/AKfycbxpMMf3zYDWSy8QmZaobwHCOdC9OZPivN3UBvtcQ2UIM7I7Wyo1U9iTawsakMAgBFpC/exec", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            alert("Comment submitted successfully!");
            document.getElementById("comment-form").reset();
          } else {
            console.error("Error: Unable to submit comment", xhr.responseText);
          }
        }
      };
  
    xhr.send(formData);

    // Close the modal
    closeCommentModal();
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

  document.addEventListener('selectionchange', function () {
      var selectedText = getSelectedText();
      if (selectedText) {
        showFloatingWindow(selectedText);
      } else {
        hideFloatingWindow();
      }
    });

    function getSelectedText() {
      if (window.getSelection) {
        return window.getSelection().toString();
      } else if (document.selection && document.selection.type !== 'Control') {
        return document.selection.createRange().text;
      }
      return '';
    }

    function showFloatingWindow(selectedText) {
      var floatingWindow = document.getElementById('floating-window');
      var selection = window.getSelection();

      if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        var rect = range.getBoundingClientRect();

        floatingWindow.style.top = rect.bottom + window.scrollY + 'px';
        floatingWindow.style.left = (rect.left + rect.right) / 2 + window.scrollX - floatingWindow.offsetWidth / 2 + 'px';

        floatingWindow.style.display = 'block';

        document.getElementById('comment-button').addEventListener('click', function () {
          showCommentModal();
        });

        document.getElementById('highlight-button').addEventListener('click', function () {
          highlightSelectedText(range);
        });
      }
    }

    function hideFloatingWindow() {
      var floatingWindow = document.getElementById('floating-window');
      floatingWindow.style.display = 'none';
    }

    function showCommentModal() {
      var commentModal = document.getElementById('comment-modal');
      commentModal.classList.add('open'); // Add the 'open' class to show the modal
    }

    function closeCommentModal() {
      var commentModal = document.getElementById('comment-modal');
      commentModal.classList.remove('open'); // Remove the 'open' class to hide the modal
    }

    function submitComment() {
      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      var selectedOptions = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.name);
      var commentText = document.getElementById('comment').value;

      // You can perform further actions with the selected options and comment here
      console.log('Selected Options:', selectedOptions);
      console.log('Comment:', commentText);

      // Close the modal
      closeCommentModal();
    }

    function highlightSelectedText(range) {
      var span = document.createElement('span');
      span.style.backgroundColor = 'red';
      span.textContent = range.toString();
      range.deleteContents();
      range.insertNode(span);
    }
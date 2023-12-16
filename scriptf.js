// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

function submitForm() {
    var comment = document.getElementById("comment").value;
    var currentDate = new Date();
    //var currentTime = currentDate.toISOString();
  
    if (comment.trim() === "") {
      alert("Please enter a comment.");
      return;
    }

    console.log(currentDate);
  
    var formData = new FormData();
    formData.append("comment", comment);
    formData.append("option1", "sample");
    formData.append("option2", "sample");
    formData.append("option3", "sample");
    formData.append("submissionTime", currentDate);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://script.google.com/macros/s/AKfycbwSE0PJI4p3CEMdL-i_jz6wkY7abT6WsB3L3U47GTJoTtBjkTjnDgJfvjfSoSAcWwK-/exec", true);
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

////////////////////////////////////////

function submitForm() {
  var comment = document.getElementById("comment").value;
  var currentDate = new Date();
  //var currentTime = currentDate.toISOString();

  if (comment.trim() === "") {
    alert("Please enter a comment.");
    return;
  }

  console.log(currentDate);

  var formData = new FormData();
  formData.append("comment", comment);
  formData.append("option1", "sample");
  formData.append("option2", "sample");
  formData.append("option3", "sample");
  formData.append("submissionTime", currentDate);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://script.google.com/macros/s/AKfycbwSE0PJI4p3CEMdL-i_jz6wkY7abT6WsB3L3U47GTJoTtBjkTjnDgJfvjfSoSAcWwK-/exec", true);
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

/////////////////////////////////////////////////

function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.selection && document.selection.type !== 'Control') {
    return document.selection.createRange().text;
  }
  return '';
}

function getPathFromElement(element) {
  var stack = [];
  while (element.parentNode != document.documentElement) {
      var sibCount = 0;
      var sibIndex = 0;
      var childNodes = element.parentNode.childNodes;
      var childlength = childNodes.length;

      for(var i = 0; i < childlength; i++) {
          var sib = childNodes[i];
          if (sib.nodeName == element.nodeName) {
              if (sib === element) {
                  sibIndex = sibCount;
              }
              sibCount++;
          }
      }
      if (element.hasAttribute('id') && element.id != '') {
          stack.unshift('$element.nodeName.toLowerCase()#${element.id}');
      } else if (sibCount > 1) {
          stack.unshift('${element.nodeName.toLowerCase()}: eq(${sibIndex})');
      } else {
          stack.unshift(element.nodeName.toLowerCase());
      }
      element = element.parentNode;
  }
  return stack.join(' > ');
}

document.addEventListener('selectionchange', function () {
  var selectedText = getSelectedText();
  if (selectedText) {
    showFloatingWindow(selectedText);
  } else {
    hideFloatingWindow();
  }
  console.log('selectedText', selectedText);
});

document.addEventListener('click', function(event) {
  var path = getPathFromElement(event.target);
  if (path) {
    showFloatingWindow(event);
  } else {
    hideFloatingWindow();
  }
  console.log('path', path);
  console.log('event.target', event);
});



function showFloatingWindow(event) {
  var floatingWindow = document.getElementById('floating-window');
  var selection = window.getSelection();

  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0);
    var rect = range.getBoundingClientRect();
    var x=event.clientX;
    var y=event.clientY;

    //console.log(x,y);

    floatingWindow.style.top = y + 'px';
    floatingWindow.style.left = x + 'px';

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

function highlightSelectedText(range) {
  var span = document.createElement('span');
  span.style.backgroundColor = 'red';
  span.textContent = range.toString();
  range.deleteContents();
  range.insertNode(span);
}
function getPathFromElement(element) {
    var path = [];
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
            stack.unshift(element.nodeName.toLowerCase() + '#' + element.id);
        } else if (sibCount > 1) {
            stack.unshift('${element.nodeName.toLowerCase()}: eq(${sibIndex})');
        } else {
            stack.unshift(element.nodeName.toLowerCase());
        }
        element = element.parentNode;
    }
    return stack.join(' > ');
}

function getSelectedText() {
    if (window.getSelection) {
      return window.getSelection().toString();
    } else if (document.selection && document.selection.type !== 'Control') {
      return document.selection.createRange().text;
    }
    return '';
  }
  
  document.addEventListener('selectionchange', function () {
    var selectedText = getSelectedText();
    console.log('selectedText', selectedText);
  });
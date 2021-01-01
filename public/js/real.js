var oDoc, sDefTxt;

function initDoc() {
                      oDoc = document.getElementById("textBox");
                                                                  sDefTxt = oDoc.innerHTML;
                                                                                              if (document.boboForm.switchMode.checked) { setDocMode(true); }
}

function formatDoc(sCmd, sValue) {
                                    if (validateMode()) { document.execCommand(sCmd, false, sValue);

                                      oDoc.focus(); }
}

function validateMode() {
                          if (!document.boboForm.switchMode.checked) { return true ; }
                                                                                        alert("Uncheck \"Show HTML\".");
                                                                                                                          oDoc.focus();
                                                                                                                                        return false;
}

function setDocMode(bToSource) {  var oContent;
                                                if (bToSource) {
                                                                  oContent = document.createTextNode(oDoc.innerHTML);
                                                                                                                      oDoc.innerHTML = "";
                                                                                                                                            var oPre = document.createElement("pre");
                                                                                                                                                                                      oDoc.contentEditable = false;
  oPre.id = "sourceText";
                          oPre.contentEditable = true;
                                                        oPre.appendChild(oContent);
                                                                                    oDoc.appendChild(oPre);
                                                                                                            document.execCommand("defaultParagraphSeparator", false, "div");
                                                } else {
                                                          if (document.all) {
                                                                                oDoc.innerHTML = oDoc.innerText;
                                                          } else {
                                                                      oContent = document.createRange();
                                                                                                          oContent.selectNodeContents(oDoc.firstChild);
                                                                                                                                                          oDoc.innerHTML = oContent.toString();   }
                                                                      oDoc.contentEditable = true;    }   oDoc.focus();
}

var format = document.getElementById('format');

format.addEventListener('change' , function() {
                                                formatDoc('formatblock' , this[this.selectedIndex].value);
                                                                                                          this.selectedIndex=0;
})

var clean = document.getElementById('clean');

clean.addEventListener('click' , function(e) {

      e.preventDefault();
                                              if(validateMode() && confirm('Are you sure?')) {
                                                                                                oDoc.innerHTML = sDefTxt
                                                                                       };
})

var undo = document.getElementById('undo');

undo.addEventListener('click' , function(e) {

      e.preventDefault();
                                              formatDoc('undo');
})


var $copy = document.getElementById('copy');

$copy.addEventListener('click', function(e) {

      e.preventDefault();
                                               formatDoc('copy');
});

var $cut = document.getElementById('cut');

$cut.addEventListener('click', function(e) {

      e.preventDefault();
                                               formatDoc('cut');
});


var redo = document.getElementById('redo');

redo.addEventListener('click', function(e) {

      e.preventDefault();
                                              formatDoc('redo');
})

var $underline = document.getElementById('underline');

$underline.addEventListener('click', function(e) {

      e.preventDefault();
                                              formatDoc('underline');
});

var boold = document.getElementById('bold');

boold.addEventListener('click', function(e) {

      e.preventDefault();
                                              formatDoc('bold');
})


var italize = document.getElementById('italic');

italize.addEventListener('click', function(e) {

      e.preventDefault();
                                              formatDoc('italic');
})


var $alignLeft = document.getElementById('align-left');

$alignLeft.addEventListener('click', function(e) {

      e.preventDefault();
                                              formatDoc('justifyleft');
});

var $alignRight = document.getElementById('align-right');

$alignRight.addEventListener('click', function(e) {

      e.preventDefault();
                                              formatDoc('justifyright');
});

var $alignCenter = document.getElementById('align-center');

$alignCenter.addEventListener('click', function(e) {

      e.preventDefault();
                                              formatDoc('justifycenter');
});


var $orderList = document.getElementById('list-ol');

$orderList.addEventListener('click', function(e) {

      e.preventDefault();
                                              formatDoc('insertorderedlist');
});


var $unorderedList = document.getElementById('list-ul');

$unorderedList.addEventListener('click', function(e) {

      e.preventDefault();
                                              formatDoc('insertunorderedlist');
});


var $quote = document.getElementById('quote');

$quote.addEventListener('click', function(e) {

      e.preventDefault();
                                              formatDoc('formatblock','blockquote');
});

var $link = document.getElementById('link');

$link.addEventListener('click', function(e) {

      e.preventDefault();
                          var sLnk = prompt('Write the URL here','http:\/\/');
                                                                                if(sLnk && sLnk != '' && sLnk != 'http://') { 
                                                                                                                              formatDoc('createlink' , sLnk)
                                                                                                  }
});


/* Reception and detection if we click on the reserve button in the react + iframe project */

let buttonClicked = false;

function updateStyles() {
  const widgetToggle = document.getElementById('barestho-widget-toggle');
  
  if (window.innerWidth < 450) {
    if (buttonClicked) {
      widgetToggle.style.minHeight = '100vh';
      console.log("oui");
    } else {
      widgetToggle.style.minHeight = '56px';
      console.log("non");
    }
  }
}

window.addEventListener('message', function(event) {
  const iframe = document.getElementById('barestho-widget-toggle');
  if (event.source === iframe.contentWindow) {
    const newButtonClicked = event.data.buttonClicked;
    
    if (newButtonClicked !== undefined && newButtonClicked !== buttonClicked) {
      buttonClicked = newButtonClicked;
      updateStyles();
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  updateStyles();
});



/* Receiving and detecting iframe size and content */

document.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth >= 481) {
    const iframe = document.getElementById('barestho-widget-toggle');
    const iframeSrc = iframe.src;
    const url = new URL(iframeSrc);
    const iframeOrigin = url.origin;

    window.addEventListener('message', function(event) {
      if (event.origin === iframeOrigin) {
        const data = event.data;
        if (data.height) {
          iframe.style.height = data.height + 'px';
        }
      }
    });
  }
});

/* Manage the iframe display alone */

function BaresthoToggleIframe() {
    const iframeContainer = document.getElementById('barestho-widget-popup-container');
    if (iframeContainer.style.display === 'none' || !iframeContainer.style.display) {
        iframeContainer.style.display = 'block';
    } else {
        iframeContainer.style.display = 'none';
    }
}





/*  Réception du bouton de la croix pour fermer le widget en modep popup */

let isButtonClicked;


function adjustStyles() {
  const popupContainer = document.getElementById('barestho-widget-popup-container');
  if (isButtonClicked === false) {
      popupContainer.style.display = 'block';
      isButtonClicked = true;
  } else {
    popupContainer.style.display = 'none';
    isButtonClicked = false;
  }
}

window.addEventListener('message', function(event) {
  const iframe = document.getElementById('barestho-popup-iframe');
  if (event.source === iframe.contentWindow) {
      const newButtonClickedState = event.data.buttonClicked;

      if (newButtonClickedState !== undefined && newButtonClickedState !== isButtonClicked) {
          isButtonClicked = newButtonClickedState;
          adjustStyles();
      }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  adjustStyles();
});
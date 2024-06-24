/* Reception and detection if we click on the reserve button in the react + iframe project */

let isToggleOpen = false;

function updateToggleStyles() {
  const widgetToggle = document.getElementById('barestho-widget-toggle');
  
  if (window.innerWidth < 450) {
    widgetToggle.style.minHeight = isToggleOpen ? '100vh' : '56px';
  }
}

window.addEventListener('message', function(event) {
  const iframe = document.getElementById('barestho-widget-toggle');
  if (event.source === iframe.contentWindow) {
    if (event.data.type === "toggleState") {
      const toggleState = event.data.payload.toggleState;
      
      if (toggleState !== undefined && toggleState !== isToggleOpen) {
        isToggleOpen = toggleState;
        updateToggleStyles();
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  updateToggleStyles();
});

/* Receiving and detecting iframe size and content */

document.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth >= 481) {
    const iframe = document.getElementById('barestho-widget-toggle');
    const iframeSrc = iframe.src;
    const url = new URL(iframeSrc);
    const iframeOrigin = url.origin;

    window.addEventListener('message', function(event) {
      if (event.origin === iframeOrigin && event.data.type === "resize") {
        const data = event.data.payload;
        if (data.height) {
          iframe.style.height = data.height + 'px';
        }
      }
    });
  }
});

/* Manage the iframe display alone */

function baresthoToggleIframe() {
    const iframeContainer = document.getElementById('barestho-widget-popup-container');
    if (iframeContainer.style.display === 'none' || !iframeContainer.style.display) {
        iframeContainer.style.display = 'block';
    } else {
        iframeContainer.style.display = 'none';
    }
}

/* Réception du bouton de la croix pour fermer le widget en mode popup */

let isPopupOpen;

function updatePopUpStyles() {
  const popupContainer = document.getElementById('barestho-widget-popup-container');
  if (isPopupOpen === false) {
      popupContainer.style.display = 'block';
      isPopupOpen = true;
  } else {
    popupContainer.style.display = 'none';
    isPopupOpen = false;
  }
}

window.addEventListener('message', function(event) {
  const iframe = document.getElementById('barestho-popup-iframe');
  if (event.source === iframe.contentWindow) {
    if (event.data.type === "popUpState") {
      const popUpState = event.data.payload.popUpState;

      if (popUpState !== undefined && popUpState !== isPopupOpen) {
          isPopupOpen = popUpState;
          updatePopUpStyles();
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  updatePopUpStyles();
});
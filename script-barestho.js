/* Reception and detection if we click on the reserve button in the react + iframe project */

let isToggleOpen = false;

function updateToggleStyles() {
  const widgetToggle = document.getElementById('barestho-widget-toggle');
  
  if (window.innerWidth < 450) {
    widgetToggle.style.height = isToggleOpen ? '100%' : '56px';
    document.body.style.overflow = isToggleOpen ? 'hidden' : ''; 
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

/* Manage the toggle button function */

function baresthoToggleIframe(id) {
  // Si aucun id n'est spécifié, id vaut '1' par défaut
  if (!id) {
      id = '1';
  }

  // Vérifie s'il existe un conteneur avec l'id complet ou sans le suffixe '-1'
  const iframeContainer = document.getElementById(`barestho-widget-popup-container-${id}`)
      || document.getElementById(`barestho-widget-popup-container`);
  
  if (iframeContainer) {
      if (iframeContainer.style.display === 'none' || !iframeContainer.style.display) {
          iframeContainer.style.display = 'block';
      } else {
          iframeContainer.style.display = 'none';
      }
  } else {
      console.error(`Container with id barestho-widget-popup-container-${id} not found.`);
  }
}


/* Réception du bouton de la croix pour fermer le widget en mode popup */

let isPopupOpen = {};

function updatePopUpStyles(id) {
    // Si id n'est pas défini ou est une chaîne vide, id vaut '1' par défaut
    if (!id) {
        id = '1';
    }

    // Vérifie s'il existe un conteneur avec l'id complet ou sans le suffixe '-1'
    const popupContainer = document.getElementById(`barestho-widget-popup-container-${id}`)
        || document.getElementById('barestho-widget-popup-container');

    if (popupContainer) {
        if (isPopupOpen[id] === false) {
            popupContainer.style.display = 'block';
            isPopupOpen[id] = true;
        } else {
            popupContainer.style.display = 'none';
            isPopupOpen[id] = false;
        }
    } else {
        console.error(`Container with id barestho-widget-popup-container-${id} not found.`);
    }
}


window.addEventListener('message', function(event) {
    const iframes = document.querySelectorAll('.barestho-popup-iframe');
    iframes.forEach(iframe => {
        if (event.source === iframe.contentWindow) {
            const id = iframe.id.split('-').pop();
            if (event.data.type === "toggleState") {
                const toggleState = event.data.payload.toggleState;
                if (toggleState !== undefined && toggleState !== isToggleOpen[id]) {
                    isToggleOpen[id] = toggleState;
                    updateToggleStyles(id);
                }
            } else if (event.data.type === "popUpState") {
                const popUpState = event.data.payload.popUpState;
                if (popUpState !== undefined && popUpState !== isPopupOpen[id]) {
                    isPopupOpen[id] = popUpState;
                    updatePopUpStyles(id);
                }
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const iframes = document.querySelectorAll('.barestho-popup-iframe');
    iframes.forEach(iframe => {
        const id = iframe.id.split('-').pop();
        updateToggleStyles(id);
        updatePopUpStyles(id);
    });
});
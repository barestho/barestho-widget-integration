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


let isPopupOpen = {};

function baresthoToggleIframe(id) {
  if (!id) {
      id = '1';
  }

  const iframeContainer = document.getElementById(`barestho-widget-popup-container-${id}`)
      || document.getElementById('barestho-widget-popup-container');

  if (iframeContainer) {
      if (iframeContainer.style.display === 'none' || !iframeContainer.style.display) {
          iframeContainer.style.display = 'block';
          document.body.style.overflow = 'hidden'; 
      } else {
          iframeContainer.style.display = 'none';
          document.body.style.overflow = ''; 
      }
  } else {
      console.error(`Container with id barestho-widget-popup-container-${id} not found.`);
  }
}



function updatePopUpStyles(id) {
    if (!id) {
        id = '1';
    }
    const popupContainer = document.getElementById(`barestho-widget-popup-container-${id}`)
        || document.getElementById('barestho-widget-popup-container');

    if (popupContainer) {
        if (isPopupOpen[id] === false) {
            popupContainer.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
            isPopupOpen[id] = true;
        } else {
            popupContainer.style.display = 'none';
            document.body.style.overflow = ''; 
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
            } else if (event.data.type === "popup") {
                const popup = event.data.payload.popup;
                if (!popup !== undefined && popup !== isPopupOpen[id]) {
                    isPopupOpen[id] = popup;
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
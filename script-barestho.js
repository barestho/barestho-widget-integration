// Notes

/*
  Widget iframe element must have this id and class name pattern:
    => <iframe class="barestho-widget [mode] [restaurant]"></iframe>
  
  So it can be found with ease, such as this example where we search a widget in popup mode:
    => <iframe class="barestho-widget popup masu"></iframe> result of "iframe.barestho-widget.popup.masu".
*/

// Constants

const WIDGET_ID = "barestho-widget";

const WIDGET_VIEW_MODES = {
  STANDALONE: "standalone",
  INPAGE: "in-page",
  TOGGLE: "toggle",
  POPUP: "popup",
}

// Utils

/**
 * Return the CSS selector of the widget depending on its mode.
 * @param {keyof WIDGET_VIEW_MODES} mode 
 * @returns 
 */
function buildWidgetSelector(mode) {
  return `iframe.${WIDGET_ID}.${WIDGET_VIEW_MODES[mode] ?? WIDGET_VIEW_MODES.STANDALONE}`;
}

/**
 * Return the iframe element of the widget depending on its mode.
 * @param {keyof WIDGET_VIEW_MODES} mode 
 * @returns {NodeListOf<Element>}
 */
function getWidgetElements(mode) {
  return document.querySelectorAll(buildWidgetSelector(mode));
}


// Main

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


window.addEventListener('message', function (event) {
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

function loadToggleMode() {

  const widget = getWidgetElements("TOGGLE");
  const widgetOrigin = new URL(widget.src).origin;

  if (!widget)
    return;

  // Messages handler
  window.addEventListener("message", ({ data, origin, source }) => {

    const { payload, type } = data;
    const isSameOrigin = origin === widgetOrigin;
    const isSameWindow = source === widget.contentWindow;

    switch(type) {
      case "resize": {
        if(payload.height && isSameOrigin && window.innerWidth >= 481)
          widget.style.height = `${payload.height}px`;    
        break;
      }
      case "toggle": {
        if(isSameWindow)
          widget.classList.toggle("open");
        break;
      }
      default:
        break;
    }
  });
}

function loadPopupMode() {
  const iframes = document.querySelectorAll('.barestho-popup-iframe');

  for (const iframe of iframes) {
    const id = iframe.id.split('-').pop();
    updateToggleStyles(id);
    updatePopUpStyles(id);
  }
}

/**
 * Handles iframe messsages.
 * @param {MessageEvent<any>} e 
 * @param {HTMLIFrameElement} widget 
 */
function handleMessage(e, widget) {
  console.log(widget === undefined);
  
}


/*
  Modes:
    - standalone (default): just the reservation app without any mode applied.
    - toggle: a short version of the form with a button that hides and displays it.
    - popup: a short version of the form with logic to display a modal like view. It requires more config.
    - inpage: a short version of the form.
*/


function main() {
  // loadPopupMode();
  // loadToggleMode();

  const widgets = document.querySelectorAll(`.${WIDGET_ID}`);

  for (const widget of widgets) {
    const src = widget.getAttribute("src");

    const srcUrl = new URL(src);

    const widgetMode = srcUrl.searchParams.get("view") ?? WIDGET_VIEW_MODES.STANDALONE;

    widget.classList.add(widgetMode);
  }

  // Message dispatcher
  window.addEventListener("message", e => {
    const { source } = e;

    const foundWidget = [...widgets].find(widget => widget.contentWindow === source);
    
    if(foundWidget !== undefined) {
      handleMessage(e, foundWidget);
    }
  });

}

// main is executed if DOM is fully loaded.
document.addEventListener('DOMContentLoaded', main);
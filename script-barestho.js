// Notes

/*
  Widget iframe element must have this id and class name pattern:
    => <iframe class="barestho-widget [mode]"></iframe>
  
  So it can be found with ease, such as this example where we search a widget in popup mode:
    => <iframe class="barestho-widget popup"></iframe> result of "iframe.barestho-widget.popup".
*/

// Constants

const WIDGET_ID = "barestho-widget";

const WIDGET_VIEW_MODES = {
  STANDALONE: "standalone",
  INPAGE: "in-page",
  TOGGLE: "toggle",
  POPUP: "popup",
}


// Main

function openPopup(id) {
  const widget = document.querySelector(`.${WIDGET_ID}.${WIDGET_VIEW_MODES.POPUP}#${id}`);
  widget?.classList.add("open");
}

/**
 * Handles iframe messsages.
 * @param {MessageEvent<{ type: string, payload: any }>} e 
 * @param {HTMLIFrameElement} widget 
 */
function handleMessage(e, widget) {  
  const { type, payload } = e.data;
  
  switch(type) {
    case "popup": {
      widget.classList.remove("open");
      break;
    }
    case "toggle": {
      const isOpen = payload.state ?? false;
      
      break;
    }
    case "resize": {
      widget.style.height = `${payload.height}px`;
      break;
    }
    default:
      console.warn(`Unknown message type "${type}".`);
      break;
  }

}


/*
  Modes:
    - standalone (default): just the reservation app without any mode applied.
    - toggle: a short version of the form with a button that hides and displays it.
    - popup: a short version of the form with logic to display a modal like view. It requires more config.
    - inpage: a short version of the form.
*/


function main() {

  const widgets = document.querySelectorAll(`.${WIDGET_ID}`);

  for (const widget of widgets) {
    const src = widget.getAttribute("src");

    const srcUrl = new URL(src);

    const widgetMode = srcUrl.searchParams.get("view") ?? WIDGET_VIEW_MODES.STANDALONE;

    widget.classList.add(widgetMode);
  }

  // Message dispatcher
  window.addEventListener("message", e => {

    const foundWidget = Array.from(widgets)
      .find(widget => widget.contentWindow === e.source);

    if(foundWidget)
      handleMessage(e, foundWidget);
  });

}

// main is executed if DOM is fully loaded.
document.addEventListener('DOMContentLoaded', main);
let widgetContainer = document.querySelector("#barestho-widget-container");
let isModal = false;

function toggleMode(mode) {
    if (mode === 'default') {
        widgetContainer.classList.remove('modal');
        widgetContainer.classList.add('default');
    } else if (mode === 'modal') {
        widgetContainer.classList.remove('default');
        widgetContainer.classList.add('modal');
    }
    isModal = !isModal; // Inverse l'état
    widgetContainer.classList.toggle('open', isModal);
    const button = document.querySelector("#barestho-button");
    button.innerHTML = isModal ? "Fermer" : "Réserver";
}

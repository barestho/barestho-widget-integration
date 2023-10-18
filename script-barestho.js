function onBaresthoToggle() {
    const widget = document.querySelector("#barestho-widget-container");
    const button = document.querySelector("#barestho-button");
    widget.classList.toggle('open');
    button.innerHTML = widget.classList.contains('open')? "Fermer": "Réserver";
}


function BaresthoOpenModal() {
    const modalWidgetContainer = document.querySelector("#barestho-widget-container.modal");
    modalWidgetContainer.classList.contains('open')?modalWidgetContainer.classList.remove('open'):modalWidgetContainer.classList.add('open')
}
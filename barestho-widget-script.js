function onToggle() {
    const widget = document.querySelector("#barestho-widget-container");
    const button = document.querySelector("#barestho-button");
    widget.classList.toggle('open');
    button.innerHTML = widget.classList.contains('open')? "Fermer": "Réserver";
}

document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('barestho-widget');
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
});
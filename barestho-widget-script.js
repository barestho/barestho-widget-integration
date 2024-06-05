document.addEventListener('DOMContentLoaded', function() {
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
});

function BaresthoToggleIframe() {
    const iframeContainer = document.getElementById('barestho-widget-popup-container');
    if (iframeContainer.style.display === 'none' || !iframeContainer.style.display) {
        iframeContainer.style.display = 'block';
    } else {
        iframeContainer.style.display = 'none';
    }
}

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

function toggleBaresthoReservation() {
    let baresthowidget = document.querySelector("#barestho-widget")
    baresthowidget.classList.toggle("barestho-closed")
    let baresthobutton = document.querySelector("#barestho-button")
    baresthobutton.innerHTML = baresthowidget.classList.contains("barestho-closed") ? "Réserver" : "Fermer"
}
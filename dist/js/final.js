$(function () {
    $("#footer").load("footer.html");
    $("#modal").load("modals/final-modal.html");
})


$(window).on('load', function () {
    // Text URL: http://localhost:3000/final.html?type=text
    // Asset URL: http://localhost:3000/final.html?type=asset

    let searchParams = new URLSearchParams(window.location.search)
    let type = searchParams.get('type')
    let session = localStorage.getItem('session');

    console.log(type)

    if (session === null) {
        $("#errorMessage").html("You don't have a session with us! Please come near the Team BOND stand or contact our EOD");
        $("#dashboardErrorModal").modal('show');
    } else if (type === 'asset' && JSON.parse(session).contentType == 'TEXT') {
        $("#errorMessage").html("You have scanned the wrong QR code. Please go to Team DNA stand and scan the QR code there! 😊");
        $("#dashboardErrorModal").modal('show');
    } else if (type === 'text' && JSON.parse(session).contentType == 'ASSET') {
        $("#errorMessage").html("You have scanned the wrong QR code. Please go to Team Mirage stand and scan the QR code there! 😊");
        $("#dashboardErrorModal").modal('show');

    }
});

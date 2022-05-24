$(function () {
    $("#login-ftp-modal").load("modals/login-ftp-modal.html");
    $("#footer").load("footer.html");
})

const alert = (message, type) => {
    console.log("working")
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
    $("#alertPlaceholder").html(wrapper)
}

function AutoRefresh(t) {
    setTimeout("location.reload(true);", t);
}

$(document).ready(function () {

    $("#uploadedImage").hide();
    $("#uploadImageText").hide();

    $.ajax({
        type: "GET",
        url: "https://fair-bond.herokuapp.com/api/market/random/text",
        contentType: "application/json",
    }).done(function (data) {
        $("#user-paragraph").html(data.content);
        $("#textUploadedBy").html(data.uploadedBy);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON.errorCode)
        alert(jqXHR.responseJSON.errorText, 'danger')
    })

    $.ajax({
        type: "GET",
        url: "https://fair-bond.herokuapp.com/api/market/random/asset",
        contentType: "application/json",
    }).done(function (data) {
        var image = 'data:image/png;base64,' + data.content;
        $("#uploadedImage").show();
        $("#uploadImageText").show();
        $("#spinner").hide();
        $("#spinnerText").hide();

        $("#uploadedImage").attr("src", image);
        $("#imageUploadedBy").html(data.uploadedBy);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON.errorCode)
        alert(jqXHR.responseJSON.errorText, 'danger')
    })
});
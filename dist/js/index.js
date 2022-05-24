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

$("button").click(function () {
    event.preventDefault();
    // Disable button and activate loader
    $("button").prop("disabled", true);
    $(this).html(
        `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
    );

    let source = $(this).val();
    let name = $('#userName').val()
    let modalSource = 'API';
    $("#ftpImages").hide();
    $("#apiImages").show();

    if (source == "ftp") {
        modalSource = 'FTP Server'
        $("#ftpImages").show();
        $("#apiImages").hide();
    }

    $("#modalUsername").html(name);
    $("#modalSource").html(modalSource);

    $.ajax({
        type: "POST",
        url: "https://fair-bond.herokuapp.com/api/flow/session",
        data: JSON.stringify({name: name, source: source.toUpperCase()}),
        contentType: "application/json",
        encode: true,
    }).done(function (data) {
        $("#ftpModal").modal('show');
        console.log(data);
        // set the item in localStorage
        localStorage.setItem('session', JSON.stringify(data));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON.errorCode)
        alert(jqXHR.responseJSON.errorText, 'danger')
    })
});

function AutoRefresh( t ) {
    setTimeout("location.reload(true);", t);
}

$(document).ready(function () {
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
        $("#uploadedImage").attr("src", image);
        $("#imageUploadedBy").html(data.uploadedBy);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseJSON.errorCode)
        alert(jqXHR.responseJSON.errorText, 'danger')
    })
});
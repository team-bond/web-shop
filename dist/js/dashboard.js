$(function () {
    $("#modal").load("modals/dashboard-modal.html");
    $("#footer").load("footer.html");
})

const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
    $("#alertPlaceholder").html(wrapper)
}

const buttonLoading = (context, isLoading) => {
    if (isLoading) {
        $("button").prop("disabled", true);
        context.html(
            `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="123"></span> Loading...`
        );
    } else {
        $("button").prop("disabled", false);
        context.html(
            `Submit`
        );
    }
}

$("#textSubmitButton").click(function () {
    // Disable button and activate loader
    let buttonContext = $(this);
    buttonLoading(buttonContext, true);

    let session = JSON.parse(localStorage.getItem('session'));
    let sessionToken = session.traceId;
    let insertedTex = $('#textArea').val()

    $.ajax({
        type: "POST",
        url: "https://fair-bond.herokuapp.com/api/flow/content/" + sessionToken + "/text",
        data: JSON.stringify({text: insertedTex}),
        contentType: "application/json",
        encode: true,
    }).done(function (data) {
        localStorage.setItem('session', JSON.stringify(data));
        buttonLoading(buttonContext, false);
        $("#dashboardTextModal").modal('show');
    }).fail(function (jqXHR) {
        buttonLoading(buttonContext, false);
        alert(jqXHR.responseJSON.errorText, 'danger')
    })
})

$("#assetSubmitButtons").click(function () {
    // Disable button and activate loader
    let buttonContext = $(this);
    buttonLoading(buttonContext, true);

    let session = JSON.parse(localStorage.getItem('session'));
    let sessionToken = session.traceId;

    var file = document.getElementById('formFileLg').files[0];

    $.ajax({
        type: "POST",
        url: "https://fair-bond.herokuapp.com/api/flow/content/" + sessionToken + "/asset",
        data: file,
        processData: false
    }).done(function (data) {
        localStorage.setItem('session', JSON.stringify(data));
        buttonLoading(buttonContext, false);
        $("#dashboardAssetModal").modal('show');
    }).fail(function (jqXHR) {
        buttonLoading(buttonContext, false);
        alert(jqXHR.responseJSON.errorText, 'danger')
    })
});

$(window).on('load', function () {
    let session = localStorage.getItem('session');
    if (session === null) {
        $("#dashboardErrorModal").modal('show');
    }
});
document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('closeForm').addEventListener('click', function () {
        document.getElementById('formSection').style.display = 'none';
    });

    document.getElementById('submitButton').addEventListener('click', function () {
        location.reload();
    });

    document.getElementById('getStarted').addEventListener('click', function () {
        document.getElementById('formSection').style.display = 'flex';
        document.getElementById('male').checked = true;
    });
});

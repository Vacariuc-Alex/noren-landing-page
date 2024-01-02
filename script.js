document.addEventListener('DOMContentLoaded', function () {

    const appendNewTableRow = (firstName, lastName, phone, email, password, gender, job) => {
        return "<tr>" +
            ` <td> ${firstName} </td> ` +
            ` <td> ${lastName} </td> ` +
            ` <td> ${phone} </td> ` +
            ` <td> ${email} </td> ` +
            ` <td> ${password} </td> ` +
            ` <td> ${gender} </td> ` +
            ` <td> ${job} </td> ` +
            `</tr>`;
    }

    const toggleElement = (element, display) => {
        document.getElementById(element).style.display = display;
    }

    const checkElement = (element, check) => {
        document.getElementById(element).checked = check;
    }

    const getElement = (element) => {
        return document.getElementById(element).value;
    }

    const getElementValue = (element) => {
        return document.getElementById(element).value;
    }

    const getElementChecked = (element) => {
        return document.getElementById(element).checked;
    }

    document.getElementById('closeForm').addEventListener('click', function () {
        toggleElement('formSection', 'none')
    });

    document.querySelector('.form').addEventListener('submit', function (event) {
        event.preventDefault();
        const setGender = () => {
            return getElementChecked('male') ? 'Male' : 'Female';
        }
        const setJob = () => {
            let job = getElementValue('job');
            if(job === '--') {
                return '';
            }
            return job[0].toUpperCase() + job.slice(1);
        }
        
        document.getElementById('tableSectionBody').innerHTML += appendNewTableRow(
            getElementValue('firstName'),
            getElementValue('lastName'),
            getElementValue('phone'),
            getElementValue('email'),
            getElementValue('password'),
            setGender(),
            setJob()
        );

        toggleElement('formSection', 'none');
        toggleElement('tableSection', 'flex');
    });

    document.getElementById('getStarted').addEventListener('click', function () {
        toggleElement('formSection', 'flex');
        checkElement('male', true)
    });
});

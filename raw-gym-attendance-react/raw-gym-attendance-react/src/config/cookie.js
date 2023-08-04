export const setCookie = (name, value, minutes = 60) => {

    var date = new Date();
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

export const getCookie = (name) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') c = c.substring(1, c.length);

        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
}

export const deleteCookie = (name) => {
    document.cookie = `${name} =; expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=-99999999; path=/;`;
}

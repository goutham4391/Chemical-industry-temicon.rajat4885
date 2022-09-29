"use strict";

/***********************************/

/* COOKIE NOTIFICATION *************/

/***********************************/

/* event binding */
var container = document.querySelector('#cookie-notification');
console.log(container)
if (container) {
    var confirmButtonSelector = '.' + container.getAttribute('data-classbuttonconfirm');
    confirmButtonSelector = confirmButtonSelector.replace(/ /g, '.');
    var confirmButton = document.querySelector('#cookie-notification ' + confirmButtonSelector);
    document.addEventListener('DOMContentLoaded', showCookieNotification(), false);
    confirmButton.addEventListener('click', function (e) {
        e.preventDefault();
        setConfirmationCookie();
    }, false);
    /* --> */

    /* utility */

    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + '=';
        var begin = dc.indexOf('; ' + prefix);

        if (begin === -1) {
            begin = dc.indexOf(prefix);
            if (begin !== 0) return null;
        } else {
            begin += 2;
            var end = document.cookie.indexOf(';', begin);

            if (end === -1) {
                end = dc.length;
            }
        }

        return decodeURI(dc.substr(begin + prefix.length, end));
    }
    /* --> */


    function showCookieNotification() {
        if (!getCookie('cookie-compliance')) {
            container.classList.toggle('show');
        }
    }

    function hideCookieNotification() {
        container.classList.toggle('show');
        container.classList.toggle('hide');
    }

    function setConfirmationCookie() {
        var durationDays = 7;
        var cookieCompliance = [];
        var form = document.getElementById('cookie-consent');

        for (var i = 0; i < form.elements.length; i++) {
            if (form.elements[i].checked) {
                cookieCompliance.push(form.elements[i].value);
            }
        }

        if (typeof window._paq !== 'undefined') {
            window._paq.push(['trackEvent', 'General', 'CookieConsent', 'confirm necessary']);

            if (cookieCompliance.indexOf('3') >= 0) {
                window._paq.push(['trackEvent', 'General', 'CookieConsent', 'confirm marketing']);
            }
        }

        var expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + durationDays * 24 * 60 * 60 * 1000);
        var expires = '; expires=' + expirationDate.toGMTString();
        document.cookie = 'cookie-compliance=' + JSON.stringify(cookieCompliance) + ';path=/;SameSite=strict;' + expires;
        hideCookieNotification();
        location.reload();
    }
}
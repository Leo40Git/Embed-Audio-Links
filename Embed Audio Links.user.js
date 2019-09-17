// ==UserScript==
// @name         Embed Audio Links
// @namespace    https://github.com/Leo40Git/Embed-Audio-Links
// @version      1.0
// @description  Embeds audio download links so they can be played in-browser
// @author       ADudeCalledLeo (Leo40Git)
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function createEmbeds(audext, audtype) {
        console.log(`scanning for ${audext} links...`);

        document.querySelectorAll('a[href$="' + audext + '"]').forEach(function(elem) {
            if (elem == null) {
                return;
            }
            console.log(`got ${audext} link: "${elem.href}"`);

            var btn = document.createElement('button');
            var btntxt = document.createTextNode('▶️');
            btn.appendChild(btntxt);
            btn.active = false;
            btn.style.border = 'none';
            btn.style.backgroundColor = 'transparent';
            btn.style.padding = '0';

            var aud = document.createElement('audio');
            aud.preload = 'none';
            aud.src = elem.href;
            aud.type = audtype;
            aud.controls = false;

            btn.onclick = function () {
                btn.active = !btn.active;
                if (btn.active) {
                    aud.play();
                    btntxt.nodeValue = '⏹️';
                } else {
                    aud.load();
                    btntxt.nodeValue = '▶️';
                }
            }

            aud.onended = function() {
                btn.click();
            }

            var div = document.createElement('div');
            div.appendChild(btn);
            div.appendChild(aud);
            div.style.display = 'inline-block';
            div.classList.add('acdl-embedaudio-control');

            elem.parentNode.insertBefore(div, elem.nextSibling);
        });
    }

    // remove old controls
    document.querySelectorAll('div.adcl-embedaudio-control').forEach(function(elem) {
        elem.parentElement.removeChild(elem);
    });

    createEmbeds('.wav', 'audio/wav');
    createEmbeds('.ogg', 'audio/ogg');
    createEmbeds('.mp3', 'audio/mpeg');

})();

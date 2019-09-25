// ==UserScript==
// @name         Embed Audio Links
// @namespace    https://github.com/Leo40Git/Embed-Audio-Links
// @version      1.2.0
// @description  Embeds audio download links so they can be played in-browser
// @license      MIT
// @author       ADudeCalledLeo (Leo40Git)
// @match        *://*/*
// @grant        none
// @updateURL    https://github.com/Leo40Git/Embed-Audio-Links/raw/master/Embed%20Audio%20Links.user.js
// @downloadURL  https://github.com/Leo40Git/Embed-Audio-Links/raw/master/Embed%20Audio%20Links.user.js
// ==/UserScript==

(function() {
    'use strict';

    const audio = document.createElement('audio');

    function print(msg) {
        console.log(`%c[Embed Audio Links] %c${msg}`, 'color: SteelBlue; font-weight: bold', '');
    }

    function warn(msg) {
        console.warn(`%c[Embed Audio Links] %c${msg}`, 'color: SteelBlue; font-weight: bold', '');
    }

    function createEmbeds(audext, audtype) {
        var audsup = audio.canPlayType(audtype);

        if (audsup === '') {
            warn(`%cwas going to scan for ${audext} (${audtype}) links, but ${audtype} is not supported here (audio.canPlayType('${audtype}') returned '')`);
            return;
        }

        print(`scanning for ${audext} (${audtype}) links... (audio.canPlayType('${audtype}') returned '${audsup}')`);

        document.querySelectorAll('a[href$="' + audext + '"]').forEach(function(elem) {
            if (elem == null) {
                return;
            }

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

    createEmbeds('.wav', 'audio/wave');
    createEmbeds('.ogg', 'audio/ogg');
    createEmbeds('.mp3', 'audio/mpeg');
    createEmbeds('.mp4', 'audio/mp4');
    createEmbeds('.flac', 'audio/flac');

})();

/**
 * @name HideMessage
 * @author Ambralin
 * @authorLink https://github.com/ambralin
 * @description Hides messages locally
 * @version 1.0.0
*/

running = false;

module.exports = class HideMessages {
    start() {
        // Attach a single event listener to the parent container for hover events
        document.addEventListener('mouseover', function(event) {
            var target = event.target;

            // Check if the hovered element is a message element or a descendant of a message element
            while (target !== this) {
                if (target.classList.contains('message_ccca67')) {
                    try {
                        var messagecon = target;
                        var parentContainer = target.lastChild.firstChild.firstChild;
                        if (!parentContainer.classList.contains("buttonsInner_a9dfff")) return;
                        if (parentContainer.querySelector('div[aria-label="HideMSG"]')) return;
                        addButton(parentContainer, messagecon);
                    } catch (e) {
                        console.log(e);
                    }
                }
                target = target.parentNode;
            }
        });
    }
    stop() {}
}

function addButton(con, mcon) {
    // Create a new button element
    var button = document.createElement('div');
    button.ariaLabel = "HideMSG";
    button.textContent = 'hide';
    button.style.color = 'var(--interactive-normal);';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.padding = '4px';
    button.style.cursor = 'pointer';

    // Add a click event listener to the button
    button.addEventListener('click', function() {
        mcon.firstChild.lastChild.style.display = "none";
        var hiddenmsg = document.createElement('div');
        var text = document.createElement('span');
        text.innerHTML = "Message hidden for you ";
        text.style.color = 'var(--textbrighter);';
        var reveal = document.createElement('button');
        reveal.textContent = 'show message';
        reveal.style.border = 'none';
        reveal.style.borderRadius = '4px';
        reveal.style.padding = '4px';
        reveal.style.cursor = 'pointer';
        reveal.style.backgroundColor = 'var(--button-warning-background);';
        reveal.addEventListener('click', function() {
            mcon.firstChild.lastChild.remove();
            mcon.firstChild.lastChild.style.display = "block";
            mcon.children[1].style.display = "block";
        });

        hiddenmsg.appendChild(text);
        hiddenmsg.appendChild(reveal);

        mcon.firstChild.appendChild(hiddenmsg);

        mcon.children[1].style.display = "none";
    });

    // Add the button to the Discord interface
    con.insertBefore(button, con.firstChild);
}
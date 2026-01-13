/**
 * @name HideMessage
 * @author Ambralin
 * @authorLink https://github.com/ambralin
 * @description Hides messages locally
 * @version 1.2.0
*/

running = false;

module.exports = class HideMessages {
    start() {
        // Attach a single event listener to the parent container for hover events
        document.addEventListener('mouseover', function(event) {
            var target = event.target;

            // Check if the hovered element is a message element or a descendant of a message element
            while (target !== this) {
                if (target.classList.contains('_5126c0cd07f243a0-messageListItem')) {
                    try {
                        var messagecon = target;
                        if (!target.firstChild) return;
                        if (!target.firstChild.lastChild.firstChild) return;
                        if (target.firstChild.lastChild.classList.contains("hiddenMsg")) return;
                        var parentContainer = target.firstChild.lastChild.firstChild.firstChild;
                        if (!parentContainer.classList.contains("_5126c0cd07f243a0-buttonsInner")) return;
                        if (parentContainer.firstChild.classList.contains("hideButton")) return;
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
    var span = document.createElement('span');
    span.className = "hideButton";

    var div = document.createElement('div');
    div.className = 'f84418acfdbdfe54-hoverBarButton f7ecaca5c80dbf3a-button';
    div.setAttribute('aria-label', 'More');
    div.setAttribute('aria-expanded', 'false');
    div.setAttribute('role', 'button');
    div.setAttribute('tabindex', '0');

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 52 52');
    svg.setAttribute('xml:space', 'preserve');

    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
    'd',
    'M51.8 25.1c-1.6-3.2-3.7-6.1-6.3-8.4L37 25.1v.9c0 6.1-4.9 11-11 11h-.9l-5.4 5.4c2 .4 4.1.7 6.2.7 11.3 0 21.1-6.6 25.8-16.1.4-.7.4-1.3.1-1.9M48.5 5.6l-2.1-2.1c-.6-.6-1.7-.5-2.4.3l-7.3 7.3C33.4 9.7 29.8 9 26 9 14.7 9 4.9 15.6.2 25.1c-.3.6-.3 1.3 0 1.8 2.2 4.5 5.5 8.2 9.6 11l-6 6.1c-.7.7-.8 1.8-.3 2.4l2.1 2.1c.6.6 1.7.5 2.4-.3L48.2 8c.8-.7.9-1.8.3-2.4M15 26c0-6.1 4.9-11 11-11 2 0 3.8.5 5.4 1.4l-3 3c-.8-.2-1.6-.4-2.4-.4-3.9 0-7 3.1-7 7 0 .8.2 1.6.4 2.4l-3 3C15.5 29.8 15 28 15 26'
    );
    path.setAttribute('fill', 'currentColor');

    svg.appendChild(path);
    div.appendChild(svg);
    span.appendChild(div);


    // Add a click event listener to the button
    span.addEventListener('click', function() {
        if (mcon.firstChild.lastChild.classList.contains("hiddenMsg")) return;

        mcon.firstChild.firstChild.lastChild.style.display = "none";
        mcon.firstChild.children[1].style.display = "none";
        var hiddenmsg = document.createElement('div');
        hiddenmsg.classList = "hiddenMsg";
        var text = document.createElement('span');
        text.innerHTML = "Message hidden for you ";
        text.classList = "_752971923a1e6683-markup";
        var reveal = document.createElement('button');
        reveal.textContent = 'show message';
        reveal.style.border = 'none';
        reveal.style.borderRadius = '4px';
        reveal.style.padding = '4px';
        reveal.style.cursor = 'pointer';
        reveal.style.setProperty(
            '--background-base-lowest',
            getComputedStyle(mcon).getPropertyValue('--background-base-lowest')
        );
        reveal.style.backgroundColor = 'var(--background-base-lowest)';

        reveal.classList = "_752971923a1e6683-markup";
        reveal.addEventListener('click', function() {
            mcon.firstChild.lastChild.remove();
            mcon.firstChild.firstChild.lastChild.style.display = "block";
            mcon.firstChild.children[1].style.display = "block";
        });

        hiddenmsg.appendChild(text);
        hiddenmsg.appendChild(reveal);

        mcon.firstChild.appendChild(hiddenmsg);
    });

    // Add the button to the Discord interface
    con.insertBefore(span, con.firstChild);
}

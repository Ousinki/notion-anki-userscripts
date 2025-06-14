// ==UserScript==
// @name         Notion Toggle Hovered Item with Cmd+E
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Hover over a toggle list and press Cmd+E or Ctrl+E to expand/collapse only that specific item.
// @author       Your Assistant
// @match        https://www.notion.so/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // This variable will store the toggle list element that the mouse is currently hovering over.
    let currentlyHoveredToggle = null;

    // --- Mouse Tracking ---

    // When the mouse moves over any element...
    document.addEventListener('mouseover', function (e) {
        // Find the closest parent element that is a toggle list.
        // This covers both standard toggles and toggle headings.
        const targetToggle = e.target.closest(
            'details, div.notion-toggle-block[style*="width: 100%"]'
        );
        // "Remember" this element.
        currentlyHoveredToggle = targetToggle;
    });

    // When the mouse leaves an element...
    document.addEventListener('mouseout', function (e) {
        // "Forget" the element. This prevents accidental toggling after the mouse has moved away.
        currentlyHoveredToggle = null;
    });


    // --- Keyboard Shortcut Handling ---

    document.addEventListener('keydown', function (e) {
        // Check for Cmd+E on Mac or Ctrl+E on Windows/Linux
        const isModKeyPressed = e.metaKey || e.ctrlKey;
        if (isModKeyPressed && e.key.toLowerCase() === 'e') {
            // Important: Only act if the mouse is currently over a toggle.
            if (currentlyHoveredToggle) {
                // Prevent the browser's default action (like search).
                e.preventDefault();
                e.stopPropagation();

                // Find the clickable part of the remembered toggle.
                const clickTarget = currentlyHoveredToggle.querySelector('div[role="button"]') || currentlyHoveredToggle.querySelector('summary');

                if (clickTarget) {
                    // Simulate a click on that specific target.
                    clickTarget.click();
                }
            }
        }
    });
})();
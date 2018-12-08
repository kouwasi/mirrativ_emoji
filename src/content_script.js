const target = document.getElementById('app');
const emojiPicker = new EmojiPicker(
    { 
        emojiable_selector: '[data-emojiable=true]', 
        assetsPath: `chrome-extension://${chrome.runtime.id}/lib/emoji-picker/img/`, 
        popupButtonClasses: 'far fa-smile' 
    }
);

const observer = new MutationObserver((_mutations) => {
    if($('input').length) {
        const inputElement = $('input');

        inputElement.attr('data-emojiable', true);
        inputElement.attr('data-emoji-input', 'unicode');

        $('input').replaceWith(`<p class="emoji-picker-container">${inputElement.prop('outerHTML')}</p>`);

        emojiPicker.discover();
        observer.disconnect();
    }
});

observer.observe(target, {childList: true, subtree: true});
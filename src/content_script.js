const target = document.getElementById('app');

setInterval(watchCommentElement, 1000);

function watchCommentElement() {
    const input = $('input');

    if(input.length == 1 && input[0].baseURI.match("https:\/\/www.mirrativ.com\/live\/.*")) {
        emojiable();
    }
}

function emojiable() {
    const inputElement = $('input').emojioneArea({ pickerPosition: "bottom", autocomplete: false});

    $('.emojionearea-editor').keydown(function(event) {
        if(event.which == 13 && inputElement[0].emojioneArea.getText()) postComment(inputElement);
    });
}

function postComment(inputElement) {
    const liveId = parseLiveId();
    const csrfToken = $('meta').filter('[name=csrf-token]')[0].content;
    const comment = inputElement[0].emojioneArea.getText();
    
    // コメント空に
    inputElement[0].emojioneArea.setText("");

    $.ajax({
        url: 'https://www.mirrativ.com/api/live/live_comment',
        accepts: {
            json: "application/json"
        },
        dataType: 'json',
        type: 'POST',
        headers: {
            'x-csrf-token': csrfToken
        },
        data: {
            live_id: liveId, 
            type: 1,
            comment: comment
        }

        // TODO: successでレスポンスが成功か確認する
    }).fail(function(xhr, status, error) {
        alert(`
            コメントの投稿に失敗しました。

            XMLHttpRequest: ${xhr.status}
            textStatus: ${status}
            errorThrown: ${error}
            
            by Mirrativ Emoji
            
            非公式ツールのため公式に問い合わせは行わないでください。
        `);
    })
}

function parseLiveId() {
    const splitedURL = location.href.split("/");
    return splitedURL[splitedURL.length - 1]
}
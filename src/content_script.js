const target = document.getElementById('app');

const observer = new MutationObserver((_mutations) => {
    if($('input').length) {
        const inputElement = $('input').emojioneArea({ pickerPosition: "bottom", autocomplete: false});

        $('.emojionearea-editor').keydown(function(event) {
            if(event.which == 13 && inputElement[0].emojioneArea.getText()) postComment(inputElement);
        });

        observer.disconnect();
    }
});

observer.observe(target, {childList: true, subtree: true});

function postComment(inputElement) {
    const liveId = parseLiveId();
    const csrfToken = $('meta').filter('[name=csrf-token]')[0].content;
    
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
            comment: inputElement[0].emojioneArea.getText()
        }
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

$.ajax({
    url: 'https://www.mirrativ.com/api/live/live_commen',
    accepts: {
        json: "application/json"
    },
    dataType: 'json',
    type: 'POST',
    headers: {
        'x-csrf-token': "wb_jQF4HlUw5g4YKGY2nY_MMQ2BI8ermim7wIkpH"
    },
    data: {
        live_id: "mWrvkOl0aExKuJKDqzAt7w", 
        type: 1,
        comment: "てすと"
    }
}).fail(function(xhr, status, error) {
    console.log(xhr)
    console.log(status)
    console.log(error)
})
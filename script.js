const apiKey = "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";

function sendMessage(){
    let message = document.getElementById('message-input');
    if(!message.value){
        message.style.border = '1px solid red';
        return;
    }

    message.style.border = 'none';

    let status = document.getElementById('status');
    let btnSubmit = document.getElementById('btn-submit');

    status.style.display = 'block'
    status.innerHTML = 'Carregando...'
    btnSubmit.disabled = true;
    btnSubmit.style.cursor = 'not-allowed';
    message.disabled = true;

    postMessage();

}

function postMessage(){
    let message = document.getElementById('message-input');
    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: message.value,
            max_tokens: 2048,
            temperature: 0.5
        })
    }).then((response) => response.json())
    .then((response) => {
        console.log(response.choices[0]['text']);
        let r = response.choices[0]['text'];
        let status = document.getElementById('status');
        status.style.display = 'none';
        showHistoric(message.value, r);

        
    })
    .catch((e) => {
        console.log('Error ->', e);
    })
    .finally(() => {
        let btnSubmit = document.getElementById('btn-submit');
    
        btnSubmit.disabled = false;
        btnSubmit.style.cursor = 'pointer';
        message.disabled = false;
        message.value = '';
    })
}

function showHistoric(message, response){
    let historic = document.getElementById('historic');

    let boxMyMessage = document.createElement('div');
    boxMyMessage.className = 'box-my-message';

    let myMessage = document.createElement('p');
    myMessage.className  = 'my-message';
    myMessage.innerHTML = message;
    

    boxMyMessage.appendChild(myMessage);
    historic.appendChild(boxMyMessage);
    
    let boxResponseMessage = document.createElement('div');
    boxResponseMessage.className = 'box-response-message';

    let responseMessage = document.createElement('p');
    responseMessage.className  = 'response-message';
    responseMessage.innerHTML = response;

    boxResponseMessage.appendChild(responseMessage);
    historic.appendChild(boxResponseMessage);

    historic.scrollTop = historic.scrollHeight;
}
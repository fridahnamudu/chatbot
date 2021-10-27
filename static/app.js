class Chatbox {
    constructor(){
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }
//        not to display the chatbox
        this.state = false
//        array to display the msgs
        this.messages = [];
    }
//code to display the message
    display() {
    const { openButton, chatBox, sendButton} = this.args;

    openButton.addEventListener( 'click', () => this.toggleState(chatBox))

    sendButton.addEventListener( 'click', () => this.SendButton(chatBox))

    const node = chatBox.querySelector('input');
    node.addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            this.onSendButton(chatBox)
        }
    })
    }

    toggleState(chatBox) {
        this.state = !this.state;

        //show or hides the box
        if(this.state) {
            chatBox.classList.add('chatbox--active')
         } else {
            chatBoxox.classList.remove('chatbox--active')
         }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if(text1 === "") {
            return;
    }
//object pushing to msgs array
    let msg1 = { name: "User", message:text1}
    this.messages.push(msg1);


    fetch($SCRIPT_ROOT + '/predict', {
    method: 'POST',
    body: JSON.stringify( { message: text1}),
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    })
//    response after sending the post
//want to send the message back to the user and display it
    .then(r => r.json())
    .then(r => {
        let msg2 = { name: "Frida", message: r.answer};
        this.messages.push(msg2);
        this.updateChatText(chatbox)
        textField.value = ''
//catching an error and showing nothing
    }).catch((error) => {
        console.error('Error:', error);
        this.updateChatText(chatbox)
        textField.value = ''
    });


    }
//    go over all the messages and modify the inner html code by checking if its user or chatbox
    updateChatText(chatbox){
        var html='';
        this.messages.slice().reverse().forEach(function(item, number){
            if(item.name === "Frida")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'

            }
            else
            {
                html += '<div class="messages__item messages__item--operator>' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;

        }



}
//calling the display function
const chatbox = new Chatbox();
chatbox.display();
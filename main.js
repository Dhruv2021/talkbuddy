var firebaseConfig = {
    apiKey: "AIzaSyAlaSWPjiXlmexLjVqUC8p7-eVqHk607N8",
    authDomain: "test-60414.firebaseapp.com",
    databaseURL: "https://test-60414-default-rtdb.firebaseio.com",
    projectId: "test-60414",
    storageBucket: "test-60414.appspot.com",
    messagingSenderId: "62436604567",
    appId: "1:62436604567:web:18b121cd1e9f6ab1b047d2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var chatbox = document.getElementById('chatbox');
var message = document.getElementById('message');
var senderId = prompt("Enter your ID");
var receiverId = prompt("Enter receiver ID");
var chatId = getChatId(senderId, receiverId);
var chatRef = database.ref('chats/' + chatId);

function sendMessage() {
	var messageText = message.value;
	if (messageText.trim() != '') {
		var newMessageRef = chatRef.push();
		newMessageRef.set({
			sender: senderId,
			message: messageText,
			timestamp: Date.now()
		});
		message.value = '';
	}
}

chatRef.on('child_added', function(data) {	
	var messageData = data.val();
	var chatMessage = document.createElement('p');
	if (messageData.sender == senderId) {
		chatMessage.className = 'sent';
		chatMessage.innerText = "You" + ': ' + messageData.message;
	} else {
		chatMessage.className = 'received';
		chatMessage.innerText = receiverId + ': ' + messageData.message;
	}
	chatbox.appendChild(chatMessage);
    chatbox.scrollTop = chatbox.scrollHeight; 
});


function getChatId(id1, id2) {
	if (id1 < id2) {
		return id1 + id2;
	} else {
		return id2 + id1;
	}
}

var messageInput = document.getElementById('message');
var sendButton = document.getElementById('btn');

messageInput.addEventListener('keydown', function(event) {
	if (event.keyCode === 13) { // Enter key
		event.preventDefault();
		sendButton.click();
	}
});
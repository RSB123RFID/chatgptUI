// JavaScript Document
// chatgptUI.js by RSB123. 

//MIT License

//Copyright (c) [2024] [MR J Bull / TA RSB123]

//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE. 





//define on load defaults
	let myModelVariable = "gpt-3.5-turbo-1106";
	let myModelName = "Arthur";
	let myModelCustomisation = "";
	changeModel(); //call change model to push it through
	
	
	//settings section functions
	
	function downloadChatHistory() {
    // Create an object that includes the model details and the chat history
    const chatData = {
        model: {
            name: myModelName,
            variable: myModelVariable
        },
        history: chatMemory.filter(message => message.role !== "system") // Optionally filter out system messages
    };

    const chatDataStr = JSON.stringify(chatData, null, 4); // Prettify the JSON data
    const blob = new Blob([chatDataStr], { type: 'application/json' });

    // Generate a timestamp for the filename
    const date = new Date();
    const timestamp = date.toISOString().replace(/[:.]/g, '-'); // Format: YYYY-MM-DDTHH-mm-ss
    const filename = `chat-history-${timestamp}.json`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

	
async function loadChatFromFile() {
    const input = document.getElementById('fileInput');
    if (!input.files.length) {
        alert('Please select a file.');
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        try {
            const chatData = JSON.parse(content);

            // Validate the chatData if necessary
            if (chatData.model && chatData.history) {
                // Update the model variables
                myModelName = chatData.model.name;
                myModelVariable = chatData.model.variable;

				console.log("Loaded Model Name:", myModelName); // Debug
            console.log("Loaded Model Variable:", myModelVariable); // Debug
                // Update the bot image based on the loaded model
                updateBotImage(myModelName, myModelVariable);

                // Clear the current chat and load the history
                clearChatMemory();
                chatData.history.forEach(item => {
                    showMessage(item.role === 'user' ? 'Guest' : myModelName, item.content);
                });

                // Update the chatMemory with the loaded history
                chatMemory = chatData.history;
            } else {
                throw new Error('Invalid chat data format.');
            }
        } catch (error) {
            alert('Error loading file: ' + error.message);
        }
    };

    reader.readAsText(file);
}	
	
	
	

	function updateBotImage(modelName, modelVersion) {
    const botImage = document.getElementById('botImage');
    if (modelName === "Nora") {
        if (modelVersion === "gpt-4-1106-preview") {
            botImage.src = 'norabot4.png'; // Image for Nora GPT-4
        } else {
            botImage.src = 'norabot.png'; // Image for Nora GPT-3.5
        }
    } else { // Default to Arthur
        if (modelVersion === "gpt-4-1106-preview") {
            botImage.src = 'arthurbot4.png'; // Image for Arthur GPT-4
        } else {
            botImage.src = 'arthurbot.png'; // Image for Arthur GPT-3.5
        }
    }
}
	
	function changeModel(){
	if (myModelName == "Nora"){
		myModelCustomisation = "Example prompt:  Your name is Nora, you are a helpful chatbot interested in Motorcycles.";
		//console.log("Saved: ", myModelCustomisation);
		}
		else {
		myModelCustomisation = "Example prompt: Your name is Arthur you are a useful bot interested in helping people on their mechanical engineering and CAD design questions.";
		//	console.log("Saved: ", myModelCustomisation);
		}
	}
		
	
	  // JavaScript to handle modal open/close of settings box
    function openSettings() {
        document.getElementById('settingsModal').style.display = 'block';
	//	 document.getElementById('chat_settings_modal_content').style.display = 'block';
    }

    function closeSettings() {
        document.getElementById('settingsModal').style.display = 'none';
		// document.getElementById('chat_settings_modal_content').style.display = 'none';
    }

    async function saveSettings() {
       
		 // Get the selected model from the form
    const selectedModel = document.getElementById('model_setting').value;
		// get the model gender
		myModelName = document.getElementById('gender_setting').value;

    // Assign selected model to myModelVariable
     myModelVariable = selectedModel;
		
		console.log("Saved: ", myModelVariable);
		 console.log("Saved: ", myModelName);
		changeModel();
		   updateBotImage(myModelName, myModelVariable); 
		// Clear existing chat memory and set the new introduction message
    clearChatMemory();
    chatMemory.push({ role: "system", content: myModelCustomisation });

		 closeSettings();
		
		//Note: if you want to save to a db, uncomment the below and use a helper php page called save_settings.php to save to the db
		// Collect data from form
    //    const formData = new FormData(document.getElementById('settingsForm'));

		// Add the model setting to the formData if you want to send it to the server
    //formData.append('model', myModelVariable);
		
        // Send data to a PHP script to save to the database
     //   const response = await fetch('save_settings.php', {
      //      method: 'POST',
    //       body: formData
    //    });

     //   if (response.ok) {
            // Handle successful save
           
    //    } else {
   //         // Handle errors
     //       console.error('Error saving settings');
     //   }
    }

	

////////////////////Some simple UI tidy up code///////////////////////////////////	
	
	function disableTextArea() {
    const inputElement = document.getElementById('user-input');
    inputElement.disabled = true; // Disable the textarea
}

function clearAndEnableTextArea() {
    const inputElement = document.getElementById('user-input');
    inputElement.value = ''; // Clear the content of the textarea
    inputElement.disabled = false; // Enable the textarea
	inputElement.placeholder = '';
}

	
	
////////////////////Chatgpt code///////////////////////////////////
// Define the model variable
	
	
	function createMemory(messages) {
const memory = [];
for (const msg of messages) {
memory.push({ role: msg.role, content: msg.content });
}
return memory;
}
	chatMemory = createMemory([
    {
      role: "system",
      content: myModelCustomisation
    }	
		
  ]);
	
	
	function verifyEnter(event) {
     // Check if the Enter key is pressed
     if (event.keyCode === 13) {
       event.preventDefault(); 
       // call the sendMessage function
       sendMessage();
     }
   }
	
	
	function clearChatMemory() {
     chatMemory = [];
    // Optionally, you might want to clear the chat display as well
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = '';
}
	
	
	
	async function sendMessage() {
   disableTextArea();
		const inputElement = document.getElementById('user-input');
    const userInput = inputElement.value.trim();

  // Check if the username is set in the session and is not empty, or just make the user a Guest
var username =  'Guest';

if (userInput !== '') {
    showMessage(username, userInput);
    chatMemory = await getResponse(userInput, chatMemory);
    inputElement.value = '';
	
	}
}
	
	
	function showMessage(sender, message) {
            const chatContainer = document.getElementById('chat-container');
            const chatSection = document.querySelector('.chathistory');
		const typingIndicator = document.getElementById('typing-indicator');
		
		// Remove the spinner (typing indicator) when displaying the message
		if (typingIndicator) {
        chatContainer.removeChild(typingIndicator);
    }
		
		
            // Create a new message element
            const messageElement = document.createElement('div');
         //   messageElement.innerText = `${sender}: ${message}`;
messageElement.innerHTML = `<i class="fas fa-user-circle"></i><strong>${sender}</strong>: ${message}`;
            // attributes the correct styling class according to the message source
            if (sender === 'Guest') {
                messageElement.classList.add('user-message');
				messageElement.innerHTML = `<i class="fas fa-user-circle"></i> <strong>${sender}</strong>: ${message}`;
            } else if (sender === 'Arthur' || sender === 'Nora') {
				messageElement.innerHTML = `<i class="fa-solid fa-robot"></i> <strong>${sender}</strong>: ${message}`;
                messageElement.classList.add('ai-message');

                // Adds a function to copy the answer
                const copyLink = document.createElement('button');
                copyLink.innerText = 'Copy to clipboard';
                copyLink.style.float = 'right';
                copyLink.addEventListener('click', function (event) {
                    event.preventDefault();
                    const text = message;
                    const input = document.createElement('input');
                    input.value = text;
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand('copy');
                    document.body.removeChild(input);
                });

                messageElement.appendChild(copyLink);
            }
	
	//ended here

    //appends the message and makes sure to scroll to bottom
    chatContainer.appendChild(messageElement);
    chatSection.scrollTop = chatSection.scrollHeight;
}
	
async function getResponse(userInput, chatMemory = []) {
    const chatContainer = document.getElementById('chat-container');
   
	//create new div for spinner
	const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.classList.add('spinner');
    chatContainer.appendChild(typingIndicator);

    try {
        // Send the request to your PHP script instead of OpenAI API
        const response = await fetch('chatgptUI_proxy.php', { // Change this path to your PHP script's URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               "model": myModelVariable, // Use the variable here
                "messages": [
                    ...chatMemory,
                    {"role": "user", "content": userInput}
                ]
            })
        });
		 console.log("Raw Response: ", response); // Debug log

        if (!response.ok) {
            throw new Error('An error occurred in the request');
        }

        const data = await response.json();
		console.log("Parsed Data: ", data); // Debug log
        if (!data.choices || !data.choices.length || !data.choices[0].message || !data.choices[0].message.content) {
            throw new Error('Invalid response from server');
        }

        const Response = data.choices[0].message.content.trim();
        var cleanResponse = Response.replace(/(```html|```css|```javascript|```php|```python)(.*?)/gs, '$2');
        cleanResponse = cleanResponse.replace(/```/g, "");
        showMessage(myModelName, cleanResponse);
		clearAndEnableTextArea();
		console.log("Model: ", myModelVariable); // Debug log

        // Update the context memory array
        chatMemory.push({ role: 'user', content: userInput });
        chatMemory.push({ role: 'assistant', content: cleanResponse });

        // Return the updated context memory
        return chatMemory;
    } catch (error) {
        console.error(error);
        // Error management code as necessary
    }
}
	
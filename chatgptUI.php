<!--// chatgptUI.php by RSB123. 

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
//SOFTWARE. -->

<link rel="stylesheet" href="chatgptUI.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="chatgptUI.js"></script>
<div class='chatGPTUI_container'>
	
	
<!-- Settings Button -->
<button class="btn" onclick="openSettings()"><i class="fa-solid fa-gear"></i> Settings</button>

<!-- Settings Popup Modal -->
<div id="settingsModal" class="chat_settings_modal">
    <!-- Modal content -->
    <div class="chat_settings_modal_content">
        <span class="chat_settings_close" onclick="closeSettings()">&times;</span>
        <form id="settingsForm">
            <label for="gender_setting">Choose your AI:</label>
            <select id="gender_setting" name="gender_setting">
            <option value="Arthur">Arthur</option>
        <option value="Nora">Nora</option>
            </select>
            <!-- Repeat for other settings --><BR>
			<label for="model_setting">AI Model:</label>
            <select id="model_setting" name="model_setting">
			<option value="gpt-3.5-turbo-1106">GPT3.5 Turbo (16k)</option>
            <option value="gpt-4-1106-preview">GPT4.5 Turbo (128k)</option>
        <!--<option value="gpt-4-vision-preview">GPT4.5 Turbo with Vision (128k)</option>-->
		<!--<option value="dall-e-3">Dall-E-3 Image Model</option> -->
            </select>
			<BR>
            
        </form><button class="btn" onclick="saveSettings()"><i class="fa-regular fa-floppy-disk"></i> Save</button>
    </div>
</div>
	
<P align="center"><img src='arthurbot.png' id="botImage" class="bot_img"></P>
	<nav>
         <div>
         
      </div>
   </nav>
  

<section class="chathistory">
   <div id="chat-container"></div>
</section><BR><BR>
	 <section class="userinput">        
      <!-- classic style of chat input area
	   <textarea id="user-input" class="user-input" placeholder="Don't be stranger! Say hello! I don't byte, well I do a bit! Go on, type something in here and tap that send button!" onkeydown="verifyEnter(event)"></textarea>

      <button class="btn" onclick="sendMessage()">Send</button>
		 <button class="btn" onclick="clearAndEnableTextArea()">Clear</button>-->
		 
			
			 
			 <!--modern style of chat input area  -->
			 <div class="chat-type-container">
  <input type="text" id="user-input" onkeydown="verifyEnter(event)" placeholder="Message our AI bot..." />
  <button type="submit" class="send-button" onclick="sendMessage()">
    <svg viewBox="0 0 24 24" class="send-icon">
      <!-- Icon path here -->
      <path d="M2.01,21L23,12L2.01,3L2,10l15,2l-15,2L2.01,21z"></path>
    </svg>
  </button>
</div>
	<!-- end of new -->		 
			<BR><BR><BR>
			 </section> 
			 
			 <div id="save-load-chat-Section" class="save-load-chat-Section">
		 <button class="btn" onclick="downloadChatHistory()"><i class="fa-regular fa-floppy-disk"></i> Save Chat</button>
		
		 <button class="btn" onclick="loadChatFromFile()"><i class="fa-solid fa-upload"></i> Load Chat</button>
		 <input class="btn" type="file" id="fileInput" accept=".json">
			 </div>
  
</div>
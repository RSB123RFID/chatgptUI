# chatgptUI
Simple PHP, Vanilla Javascript & CSS WebUI for ChatGPT

What can it do?
Provides a simple UI for hosting an OpenAI GPT chatbot session on your own website. Supports customisation of the initial prompts for behaviour, name and usage etc.. For example so the model will respond as "yoursite.com". 

It has full support for GPT 3.5 Turbo and GPT 4.5 Turbo (128k) models. At the moment it does not support image generation from Dall-E 3, or GPT vision, however, I will add this functionality in due course. 

There's a nice and simple settings modal box to configure your GPT model. 

I've also provided a simple JSON approach to saving and loading chat history, it saves a JSON file to your local PC, then you just upload the chat when you want to resume the conversation thread. In future version I'll add saving this to a mySQL, but as it happens I kind of like the JSON local chat save feature - I find it useful having an offline copy of all my AI chats. 

Installation steps:
1. Add your OpenAI API key in chatgptUI_proxy.php.
2. Copy files over to your php web server.
3. Load chatgptUI.php in your browser, enjoy!

Notes:
For several reasons you will probably want to put this all behind a user login php function, and check that an authorised user has logged in before allowing them to use chatGPTUI. Otherwise your tokens might end up getting spent real quick once someone figures out you've left it open! Ha! 



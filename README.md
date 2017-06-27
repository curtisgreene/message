# Message

Message is a blogging platform designed in the spirit of Medium.com. My goal was to create an easy to use and visually pleasing product, that looks and feels exactly like how a user would expect. The result is an intuitive and visually consistent platform.

### Frontend

The client side of Message is built with React and styled with Semantic UI. I chose Semantic because of its clean look, excellent documentation, and how easy their React integration is to use.

React is a very powerful framework -- it's no wonder how popular it's become. I did my best to only use stateful components when necessary, preferring the simplicity of functional components. I have two container components which are organizing and distributing the API-related functions via props.

### Rich Text Editing

Handling rich text editing quickly became the first challenge. Preserving text as a string to a database is no problem, but including styling is another story. I explored several different solutions, but was grateful to discover Draft.js, a text editor created by the React team at Facebook. Draft.js saves the contents of the editor as an ```editorState``` which can be converted to raw JSON and then sent off to my Rails backend.

To read an existing article, the ```editorState``` gets rendered in an editor component set to ```readOnly```.

### Authentication

I'm handling authentication by using several different tools in my Rails backend. I'm hashing passwords with BCrypt and creating tokens with JWT. I added Figaro to securely contain some vital info for JWT. I'm also preserving a ```current_user``` instance variable to handle which articles come back to populate the feed. Obviously, a user's feed should only contain articles written by those users that she follows.

### Images

Uploading images for both articles and user profile pictures was another interesting challenge. Rather than saving images in my Postgres database with Paperclip and ImageMagick (a popular solution), I wanted to try a different route. The images are stored by a third-party storage system called Cloudinary. I am using Dropzone for drag and drop functionality and superagent to send the file to Cloudinary. Cloudinary's response includes a URL which is getting stored in my database.

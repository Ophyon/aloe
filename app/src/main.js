import  CodeMirror  from "https://cdn.jsdelivr.net/npm/codemirror@5.58.3/src/codemirror.js"
import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import "./modes/keybindings.js"
let editor, commandDisplay, vimMode;
let keys = '';
class App extends Component {
      render() {
        return html`
           <div id="editor"></div>
           <div id="command-display"></div>
           <div id="vim-mode"></div>
        `
      }
}
window.onload = () => {
    render(html`<${App} />`,document.querySelector("#root"))
    commandDisplay = document.querySelector('#command-display')
    editor = CodeMirror(document.querySelector("#editor"), {
            lineNumbers: true,
            lineWrapping: true,
            scrollbarStyle: null,
            theme: 'aloe',
            keyMap: "vim",
    }).setSize("100%", "100%")
    CodeMirror.on(editor, 'vim-keypress', function(key) {
        keys = keys + key;
        commandDisplay.innerText = keys;
      });
    CodeMirror.on(editor, 'vim-command-done', function(e) {
        keys = '';
        commandDisplay.innerHTML = keys;
    });
    vimMode = document.getElementById('vim-mode');
    CodeMirror.on(editor, 'vim-mode-change', function(e) {
        vimMode.innerText = JSON.stringify(e);
    });
}
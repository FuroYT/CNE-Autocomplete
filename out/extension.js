"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    vscode.window.showInformationMessage('Codename Autocomplete is Running! | VSCode Version: ' + vscode.version);
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider("xml", {
        provideCompletionItems(document, position, token, context) {
            const completionItems = [];
            const makeSnippet = function (prefix, name, description, snippetCode) {
                const snippet = new vscode.CompletionItem(`[Codename ${prefix}] ${name}`);
                snippet.documentation = new vscode.MarkdownString(description);
                snippet.detail = "Codename Engine " + prefix + " XML Snippet";
                snippet.kind = vscode.CompletionItemKind.Snippet;
                snippet.insertText = new vscode.SnippetString(snippetCode);
                completionItems.push(snippet);
            };
            makeSnippet("Stage", "Create Stage", "This creates an empty stage for Codename Engine", '<!DOCTYPE codename-engine-stage>\n<stage zoom="1" startCamPosX="0" startCamPosY="0" folder="stages/(your stage folder name in images/stage/)/">\n\t$0\n</stage>');
            makeSnippet("Stage", "High Memory Block", "Creates a element that doesn't show on low memory mode", '<high-memory>\n\t<!-- your sprites elements here -->\n\t$0\n</high-memory>');
            makeSnippet("Stage", "Static Sprite", "Creates a sprite element", '<sprite x="0" y="0" alpha="1" scroll="1" antialiasing="true" scale="1" flipX="false" flipY="false" updateHitbox="true" zoomfactor="1" sprite="mySillyImage" name="sillySprite"/>$0');
            makeSnippet("Stage", "Static Sprite (Compact)", "Creates a sprite element but removes the usually unused properties", '<sprite x="0" y="0" alpha="1" scale="1" sprite="mySillyImage" name="sillySprite"/>$0');
            makeSnippet("Stage", "Animated Sprite", "Creates a animated sprite element that uses sparrow", '<sprite x="0" y="0" alpha="1" scroll="1" antialiasing="true" scale="1" flipX="false" flipY="false" updateHitbox="true" zoomfactor="1" type="(either none, beat or loop)" sprite="mySillyImage" name="sillySprite">\n\t<!-- your sprites anims here (use the "Sprite Animation" Snippet) -->\n\t$0\n</sprite>');
            makeSnippet("Stage", "Animated Sprite (Compact)", "Creates a animated sprite element but removes the usually unused properties", '<sprite x="0" y="0" alpha="1" scale="1" type="loop" sprite="mySillyImage" name="sillySprite">\n\t<!-- your sprites anims here (use the "Sprite Animation" Snippet) -->\n\t$0\n</sprite>');
            makeSnippet("Stage", "Sprite Animation", "Creates a sprite animation element", '<anim name="idle" anim="mysprite idle0000" loop="false"/>\n\t$0');
            makeSnippet("Stage", "Sprite Animation With Indices", "Creates a sprite animation element", '<anim name="idle" anim="mysprite idle0000" loop="false" indices="0..14"/>\n$0');
            makeSnippet("Stage", "Solid Sprite", "Creates a solid sprite element", '<solid x="0" y="0" width="50" height="50" color="#FFFFFF"/>$0');
            var characters = [["bf", "Player"], ["gf", "Spectator"], ["dad", "Opponent"]];
            for (let index = 0; index < characters.length; index++) {
                var characterInfo = characters[index];
                console.log(characterInfo);
                var charactersType = characterInfo[0];
                var charactersName = characterInfo[1];
                makeSnippet("Stage", `${charactersName} Character Position`, `Sets the position for the ${charactersName.toLowerCase()} in the stage`, `<${charactersType} x="0" y="0" alpha="1" scale="1" camxoffset="0" camyoffset="0" flipX="false" scroll="1"/>$0`);
            }
            return new vscode.CompletionList(completionItems, false);
        },
    }));
    const disposable = vscode.commands.registerCommand('codename-autocomplete.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from codename-autocomplete!');
    });
    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map
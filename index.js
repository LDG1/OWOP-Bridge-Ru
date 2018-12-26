var WebSocket = require('ws');
global.DiscordClient = new (require("discord.js")).Client()

var Client = require('./owopCli.js')
var owopbot = new Client('ws://104.237.150.24:1337');
owopbot.world = 'owop'
owopbot.connect()

setTimeout(function() {
owopbot.sendMessage('/nick OWOP to Discord')
owopbot.move(999999999,999999999)
},5000)
var disconnected;
DiscordClient.login('');
DiscordClient.on("disconnect",(event)=>disconnected=true);
//editing OWOPcli.js wait 
var lastchat;
DiscordClient.on("ready",function() {
	

setInterval(function() {
  if(typeof owopbot.chat == "string") {
       var channel = DiscordClient.channels.get("503630562389524482");
  if(lastchat != owopbot.chat && !owopbot.chat.replace(/<(?:.|\n)*?>/gm, '').startsWith('[D]') && !owopbot.chat.replace(/<(?:.|\n)*?>/gm, '').startsWith('Server: You are now an admin. Do /help for a list of commands.') && !owopbot.chat.replace(/<(?:.|\n)*?>/gm, '').startsWith('Nickname') && !owopbot.chat.replace(/<(?:.|\n)*?>/gm, '').startsWith('(AO)') && !owopbot.chat.replace(/<(?:.|\n)*?>/gm, '').startsWith('DEVWorlds'))
       {
         
         console.log("lastchat: "
          + lastchat + " chat: " +  owopbot.chat)
         var chat = owopbot.chat.replace(/<(?:.|\n)*?>/gm, '')
		function say(nessage) {
		 
		 DiscordClient.guilds.get("455078712732549130").channels.get("503630562389524482").send(nessage)
		 
		}
		say(chat.replace(/(<@[&!]*\d{18}>)|(@everyone)|(@here)/g, '').replace(/\s+/g, ' '))
	   lastchat = owopbot.chat;
         
       }
       //lastchat = owopbot.chat;
    }
})
})
var auth = {prefix: "!"}



DiscordClient.on("message", message => {
    if (message.author.id == "502954449954799634") return;
    if (message.channel.id != '503630562389524482')
    return;
    var msg = message
   //console.log(message.member.nickname)
    if (message.member.nickname) {
      /*owopbot.sendMessage("/sayraw <span style=\"color:#78FFFF\">[D] " + message.member.nickname + ":<span style=\"color: white\"> " + msg)*/
      owopbot.sendMessage("/sayraw <span style=\"color:#78FFFF\">[D] " + message.member.nickname + ":<span style=\"color: white\"> " + msg)
    } else {
    /*owopbot.sendMessage("/sayraw <span style=\"color:#78FFFF\">[D] " + message.author.username + ":<span style=\"color: white\"> " + msg)*/
    owopbot.sendMessage("/sayraw <span style=\"color:#78FFFF\">[D] " + message.author.username + ":<span style=\"color: white\"> " + msg)
    }
})
DiscordClient.on('message', (msg) => {
    //if (message.author.id !== bot.user.id) return;
   msg.a = msg.content;
	var cmd = msg.a.split(' ')[0].toLowerCase();
	var input = msg.a.substring(cmd.length).trim();
	if (cmd == 'o!js') {
		if (msg.author.id == "246799235775725569") {
  if (input.startsWith('```js\n')) {
    input = input.split('```js\n')[1]; 
  }
  if (input.endsWith('```')) {
  input = input.split('```')[0];
  }
//{split:{prepend:unescape("%60%60%60js%0A"),append:unescape("%0A%60%60%60")}}
  //console.log(input)
    
	
		
		
		try {
					let eaa = require("util").inspect(eval(input)).replace(/undefined/g, "unduhfinded");
				    
					let h = '```js\n' + '-> ' + eaa  + '\n```'
					msg.channel.send(h,{split:{prepend:unescape("%60%60%60js%0A"),append:unescape("%0A%60%60%60")}})
				} catch (e) {
					msg.channel.send('```diff\n' + '-> ' + e + '\n```');
				}
    } else {
	//msg.react(msg.guild.emojis.get("495399837718806529"));
	}
	}
	})
function status1() {
  try{
  DiscordClient.user.setActivity("augustberchelmann.com/owop", {type: "PLAYING"});
  } catch(e) {
    console.log(e)
  }
  setTimeout(status2, 10000)
}

function status2() {
  try{
  DiscordClient.user.setActivity("Bop It", {type: "PLAYING"});
  } catch(e) {
    console.log(e)
  }
  setTimeout(status1, 10000)
}

setTimeout(status1, 1000)

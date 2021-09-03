const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const botimg = "icons/compman.gif";
const userimg = "icons/user.jpg";
const botName = "BOT";
const personName = "Godlove";

const prompts = [
	// 1 greetings
	[
		"hi",
		"hey",
		"hello",
		"sup",
		"you good?",
		"good morning",
		"good evening",
		"whats good!"
	],
	// 2 enquiry
	[
		"how are you",
		"how is life",
		"how far nah",
		"whats up?",
		"how is you day going?"
	],
	// 3 personal
	[
		"how old are you",
		"where are you from",
		"where are you from?",
	],
	// 4 enquiry 2
	[
		"who are you",
		"are you human?"
	],
	//5 random question
	[
		"your name please",
		"may i know your name",
		"what do you call yourself"
	],
	// 6 forbidden
	[
		"i love you"
	]
];


const replies = [
		// 1 greetings
	[
		"hi",
		"hey",
		"hello",
		"sup",
		"we good",
		"good morning",
		"good evening",
		"how are doing today",
		"hope all is well with you",
		"howdy",
		"you good?"
	],
	// 2 enquiry
	[
		"i am fine thank you",
		"how is life",
		"how far nah",
		"i'm cool, what about you",
		"great"
	],
	// 3 personal
	[
		"i am computer",
		"yes",
		"ask my creator",
		"f**k off",
		"your imagination"
	],
	// 4 enquiry 2
	[
		"your imagination",
		"Gdlove's PA"
	],
	//5 random question
	[
		"godlove's PA for now",
		"yes of course",
		"the i am"
	],
	// 6 forbidden
	[
		"f**k off",
		"you are a bitch",
		"leave this place before i hack you"
	]
];

const alternative = [
	 
	"there might be a problem with you english",
	"go on",
	"bro...",
	"i dont understand",
	"i am listening",
	"come again!",
	"i didn't catch that",
	"so sorry mehn",
	"whats is that you said ?",
	"psssss! you are in the wrong array mehn",
	"what do u want to do",
	"come on now",
	"sup",
	"are you good?",
	"cool menh",
	"thats sick man",
		"wetin concine you for the place sef"
];

const robot = [
	"how are you,fellow human",
	"i am not a bot"
];

msgerForm.addEventListener("submit", event => {
	event.preventDefault();

	const msgtext = msgerInput.value;
	if (!msgtext) return;
	msgerInput.value = "";
	addChat(personName, userimg, "right", msgtext);
	output(msgtext);
});

function output(input) {
	let product;
	let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
	text = text
		.replace(/a/g, "")
		.replace(/i feel/g, "")
		.replace(/whats/g, "what is")
		.replace(/please/g, "")
		.replace(/ please/g, "")
		.replace(/r u/g, "are you");
	
	if (compare(prompts, replies, text)) {
		product = compare(prompts, replies, text);
	} else if (text.match(/thank/gi)) {
		product = "your are welcome";
	} else if (text.match(/(robot|bot|robo)/gi)) {
		product = robot[Math.floor(Math.random() * robot.length)];
	} else {
		product = alternative[Math.floor(Math.random() * alternative.length)];
	}
	const delay = input.split("").length * 100;
	setTimeout(() => {
		addChat(botName, botimg, "left", product)
	}, delay);
}

function compare(promptsArray, repliesArray, string) {
	let reply;
	let replyFound = false;
	for (let x = 0; x < promptsArray.length; x++){
		for (let y = 0; y < promptsArray[x].length; y++){
			if (promptsArray[x][y] == string) {
				let replies = repliesArray[x];
				reply = replies[Math.floor(Math.random() * replies.length)];
				replyFound = true;
				break;
			}
		}
		if (replyFound) {
			break;
		}
	}
	return reply;
}

function addChat(name, img, side, text) {
	const msgHTML =
		`	<div class="msg  ${side}-msg">
<div class="msg-img" style="background-image: url(${img});"></div>
<div class="msg-bubble">
<div class="msg-info">
<div class="msg-info-name">${name}</div>
<div class="msg-info-time">${formatDate(new Date())}</div>
</div>
<div class="msg-text">${text}</div>
</div>
	</div> `;
	msgerChat.insertAdjacentHTML("beforeend", msgHTML);
	msgerChat.scrollTop += 500;
}

function get(selector, root = document) {
	return root.querySelector(selector);
}

function formatDate(date) {
	const h = "0" + date.getHours();
	const m = "0" + date.getMinutes();
	return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
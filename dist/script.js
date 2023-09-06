import { write, presets } from "https://cdn.skypack.dev/glitched-writer@2.0.29";

// Glitched Writer npm package: https://www.npmjs.com/package/glitched-writer

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
	window.parent.document.body.style.zoom = 1.5;
}
var censoredText = document.getElementById("censored"),
	options = {
		interval: [50, 70],
		delay: 0,
		steps: 0,
		changeChance: 0,
		maxGhosts: 0,
		oneAtATime: 3,
		fillSpace: false,
		mode: "erase_smart",
		html: true
	},
	optionsCon = {
		steps: [1, 8],
		interval: [60, 170],
		delay: [40, 730],
		changeChance: 0.6,
		ghostChance: 0.2,
		maxGhosts: 1,
		oneAtATime: 0,
		glyphs:
			"ABCDĐEFGHIJKLMNOPQRSTUVWXYZabhijktuvwĆćŻżŹźŃńóŁłАБВГҐДЂЕЁЄЖЗЅИІЇЙЈКЛЉМНЊОПРСТЋУЎФХЦЧЏШЩЪЫЬЭЮЯабвгґдђеёєжзѕиіїйјклљмнњопрстћуўфхцчџшщъыьэюяΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωάΆέΈέΉίϊΐΊόΌύΰϋΎΫΏĂÂÊÔƠƯăâêôơư一二三四五六七八九十百千上下左右中大小月日年早木林山川土空田天生花草虫犬人名女男子目耳口手足見音力気円入出立休先夕本文字学校村町森正水火玉王石竹糸貝車金雨赤青白数多少万半形太細広長点丸交光角計直線矢弱強高同親母父姉兄弟妹自友体毛頭顔首心時曜朝昼夜分週春夏秋冬今新古間方北南東西遠近前後内外場地国園谷野原里市京風雪雲池海岩星室戸家寺通門道話言答声聞語読書記紙画絵図工教晴思考知才理算作元食肉馬牛魚鳥羽鳴麦米茶色黄黒来行帰歩走止活店買売午汽弓回会組船明社切電毎合当台楽公引科歌刀番用何ĂÂÊÔƠƯăâêôơư1234567890‘?’“!”(%)[#]{@}/\\&<-+÷×=>$€£¥¢:;,.*•°·…±†‡æ«»¦¯—–~˜¨_øÞ¿▬▭▮▯┐└╛░▒▓○‼⁇⁈⁉‽ℴℵℶℷℸℲ℮ℯ⅁⅂⅃⅄₠₡₢₣₤₥₦₧₨₩₪₫€₭₮₯₰₱₲₳₴₵₶₷₸₹₺₻₼₽₾₿          ̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̽̾̿̀́͂̓̈́͆͊͋͌̕̚ͅ ͓͔͕͖͙͚͐͑͒͗͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ͘͜͟͢͝͞͠͡͏҉",
		glyphsFromText: true,
		fillSpace: true,
		mode: "matching",
		html: true,
		letterize: true,
		endless: true,
		fps: 60
	};

const bookEl = document.getElementById("book"),
	progressEl = document.querySelector(".progress"),
	paragraphs = [],
	toDecimal = (n) => Number.parseFloat(n).toFixed(2);

let i = 0,
	isWriting = false,
	progress = 0,
	maxLetters = 0;

(function () {
	const { children } = bookEl;

	[...children].forEach(({ nodeName, innerHTML }) => {
		paragraphs.push({
			tag: nodeName,
			html: innerHTML
		});
		maxLetters += innerHTML.length;
	});

	bookEl.innerHTML = "";
})();
const writeParagraph = () => {
	const { tag, html } = paragraphs[i],
		el = document.createElement(tag);

	bookEl.appendChild(el);

	isWriting = true;

	write(html, el, options, updateProgress).then(() => {
		isWriting = false;
		progress += html.length;
	});

	function updateProgress({ length }) {
		let p = (length + progress) / maxLetters;
		p = Math.round(p * 10000) / 100;
		progressEl.style.setProperty("--p", p + "%");
	}

	i++;
	if (i === 2) options.interval = [0, 30];
};

writeParagraph();

var speed = 1;

window.addEventListener("keydown", function (e) {
	switch (e.keyCode) {
		case 37:
			redSpeed();
			break;
		case 38:
			menu1.classList.toggle("active");
			break;
		case 39:
			incSpeed();
			break;
		case 40:
			//Down
			writeParagraph();
			break;
	}
});

function incSpeed() {
	if (1 <= speed && speed < 6) {
		speed = speed + 1;
		console.log(speed);
	}
	options.oneAtATime = speed;
}

function redSpeed() {
	if (1 < speed && speed <= 6) {
		speed = speed - 1;
		console.log(speed);
	}
	options.oneAtATime = speed;
}

window.addEventListener("wheel", ({ wheelDeltaY: delta }) => {
	if (delta > 0 || isWriting || i >= paragraphs.length) return;

	writeParagraph();
});

let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;

const slider = document.getElementById("slider");

function handleGesture() {
	if (touchendY < touchstartY - 150) writeParagraph();
	if (touchendY > touchstartY + 200) menu1.classList.toggle("active");
	if (touchendX > touchstartX + 150) incSpeed();
	if (touchendX < touchstartX - 150) redSpeed();
}

window.addEventListener("touchstart", (e) => {
	touchstartX = e.changedTouches[0].screenX;
	touchstartY = e.changedTouches[0].screenY;
});

window.addEventListener("touchend", (e) => {
	touchendX = e.changedTouches[0].screenX;
	touchendY = e.changedTouches[0].screenY;
	handleGesture();
});

const lerp = (current, goal, p) => (1 - p) * current + p * goal;

let prev = 0;

const frame = () => {
	const { height, top } = bookEl.getBoundingClientRect();

	let value = lerp(-top, height - window.innerHeight, 0.02);
	value = toDecimal(value);

	if (Math.abs(value) - prev > 0.3) {
		bookEl.style.transform = `translateY(${-value}px)`;
		prev = value;
	}

	window.requestAnimationFrame(frame);
};
window.requestAnimationFrame(frame);
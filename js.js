var karakter;
var karaAtas; var karaKiri;
var hadap;
var jalankah;
var virus = [];
var jumlahVirus = 1;
var virusHTML = "";
var virusHTMLtampil;
var nyawaMeter;
var diamond = [angkaAcak(),angkaAcak()];// [atas, kiri]
var kotakSehat = [angkaAcak(),angkaAcak()];
var kecepatan;// untuk mngatur kecepatan karakter jalan\
var kalahkah;
var level = 1;
var targetDiamond;

function mulai() {
	document.addEventListener("keydown",pencet);
	karakter = "yabiruBawahBerhenti";
	karaAtas = angkaAcak();
	karaKiri = angkaAcak();
	hadap = "bawah";
	jumlahVirus = 1 * level;
	jalankah = false;
	kecepatan = 1.5;
	nyawaMeter = 100;
	kalahkah = false;
	targetDiamond = 5 * level;
	for (var i = 0; i < jumlahVirus; i++) {
		// [atas, kiri]
		// [kiri], [atas], [kanan], [bawah]
		virus[i] = [[angkaAcak(), angkaAcak()],[angkaAcak(), angkaAcak()],[angkaAcak(), angkaAcak()],[angkaAcak(), angkaAcak()]];
	}
	for (var i = 0; i < jumlahVirus; i++) {
		virus[i][0][1] -= 100;
		virus[i][1][0] -= 100;
		virus[i][2][1] += 100;
		virus[i][3][0] += 100;
	}
	tampilGame();
	document.getElementById('char').style = posisi(karaAtas, karaKiri);
	jalan();
	document.getElementById('halamanAwal').style = "display: none;";
	document.getElementById('game').style = "display: block;";
}

function tampilChar() {
	return "<img id='char' src='img/" + karakter + ".gif'>";
}

function tampilVirus() {
	for (var i = 0; i < jumlahVirus; i++) {
		for (var j = 0; j < 4; j++) {
			virusHTML += "<img id='virus" + i +"_" + j + "' style='top: " + virus[i][j][0] + "vmin; left: "+virus[i][j][1]+"vmin;' class='virus' src='img/virus.gif'>";
		}
	}
	virusHTMLtampil = virusHTML;
}

function tampilGame() {
	document.getElementById('game').innerHTML = tampilChar() + virusHTMLtampil +nyawa() + "<img id='diamond' style='top: "+diamond[0]+"vmin; left: "+diamond[1]+"vmin' src='img/diamond.png'>" + "<img id='kotakSehat' style='top: "+kotakSehat[0]+"vmin; left: "+kotakSehat[1]+"vmin' src='img/kotakSehat.png'>"+"<div id='skor'>" + targetDiamond +"<img id='skorGambar' src='img/diamond.png'></div>";
}

function nyawa() {
	return "<div id='nyawaMeter' style='width: "+nyawaMeter+"vmin'></div>";
}

function angkaAcak() {
	return parseInt(Math.floor(Math.random() * 91));
}

function posisi(atas, kiri) {
	return "top: " + atas + "vmin; left: "+kiri+"vmin;";
}

function ke(ke) {
	hadap = ke;
	jalankah = true;
}

function jalan() {
	if (nyawaMeter > 0) {nyawaMeter -= 0.12} else {nyawaMeter = 0}
	virusJalan();
	if (hadap == "bawah" && jalankah == true) {
		if (karaAtas >= 90) {
			berhenti();
		} else {
			karaAtas += kecepatan;
			karakter = "yabiruBawah";
		}
	} else if (hadap == "atas" && jalankah == true) {
		if (karaAtas <= 0) {
			berhenti();
		} else {
			karaAtas -= kecepatan;
			karakter = "yabiruAtas";
		}
	} else if (hadap == "kiri" && jalankah == true) {
		if (karaKiri <= 0) {
			berhenti();
		} else {
			karaKiri -= kecepatan;
			karakter = "yabiruKiri";
		}
	} else if (hadap == "kanan" && jalankah == true) {
		if (karaKiri >= 90) {
			berhenti();
		} else {
			karaKiri += kecepatan;
			karakter = "yabiruKanan";
		}
	} else if (jalankah == false) {
		berhenti();
	}else {
		document.getElementById('game').innerHTML = "fuck" + tampilChar();
	}
	tampilGame();
	document.getElementById('char').style = posisi(karaAtas, karaKiri);
	berjalan();
}

function berjalan() {
	setTimeout(cek, 100);
}

function cek() {
	var atas = karaAtas - 7;
	var bawah = karaAtas + 7;
	var kiri = karaKiri - 6;
	var kanan = karaKiri + 6;
	for (var i = 0; i < jumlahVirus; i++) {
		if (virus[i][0][1] == 110) {
			virus[i][0][1] = -10;
			virus[i][0][0] = angkaAcak();
		}
		if (virus[i][1][0] == 110) {
			virus[i][1][0] = -10;
			virus[i][1][1] = angkaAcak();
		}
		if (virus[i][2][1] == -10) {
			virus[i][2][1] = 110;
			virus[i][2][0] = angkaAcak();
		}
		if (virus[i][3][0] == -10) {
			virus[i][3][0] = 110;
			virus[i][3][1] = angkaAcak();
		}
		for (var j = 0; j < 4; j++) {
			if (virus[i][j][0] >= atas && virus[i][j][0] <= bawah && virus[i][j][1] >= kiri && virus[i][j][1] <= kanan) {
				kalah();
			}
		}
	}
	if (karaAtas >=  (kotakSehat[0] - 8) && karaAtas <= (kotakSehat[0] + 4) && karaKiri >= (kotakSehat[1] - 6) && karaKiri <= (kotakSehat[1] + 1)) {
		if (nyawaMeter < 80) { nyawaMeter += 20} else {nyawaMeter = 100}
		kotakSehat[0] = angkaAcak();
		kotakSehat[1] = angkaAcak();
	}
	if (karaAtas >=  (diamond[0] - 8) && karaAtas <= (diamond[0] + 4) && karaKiri >= (diamond[1] - 6) && karaKiri <= (diamond[1] + 1)) {
		targetDiamond -= 1;
		diamond[0] = angkaAcak();
		diamond[1] = angkaAcak();
	}
	if (nyawaMeter <= 0) {kalah()}
	if (targetDiamond == 0) {menang()}
	if (kalahkah != true) {jalan()}
}

function virusJalan() {
	for (var i = 0; i < jumlahVirus; i++) {
		virus[i][0][1] += 1;
		virus[i][1][0] += 1;
		virus[i][2][1] -= 1;
		virus[i][3][0] -= 1;
	}
	virusHTML = "";
	tampilVirus();
}

function berhenti() {
	jalankah = false;
	if (hadap == "bawah") {
		karakter = "yabiruBawahBerhenti";
	} else if (hadap == "atas") {
		karakter = "yabiruAtasBerhenti";
	} else if (hadap == "kiri") {
		karakter = "yabiruKiriBerhenti";
	} else if (hadap == "kanan") {
		karakter = "yabiruKananBerhenti";
	}
	tampilGame();
	document.getElementById('char').style = posisi(karaAtas, karaKiri);
}

function kalah() {
	document.getElementById("halamanAwal").style = "display: block";
	document.getElementById("game").style = "display: none";
	kalahkah = true;
	document.getElementById("pesan").innerHTML = "UH OH ANDA TERINFEKSI :(<hr>";
}

function menang() {
	level += 1;
	console.log(level);
	var tingkatan;
	if (level == 2) {
		tingkatan = "NORMAL";
	} else if (level == 3) {
		tingkatan = "SUSAH";
	} else if (level == 4) {
		tingkatan = "NOLEP";
	} else if (level == 5) {
		tingkatan = "WIBU";
	} else {
		tingkatan = level;
	}
	document.getElementById("halamanAwal").style = "display: block";
	document.getElementById("game").style = "display: none";
	document.getElementById("tingkatan").innerHTML = ": "+tingkatan;
	kalahkah = true;
	document.getElementById("target").innerHTML = ": "+ (level * 5);
	document.getElementById("pesan").innerHTML = "SELAMAT ANDA TELAH MENYELESAIKAN MISI !!<hr>";
}

function pencet(evt) {
	switch(evt.keyCode) {
		case 37:
			ke("kiri");
			break;
		case 38:
			ke("atas");
			break;
		case 39:
			ke("kanan");
			break;
		case 40:
			ke("bawah");
			break;
		case 32:
			berhenti();
			break;
	}
}
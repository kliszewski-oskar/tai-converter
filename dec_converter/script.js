const ins = document.querySelector("#in");
const out = document.querySelector("#out");
const msg = document.querySelector("#msgs")
const cls = {}

let setMsg = (type, text) => {
    if (type == "info")
        msg.innerHTML = '<p>'+text+'</p>';
    if (type == "error")
        msg.innerHTML = '<p style="color: red">'+text+'</p>';
    if (type == "clean")
        msg.innerHTML = "";
}

let strPad = (len, text, sign="0") => {
    return sign.repeat(8-len) + text;
}

let detect = (e) => {
    let val = e.target.value;
    if (val.includes(".")) {
        dec2bin(val);
    } else {
        bin2dec(val);
    }
}

let dec2bin = (ip) => {
    let binOct = "";
    let oct = ip.split(".");
    let oLen = oct.length;
    if (oLen < 4)
        setMsg("error", "podano tylko "+oLen+" oktety");
    else
        setMsg("clean");

    for (i = 0; i < oLen; i++) {
        let digit = parseInt(oct[i]);
        binOct += (binOct === "" ? "" : "." );

        if (digit >= 0 && digit <= 255) {
            let bin = (digit >>> 0).toString(2);
            let bLen = bin.length;
            binOct += (bLen < 8) ? strPad(bLen, bin) : bin;
        } else {
            setMsg("error", "wartosc poza zakresem w oktescie "+i);
        }
    }

    out.textContent = binOct;
}

let bin2dec = (bin) => {
    let dec = "";
    let oct = bin.split(".");

    for (i = 0; i < oct.length; i++) {
        dec += (dec === "" ? "" : "." );
        dec += parseInt(oct[i], 2);
    }
    out.textContent = dec;
}

ins.addEventListener("focusout", detect, false);



// Mobile navigation bar rosponsivness






// Header animations
let stars = document.getElementById('stars')
let moon = document.getElementById('moon')
let mountains_behind = document.getElementById('mountains_behind')
let text = document.getElementById('text')
let btn = document.getElementById('btn')
let mountains_front = document.getElementById('mountains_front')
let header = document.querySelector('header')

window.addEventListener('scroll', function() {
    let value = this.window.scrollY
    stars.style.left = value * 0.3 + 'px';
    moon.style.top = value * 0.5 + 'px';
    moon.style.left = -value * 0.1 + 'px';
    mountains_behind.style.top = value * 0.35 + 'px';
    mountains_front.style.top = value * 0 + 'px';
    text.style.marginTop = value + 'px';
    btn.style.marginTop = value + 'px';
    header.style.top = value * 0.7 + 'px';
})


// API Data
let floorPrice = document.getElementById('floor_price')

getFloorPrice().then(data => floorPrice.textContent = "floor price for " + "TBD" + ": " + data.floor_price/1000000 + " ADA")

async function getFloorPrice() {
    let response = await fetch('https://api.opencnft.io/1/policy/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/floor_price');
    let data = await response.json()
    return data
}
/*async function getCollectionName() {
    let response = await fetch('https://api.opencnft.io/1/policy/d79181749db228d10c98501a7e1728585780bcf133b7b3df953a9017/floor_price');
    let data = await response.json()
    return data
}*/


// decode hex encoded cbor string to a json array
async function cborToJson(cborString) {
    buf = new Uint8Array(cborString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
    data = await cbor.diagnose(buf)

    result = data.replace(/h'(.*?)'/g, function(m, p) {
        let s = p.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join("")
        if (/\p{S}/u.test(s)) return m
        else return `'${s}'`
    })

    result = result.replaceAll("h'", "'")
    result = result.replaceAll("'", '"')
    resultJson = JSON.parse(result)
    return resultJson
}

// nami login functions
let namiWallet = document.getElementById('nami_wallet')

//nami connect
async function namiConnect() {
    let nami = await cardano.nami.enable()
    balance = await cborToJson(await nami.getBalance())
    currency = balance[0]
    //namiWallet.innerHTML = "Wallet: " + (balance[0]/1000000).toFixed(2)
    namiWallet.innerHTML = "Connected"
}

//check if logged in upon loading website
async function checkLogin() {
    let connectedCheck = await cardano.nami.isEnabled()
    if (connectedCheck) {
        namiConnect()
    }
}

//if not logged in, login through login button
async function namiLogin() {
    await cardano.nami.enable()
    let connectedCheck = await cardano.nami.isEnabled()
    if (connectedCheck != true) {
        namiWallet.textContent = 'failed'
    } else {
        namiConnect()
    }
}

window.onload = async function() {
    let nami = await cardano.nami.enable()
    console.log(await cborToJson(await nami.getBalance()))


    //const url = "https://cardano-mainnet.blockfrost.io/api/v0/assets/5cf33cfea1b37c289060f55fa09c1fb3b9cb6972e40d9ed2f94a5ada484d5072696f4d6f6e737465723139/addresses";
    const url = "https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1qx4g2mapx3qq0tm08ts6cr6g64awhu5vu4s8luhr2xjrm7ggktgwym63c6e8xj50xm62a2gl0n602elpn43g45c2nm6scaug0c"
    const options = {
        headers: {
        "project_id": "mainnetymMePMQFraXEvwwLOZzCKuFpV971eEJ9",
        }
    };

    fetch(url, options)
    .then( res => res.json() )
    .then( data => console.log(data) );
    }




    
// to do






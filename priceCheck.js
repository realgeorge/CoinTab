
var price = 0;

chrome.alarms.create("1min", {
  delayInMinutes: 0.5,
  periodInMinutes: 0.5
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "1min"){
    getBTCPrice('https://api.coinbase.com/v2/prices/BTC-USD/spot');
  }
});

function getBTCPrice(searchTerm) {
  var x = new XMLHttpRequest();
  x.open('GET', searchTerm);
  x.setRequestHeader('CB-VERSION', '2016-08-10');
  x.responseType = 'json';
  x.onload = function() {

    var response = x.response;
    chrome.browserAction.setBadgeText({text: ''});
    chrome.browserAction.setTitle({title: response['data']['amount'] + " USD"})
    chrome.browserAction.setBadgeText({text: response['data']['amount']});

    console.log("before", price)
    var currency = response['data']['amount'];
    newPrice = Number(currency.replace(/[^0-9\.]+/g,""));
    console.log("after", newPrice)

    var red = '#ed1b2f', green = '#00a651', blue = '#000'
    var bgcolor = ''

    if (price === 0 || price === newPrice)
      bgcolor = blue
    else if (price > newPrice)
      bgcolor = red
    else if (price < newPrice)
      bgcolor = green

    price = newPrice
    chrome.browserAction.setBadgeBackgroundColor({color: bgcolor})

    var tag = document.getElementById("btc-price");
    tag.innerHTML = "USD " + response['data']['amount'];    
  };
  x.onerror = function(err) {
    console.log(err)
  };
  x.send();
}

document.addEventListener('DOMContentLoaded', function () {

  getBTCPrice('https://api.coinbase.com/v2/prices/BTC-USD/spot');

  var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});



function navigateAway() {
    const navLink = 'https://www.tradingview.com/chart/wHjvrU9l/';
    chrome.tabs.create({url: navLink});
  }
  
  chrome.browserAction.onClicked.addListener(navigateAway);
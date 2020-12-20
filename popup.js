// var form = document.getElementById('newAbbreviationForm');
// function handleForm(event) { event.preventDefault(); }
// form.addEventListener('submit', handleForm);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#newAbbreviationSubmitButton').addEventListener('click', onclick, false)
  function onclick() {
    var abbrUrl = document.getElementById("abbrUrlField").value;
    var redirectUrl = document.getElementById("redirectUrlField").value;
    console.log(abbrUrl + redirectUrl);

    // addAbbreviationUrl(abbrUrl, redirectUrl);

    // var dict = {};
    // chrome.storage.local.get(function(result) {
    //   dict = result.abbreviationDictionary;
    // });
    //
    // dict[buildAbbreviatedUrl(abbrUrl)] = "redirectUrl";
    //
    // chrome.storage.local.set({"abbreviationDictionary": dict});

    // copy console
    var obj = new Object();
    chrome.storage.local.get(function(result) {
      obj = result.abbreviationDictionary
    });
    obj["adam"] = "samuelson";
    chrome.storage.local.set({"abbreviationDictionary": obj});


    console.log('popup');
  }
}, false)

title = document.getElementsByClassName("title")[0].innerText
subTitle = document.getElementsByClassName("subtitle")[0].innerText
main = document.getElementsByClassName("section-0")[0].innerText


var xhttp = new XMLHttpRequest();
xhttp.open("POST", "https://heeton.azurewebsites.net/api", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.setRequestHeader("dataType", "json");
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText)
   }
};

var tosend = title + " " + subTitle + " " + main
xhttp.send(JSON.stringify({text: tosend}));

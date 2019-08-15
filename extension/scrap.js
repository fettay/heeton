title = document.getElementsByClassName("art_header_title")[0].innerText
subTitle = document.getElementsByClassName("art_header_sub_title")[0].innerText
main = document.getElementsByClassName("text14")[0].innerText

var xhttp = new XMLHttpRequest();
xhttp.open("POST", "https://heeton.azurewebsites.net/api", true);
//xhttp.setRequestHeader("Content-type", "application/json");
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText)
   }
};

var tosend = title + " " + subTitle + " " + main
xhttp.send(tosend);




// xhttp.open("GET", "https://en.wikipedia.org/w/api.php?action=opensearch&search=albert einstein&limit=1&namespace=0 &format=json", true);
// //xhttp.setRequestHeader("Content-type", "application/json");
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       alert(this.responseText)
//    }
// };
// xhttp.send();

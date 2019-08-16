title = document.getElementsByClassName("title")[0].innerText
subTitle = document.getElementsByClassName("subtitle")[0].innerText
main = document.getElementsByClassName("article-content")[0].innerText

var tosend = title + " " + subTitle; //+ " " + main


fetchResource("https://heeton.azurewebsites.net/api",{
  method: 'POST',
  body: JSON.stringify({text: tosend}),
  headers: {"Content-type":"application/json", "dataType":"json"}
})


function fetchResource(input, init) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({input, init}, messageResponse => {
      const [response, error] = messageResponse;
      if (response === null) {
        reject(error);
      } else {
        // Use undefined on a 204 - No Content
        const body = response.body ? new Blob([response.body]) : undefined;
        resolve(new Response(body, {
          status: response.status,
          statusText: response.statusText,
        }));
      }
    });
  });
}
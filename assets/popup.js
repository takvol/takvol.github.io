var t = TrelloPowerUp.iframe();

t.render(function(){
  t.sizeTo('#popup').done();
});

createButton = document.querySelector('button');
createButton.addEventListener('click', function(event){
  key = '67830660e9ef8b444f8c8ecfed93345873974fcf66bedc44331f8d26b20e49fd';
  url = 'https://script.google.com/macros/s/AKfycbz62Z78Wb1iE2awWeDuV96cf1hSCBw9WfnPh1o89hp4u6M96bE/exec?key=' + key;
  
  createButton.style.display = 'none';
  createButton.parentNode.innerText = 'Please wait...';
  
  t.card('id','name','url').then(function(card){
    url += '&card_id=' + card.id + '&card_name=' + card.name + '&card_url=' + card.url;
    
    t.board('id').then(function(board){
      url += '&board_id=' + board.id;
      httpRequest = new XMLHttpRequest();
      
      httpRequest.addEventListener("error", handleError('request error'));
      httpRequest.addEventListener("abort", handleError('request aborted'));
      httpRequest.addEventListener("timeout", handleError('request timeout'));
      
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            response = JSON.parse(httpRequest.responseText);
            if (response.status == 'OK') {
              editButton = document.createElement('BUTTON');
              editButton.innerText = 'Edit in Google Docs';
              editButton.addEventListener('click', function(event){
                event.preventDefault();
                window.open(response.url, "_blank");
              });
              createButton.parentNode.appendChild(editButton);
              t.attach({name: response.name, url: response.url});
            } else {
              createButton.parentNode.innerText = response.message;
            }
            console.log(response);
          } else {
            handleError(httpRequest.responseText);
          }
        }
      };
      httpRequest.open('GET', url);
      httpRequest.send();
      
      handleError(message) {
        createButton.parentNode.innerText = message;
      }
    });//t.board
  });//t.card
});//eventListener

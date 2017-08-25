var t = TrelloPowerUp.iframe();

t.render(function(){
  t.sizeTo('#popup').done();
});

window.addEventListener('load', function(){
var createButton = document.querySelector('button');

createButton.addEventListener('click', function(event){
  event.preventDefault();
  var key = '67830660e9ef8b444f8c8ecfed93345873974fcf66bedc44331f8d26b20e49fd';
  var url = 'https://script.google.com/macros/s/AKfycbz62Z78Wb1iE2awWeDuV96cf1hSCBw9WfnPh1o89hp4u6M96bE/exec?key=' + key;
  var container = document.querySelector('#popup');
  
  createButton.style.display = 'none';
  container.innerText = 'Please wait...';
  
  t.card('id','name','url','shortLink').then(function(card){
    url += '&card_id=' + card.id + '&card_name=' + card.name + '&card_url=' + card.url + '&card_short=' + card.shortLink;
    
    t.board('id','name','shortLink').then(function(board){
      url += '&board_id=' + board.id + '&board_name=' + board.name + '&board_short=' + board.shortLink;
      var httpRequest = new XMLHttpRequest();
      
      httpRequest.onerror = function(){ container.innerText = 'request error';};
      httpRequest.onabort = function(){ container.innerText = 'request aborted';};
      httpRequest.ontimeout = function(){ container.innerText = 'request timeout';};
      
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            response = JSON.parse(httpRequest.responseText);
            if (response.status == 'OK') {
              var editButton = document.createElement('BUTTON');
              editButton.innerText = 'Edit in Google Docs';
              editButton.addEventListener('click', function(event){
                event.preventDefault();
                window.open(response.url, "_blank");
              });
              container.innerText = '';
              container.appendChild(editButton);
              t.attach({name: response.name, url: response.url});
            } else {
              container.innerText = response.message;
            }
            console.log(response);
          } else {
            container.innerText = httpRequest.responseText;
          }
        }
      };
      httpRequest.open('GET', url);
      httpRequest.send();
    });//t.board
  });//t.card
});//eventListener
});//window onload

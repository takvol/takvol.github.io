var t = TrelloPowerUp.iframe();

t.render(function(){
  t.sizeTo('#popup').done();
});

document.querySelector('button').addEventListener('click', function(event){
  key = '67830660e9ef8b444f8c8ecfed93345873974fcf66bedc44331f8d26b20e49fd';
  card = t.card('id','name','url');
  board = t.board('id');
  fetch('https://script.google.com/macros/s/AKfycbz62Z78Wb1iE2awWeDuV96cf1hSCBw9WfnPh1o89hp4u6M96bE/exec?key=' + key
       + '&card_id=' + card.id + '&card_name=' + card.name + '&card_url=' + card.url + '&board_id=' + board.id)
        .then(function(result){
    console.log(result);
  });
});

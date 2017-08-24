var t = TrelloPowerUp.iframe();

t.render(function(){
  t.sizeTo('#popup').done();
});

document.querySelector('button').addEventListener('click', function(event){
  fetch('https://cyplarix.com').then(function(result){
    console.log(result);
  });
});

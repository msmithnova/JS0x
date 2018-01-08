function soundLoaded() {
  
    // enable buttons, the sounds are loaded
      
    var button1 = document.querySelector("#explosion");
    button1.disabled = false;
    button1.addEventListener("click", function() {
        sound.play('blast');
    });
          
    var button2 = document.querySelector("#basic_explosion");
    button2.disabled = false;
    button2.addEventListener("click", function() {
        sound.play('laser');
    });
    
    var button3 = document.querySelector("#winner");
    button3.disabled = false;
    button3.addEventListener("click", function() {
        sound.play('winner');
    });

    var button4 = document.querySelector("#explosion2");
    button4.disabled = false;
    button4.addEventListener("click", function() {
        sound.play('blast2');
    });
          
    var button5 = document.querySelector("#laser2");
    button5.disabled = false;
    button5.addEventListener("click", function() {
        sound.play('laser2');
    });
    
    var button6 = document.querySelector("#winner2");
    button6.disabled = false;
    button6.addEventListener("click", function() {
        sound.play('winner2');
    });
}
  
  
// Load and decode sounds
var sound = new Howl({
    urls: ['https://goldfirestudios.com/proj/howlerjs/sounds.mp3', 'https://goldfirestudios.com/proj/howlerjs/sounds.ogg'],
    sprite: {
        // From course example
        blast: [0, 2000],
        laser: [3000, 700],
        winner: [5000, 9000],
        // From Github Howler example, laser2 has no sound
        blast2: [0, 3000],
        laser2: [4000, 1000],
        winner2: [6000, 5000]
    }, 
    onload: function() { 
        console.log("Sound loaded");
        soundLoaded();
    }
});
window.onload = function () {
   
var counter = 0, lock = 1, x, y;

   /*Get access from the button to draw rectangle*/

   window.addEventListener('message', function (e) {
       
       if (e.data) {
        lock = 0;
       } else {
        lock = 1;
       }

   }); 

/*-------------Model-------------*/

var Mod = Backbone.Model.extend({});

/*-------------View of el---------------*/

var ModView = Backbone.View.extend({
     
  events: {

    'mousedown': 'drag' 

  },

/*-------------Start dragging-------------*/

  drag: function () {      
 
    $('div').on('mousedown', function () {
     
      var rect = this;
      
      rect.style.cursor = "move";
      document.onmousemove = function (e) {
         
        x = e.pageX;
        y = e.pageY;
        left = rect.offsetLeft;
        tp = rect.offsetTop;
        left = x - left;
        tp = y - tp;
  
        this.onmousemove = function (e) {
        
          x = e.pageX;
          y = e.pageY;
          rect.style.top = y - tp + "px";
          rect.style.left = x - left + "px";
  
        }
  
      }
      
      document.onmouseup = function () {
  
        rect.style.cursor = "auto";
        document.onmousedown = function () {}
        document.onmousemove = function () {}
  
      }

    });

  }//End drag 

});//End el View

/*-------------Html View---------------*/

var BodyView = Backbone.View.extend({
 
  el: 'html',
    
  events: {

    'mousedown': 'foo',
    'mouseup': 'finish' 

  },

  finish: function () {
     
     lock = 1; 
     rectangle.drag();

  },

  foo: function (e) {
    
    $('.item').on('mousedown', function  () {lock = 1});
      
      if(!lock) {
        counter++;
        var div = document.createElement('div');
        div.className = 'item rect_' + counter;
        $('body').append(div);
        this.start(e);
      }
      
  },

  start: function (e) {
    
    var evt = window.event || e;
    var rectStyle = document.getElementsByClassName('rect_' + counter)[0];
    x = evt.clientX;
    y = evt.clientY;
    rectStyle.style.position = 'absolute';
    rectStyle.style.width = 0;
    rectStyle.style.height = 0;
    rectStyle.style.left = x + "px";
    rectStyle.style.top = y + "px"; 
      
    document.onmousemove = function (e) {
      
      var evt = window.event || e;
      rectStyle.style.width = evt.clientX - x + "px";
      rectStyle.style.height = evt.clientY - y + "px";

    } 

    document.onmouseup = function (e) {
      var evt = window.event || e;
      rectStyle.style.width = evt.clientX - x + "px";
      rectStyle.style.height = evt.clientY - y + "px";

    /*------------Here end drawing------------*/

      document.onmousemove = function (arg) {
        arg.preventDefault;
      }; 
      document.onmousedown = function (arg) {
        arg.preventDefault;
      }; 
      document.onmouseup = function (arg) {
        arg.preventDefault;
      };
    }

  }//End start
  
});//End Html View

var but = new BodyView();
var rectangle = new ModView();

}//End window.onload

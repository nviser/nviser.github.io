
        $(function () {
            var ring;
           $('.menu').click(function () {
                if(ring){
                    ring = false;
                } else {
                    ring = true;
                }
                if (ring) {
                    $('.menu_expand').css('display', 'block');
                } else {
                    $('.menu_expand').css('display', 'none');
                }
                $(this).toggleClass('open');
           });
        });
  
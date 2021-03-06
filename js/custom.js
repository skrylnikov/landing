
// PRELOADER JS
$(window).load(function(){
    $('.preloader').fadeOut(500); // set duration in brackets    
});


// jQuery to collapse the navbar on scroll //
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});


/* HTML document is loaded. DOM is ready. 
-------------------------------------------*/

$(function(){

  // ------- WOW ANIMATED ------ //
  wow = new WOW(
  {
    mobile: false
  });
  wow.init();


  // HIDE MOBILE MENU AFTER CLIKING ON A LINK
  $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });


  // NIVO LIGHTBOX
  $('.iso-box-section a').nivoLightbox({
        effect: 'fadeScale'
    });


  // HOME BACKGROUND SLIDESHOW
/*
  $(function(){
    jQuery(document).ready(function() {
    $('#home').backstretch([
       //"images/home-bg-slideshow1.jpg",
       "images/IMG_2520.jpg"
        ],  {duration: 2000, fade: 1000, alignY:top});
    });
  })*/

});




function clickedHome(){


    swal({
        title: '',
        showCloseButton: true,
        html:
        '<h3>Введите имя</h3>' +
        '<input type="text" id="name" class="swal2-input">' +
        '<h3>Введите email*</h3>' +
        '<input type="email" id="email" class="swal2-input">' +
        '<h3>Опишите проблему</h3>' +
        '<textarea id="problem" class="swal2-textarea">',
        preConfirm: function () {


            return new Promise(function (resolve, reject) {


                setTimeout(function() {
                    var email = $('#email').val();
                    if (~email.indexOf('.') && ~email.indexOf('@') && email.length-email.indexOf('@')>3 ) {
                        resolve([
                            $('#name').val(),
                            $('#email').val(),
                            $('#problem').val()
                        ])
                    } else {
                        reject('Введите действительный email')
                    }
                }, 200)



            })
        },
        allowOutsideClick: true,
        confirmButtonText: 'Получить решение',
        onOpen: function () {
            $('#swal-input1').focus()
        }
    }).then(function (result) {
        swal(
            'Отправлено',
            '',
            'success'
        )
        data={
            Name:result[0],
            email:result[1],
            Problem:result[2]
        };
        get(data);
    }).catch(swal.noop)


/*
    //////////////
    swal.setDefaults({
        input: 'text',
        confirmButtonText: 'Далее',
        cancelButtonText:'Отмена',
        showCancelButton: true,
        animation: false,
        progressSteps: ['1', '2', '3']


    });

    var steps = [
        {
            title:'Введите ваше имя'
        },
        {
            title:'Введите ваш email'
        },
        {
            title: 'Опишите проблему',
            input: 'textarea',
            confirmButtonText:'Получить решение',
            showLoaderOnConfirm: true
        }
    ];

    swal.queue(steps).then(function (result) {
        swal.resetDefaults();

        data={
            Name:result[0],
            email:result[1],
            Problem:result[2]
        };
        get(data);

        swal(
            'Good job!',
            'You clicked the button!',
            'success'
        )
    }, function () {
        swal.resetDefaults()
    })*/
}



function clickedWork(text, problem){


    swal({
        title: 'Введите ваш email',
        input: 'text',
        showCloseButton: true,
        confirmButtonText:text,
        preConfirm: function (email) {
            return new Promise(function (resolve, reject) {
                setTimeout(function() {
                    if (~email.indexOf('.') && ~email.indexOf('@') && email.length-email.indexOf('@')>3 ) {
                        resolve()

                    }
                    else reject('Введите действительный email')

                }, 100)
            })
        },
        allowOutsideClick: true
    })
    .then(function (email) {
        data={
            Name:'',
            email:email,
            Problem:problem
        };
        get(data);
        swal({
            type: 'success',
            html: 'Отправлено '
        })

    });




    /**/
    /*
    swal.setDefaults({
        input: 'text',
        confirmButtonText: 'Далее',
        cancelButtonText:'Отмена',
        showCancelButton: true,
        animation: false,
        progressSteps: ['1', '2']


    });

    var steps = [
        {
            title:'Введите ваше имя'
        },
        {
            title:'Введите ваш email',
            confirmButtonText:text
        }
    ];

    swal.queue(steps).then(function (result) {
        swal.resetDefaults();

        data={
            Name:result[0],
            email:result[1],
            Problem:problem
        };
        get(data);

        swal(
            'Отправлено',
            '',
            'success'
        )
    }, function () {
        swal.resetDefaults()
    })*/
}

function get(data) {
    var uri='https://lending-advokat.azurewebsites.net/';
    var url=uri+'api/values/';
    fetch(url+JSON.stringify(data), {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/x-www-form-urlencoded, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });
}
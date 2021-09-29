'use strict'


$(document).ready(function () {
    $.get({
        url: `/reset`
        }).done(result => {
        let name1 = result.data.name1;
        let name2 = result.data.name2;
        let name3 = result.data.name3;
        setQuestion(name1, name2, name3);
        })
    $.get({
        url: `/getuser`
        }).done(result => {
            let name = result.data.username;
            if(name){
                $('#name').find('a').text("Your name: "+name);
            }else{
                $('#name').find('a').text("Your name: Not set yet")
            }
        })
});

async function setQuestion(name1, name2, name3) {
    
    $('#questions').find('.slot1').each(function () {
        $(this).attr("value", name1);
        $(this).text(name1);
    });
    $('#questions').find('.slot2').each(function () {
        $(this).attr("value", name2);
        $(this).text(name2);
    });
    $('#questions').find('.slot3').each(function () {
        $(this).attr("value", name3);
        $(this).text(name3);
    });
}

function sub(){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/" ,
        data: $('#questions').serialize(),
        success: function (result) {
            console.log(result);
            if (result.status == 200) {
                let actual = result.data;
                $('#questions').find('select').each(function(){
                    let item = actual.shift();
                    if(item){
                        $(this).parent().parent().find(".actual").text(item);
                    }
                    if(item == $(this).find(':selected').text()){
                        $(this).parent().parent().find(".result").text("Correct");
                    }
                    else{
                        $(this).parent().parent().find(".result").text("InCorrect");
                    }
                    
                });
            }
        },
        error : function() {}
    });
    return false;
}

function setname(){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/setname" ,
        data: $('#name').serialize(),
        success: function (result) {
            console.log(result);
            if (result.status == 200) {
                window.location.reload();
            }
        },
        error : function() {}
    });
    return false;
}

function resetQuestion(){
    $.get({
        url: `/reset`
      }).done(result => {
        let name1 = result.data.name1;
        let name2 = result.data.name2;
        let name3 = result.data.name3;
        setQuestion(name1, name2, name3);
      });
}
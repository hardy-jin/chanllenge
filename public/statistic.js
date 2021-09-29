$(document).ready(function () {
    $.get({
        url: `/statistic_data`
        }).done(result => {
            let totalgame = result.data.totalgame;
            let totalcorrect = result.data.totalcorrect;
            let totalwin = result.data.totalwin;
            setStatistic(totalgame, totalcorrect, totalwin);
        });
    $.get({
        url: `/getuser`
        }).done(result => {
            let name = result.data.username;
            if(name){
                $('#name').text("Your name: "+name);
            }else{
                $('#name').text("Set your name to store/view statistic")
            }
        });
});

async function setStatistic(totalgame, totalcorrect, totalwin){
    $('#totalgame').text(totalgame); 
    $('#totalcorrect').text(totalcorrect);
    $('#totalwin').text(totalwin);
    $('#totalguessed').text(totalgame*3);
    $('#correctrate').text((totalcorrect/(totalgame*3)).toFixed(4)*100+"%");
    $('#winrate').text((totalwin/totalgame).toFixed(4)*100+"%");
}
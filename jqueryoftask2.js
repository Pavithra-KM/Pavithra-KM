$(document).ready(function(){
    $("#myBtn").click(function(){
        var str = $("#myInput").val();
        $('p').text(str.split('').sort().join(''));  
    });
});


$(document).ready(function(){
    $("#btn").click(function(){
        var str = $("#myTextArea").text();
        $("#myDiv").text(str.split('').reverse().join(''));
    });
});

$(document).ready(function(){
    $("#button").click(function(){
        var arr = ["a","b","c","d","e","f","g","h","i","j","k"];
            var res = $("#myInput1").val();
        $("#myDiv1").text(arr[res]);
    });
});

$(document).ready(function(){
    for(var i=1;i<=100;i++){
        if(i%3==0 || i%5==0){
            $("#myDiv2").append(" "+ i);
        }
    }
});
$(document).ready(function(){
    var count=0;
    var total=0;
    for(var i=1;i<=100;i++)
    {
        if(i%5==0)
        {
            $("#myDiv3").append(" "+ i);
            count++;
            var total = total+(i++);
        }
    }
    $("#myDiv4").text("count of divisible by 5 :"+ count);
    $("#myDiv5").text("Sum of those numbers :"+(total));
});

$("#selected").change(function(){
    var clr = document.getElementById("selected").value;
    $("i").css("color",clr);
});

$(document).ready(function(){
    $.getJSON("emp.json",function(data){
        var emp_data = '';
        $.each(data, function(key, value){
            emp_data += '<tr>';
            emp_data += '<td>'+value.name+'</td>';
            emp_data += '<td>'+value.age+'</td>';
            emp_data += '<td>'+value.phone+'</td>';
            emp_data += '<td>'+value.address+'</td>';
            emp_data += '</tr>';
        });
        $('#myTable').append(emp_data);
    });
});

$(document).ready(function(){
        $("#selected").on('change',function(){
            var value = $(this).val();
            $("#tbody tr").filter(function(){
                $(this).toggle($(this).text(value));
            });
        });
});

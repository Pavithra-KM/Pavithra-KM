//To create datatable with aocolumns
$(document).ready( function() {
  var table = $('#myTable').dataTable( {
    "sAjaxSource": "/skillsdata",
    "aoColumns": [
      { "mData": "skill" },
      { "mData": "category" },
      { "mData": "subcategory" },
    ],
    "aoColumnDefs": [
      {
          "mRender": function ( data, type, row ) {
              return data +' '+ row[3];
          },
          "aTargets": [ -1 ]
      },
    ]
  });
});

//To get JSON Data into table
// $(document).ready(function(){
//     var tableData = [];
//     $.ajax({
//         type:'get',
//         url:'/skillsdata',
//         success: function (result) {
//             tableData = result.data
//             buildTable(tableData)
//         }
//     })
    
//     function buildTable(data){
//         var table = document.getElementById('tbody');

//         for(var i=0;i < data.length; i++){
//             var row = `<tr>
//                         <td>${data[i].skill}</td>
//                         <td>${data[i].category}</td>
//                         <td>${data[i].subcategory}</td>
//                        </tr>`
//             table.innerHTML += row;
//         }
//     }
// })

//Pie Chart
// google.charts.load('current', {packages: ['corechart']});
// google.charts.setOnLoadCallback(drawChart);
  
// function drawChart() {
//     // Define the chart to be drawn.
//     var data = new google.visualization.DataTable();
//     data.addColumn('string', 'Element');
//     data.addColumn('number', 'Percentage');
//     data.addRows([
//         ['skill', 0.20],
//         ['category', 0.21],
//         ['subcategory', 0.59]
//     ]);
  
//     // Instantiate and draw the chart.
//     var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
//     chart.draw(data, null);
// } 

//Donut Chart
// google.charts.load('current', {packages: ['corechart']});
// google.charts.setOnLoadCallback(drawChart);
  
// function drawChart() {
//     // Define the chart to be drawn.
//     var data = new google.visualization.DataTable();
//     data.addColumn('string', 'Element');
//     data.addColumn('number', 'Percentage');
//     data.addRows([
//         ['skill', 0.20],
//         ['category', 0.21],
//         ['subcategory', 0.59]
//     ]);
//     var options = {
//         title: 'Skills Data',
//         pieHole: 0.4,
//       };

//       var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
//       chart.draw(data, options);
// }

//Bar Graph
// google.charts.load('current', {'packages':['bar']});
// google.charts.setOnLoadCallback(drawChart);

// function drawChart() {
//     var data = google.visualization.arrayToDataTable([
//         ['skill', 1000, 400, 200],
//         ['category', 1170, 460, 250],
//         ['subcategory', 660, 1120, 300],
//     ]);

//     var options = {
//         chart: {
//             title: 'Skills Data',
//         },
//         bars: 'horizontal' // Required for Material Bar Charts.
//     };

//     var chart = new google.charts.Bar(document.getElementById('barchart_material'));

//     chart.draw(data, google.charts.Bar.convertOptions(options));
// }




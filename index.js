var userList = [];
var mainSchema = [
    {
        "reportDate": "",
        "createdAt": "",
        "updatedAt": "",
        "company": {
            "created": 20,
            "createdCompanyID": []
        },
        "clients": {
            "created": 9,
            "createdClientID": []
        },
        "users": {
            "created": 21,
            "createdUserID": [],
            "deleted": 0,
            "deletedUserID": []
        },
        "campaigns": {
            "created": 6,
            "createdCampaigns": []
        },
        "resumes": {
            "created": 120,
            "createdResumes": []
        },
        "interviews": {
            "totalScheduled": 60,
            "totalAttended": 0,
            "announcement": {"scheduled": 0, "attended": 0, "interviewID": "", "roundNumber": 0, "roundName": ""},
            "assessment": {"scheduled": 0, "attended": 0, "interviewID": "", "roundNumber": 0, "roundName": ""},
            "videoRound": {"scheduled": 0, "attended": 0, "interviewID": "", "roundNumber": 0, "roundName": ""},
            "inPersonRound": {"scheduled": 0, "attended": 0, "interviewID": "", "roundNumber": 0, "roundName": ""}
            }
        }
];
//Pass json data to Database
$(document).ready(function(){
    printCounts()
    $.ajax({
        type: 'post',
        url: '/passData',
        contentType: 'application/json',
        data: JSON.stringify(mainSchema),
        dataType: 'json',
        success: function(result){
            console.log(result)
        },
        error: function(error){
            console.log(error)
        },
    })
})

function printCounts(){
    for(var i in mainSchema){
        console.log(mainSchema[i])
    }
    document.getElementById('companyCount').innerHTML = mainSchema[i].company.created;
    document.getElementById('clientCount').innerHTML = mainSchema[i].clients.created;
    document.getElementById('usersCount').innerHTML = mainSchema[i].users.created;
    document.getElementById('campaignsCount').innerHTML = mainSchema[i].campaigns.created;
    document.getElementById('resumesCount').innerHTML = mainSchema[i].resumes.created;
    document.getElementById('interviewsCount').innerHTML = mainSchema[i].interviews.totalScheduled;
};

// function getData(){
//     var tableData = "";
//     $.ajax({
//         type:'get',
//         url:'/getTable',
//         success: function (result) {
//             console.log(result);
//             userList = result;
//             result.forEach(function(dt){
//                 tableData += '<tr>'+
//                                 '<td>'+dt.reportDate+'</td>'+
//                                 '<td>'+dt.createdAt+'</td>'+
//                                 '<td>'+dt.updatedAt+'</td>'+
//                             +'</tr>';
//             })
//             if(userList != ""){
//                 $('#tbody').html(tableData);
//                 console.log(tableData)
//             }
//             else{
//                  document.getElementById('tbody').innerHTML = 'No Data Available';
//             }
//         },
//         error: function(err){
//             console.log(err);
//         }
//     })
// }

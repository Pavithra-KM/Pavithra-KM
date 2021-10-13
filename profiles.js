var resumes = [];

$(document).ready(function(){
    $.ajax({
        url: "/getUpdatedResumeFromDB",
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function(updatedData) {
            resumes = updatedData
            console.log(resumes);
            createChart()
            getUpdatedSchema()
        },
        error: function(err){
            console.log(err)
        }
    });
})

//To create datatable with aocolumns
function getUpdatedSchema(){
    
    var table = $('#myTable').dataTable( {
        "aaData": resumes,
        "aoColumnDefs": [
            {
                "aTargets": [0],
                "mData": function(source){
                    return source
                },
                "mRender": function (data) {
                    let resumeId = data._id;
                    let nameText = data.resume.profile.fullName
                    if(data.resume && data.resume.profile && data.resume.profile.fullName){
                        return `<a href="/editResume?resumeId=${resumeId}">${nameText}</a>`;
                    }else{
                        return 'Name is not present'
                    }
                }
            },
            {
                "aTargets": [1],
                "mData": function(source){
                    return source
                },
                "mRender": function (data) {
                    if(data.resume.profile.emails){
                        let emailText = "";
                        for(let i=0;i<data.resume.profile.emails.length;i++){
                            emailText += data.resume.profile.emails[i].text+"  ";
                        }
                        return emailText
                    }else{
                       return 'Email is not Present'
                    }
                    
                }
            },
            {
                "aTargets": [2],
                "mData": function(source){
                    return source
                },
                "mRender": function (data) {
                    if(data.resume.profile.phones){
                        let phoneText = "";
                        for(var i=0;i<data.resume.profile.phones.length;i++){
                            phoneText += data.resume.profile.phones[i].text + "  "
                        }   
                        return phoneText      
                    }else{
                        return 'Number is not Present'
                    }
                }
            },
            {
                "aTargets": [3],
                "mData": function(source){
                    return source
                },
                "mRender": function (data) {
                    if(data.resume.professionalExperience){
                        for(let i=0;i<data.resume.professionalExperience.length;i++){
                            return data.resume.professionalExperience[i].jobTitle.text
                        }
                    }else{
                        return 'Job title is not present'
                    }
                }
            },
            {
                "aTargets": [4],
                "mData": function(source){
                    return source
                },
                "mRender": function (data) {
                    if(data.resume.profile.locations){
                        //for(let i=0;i<data.resume.profile.locations.length;i++){
                            return data.resume.profile.locations.text
                        //}
                    }else{
                        return 'Location is not present'
                    }
                }
            },
            {
                "aTargets": [5],
                "mData": function(source){
                    return source
                },
                "mRender": function (data) {
                    var date = new Date();
                    if(data.createdAt == ''){
                        date = data.createdAt
                    }
                    return date 
                }
            },
        ]
    });
}

function createChart() {
    
    //Location Pie Chart
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    
    locationResult = resumes.reduce(function (r, a) {
        r[a.resume.profile.locations.text] = r[a.resume.profile.locations.text] || [];
        r[a.resume.profile.locations.text].push(a);
        return r;
    }, Object.create(null));
    //console.log(locationResult);

    function drawChart() {
        var dataArray = [['location', 'count']];  
        Object.keys(locationResult).forEach(x => {
            let location = [];
            location.push(x);
            location.push(locationResult[x].length)
            dataArray.push(location)
        })
        var data = google.visualization.arrayToDataTable(dataArray);

      var options = {
        title: 'Location'
      };

      var chart = new google.visualization.PieChart(document.getElementById('locationPieChart'));

      chart.draw(data, options);
    } 

    //Skills Pie Chart
    google.charts.setOnLoadCallback(drawSkillChart);

    var skills = [];
    for(let i=0;i<resumes.length;i++){
        resumes[i].resume.professionalQualification.skills.map(x=>x.text).forEach(x => {skills.push(x)} )
    }
    var skillsResult = _.groupBy(skills);
    console.log(skillsResult);
    
    var dataArray = [['skills', 'count']];  
    Object.keys(skillsResult).forEach(x => {
        let temp = [];
        temp.push(x);
        temp.push(skillsResult[x].length)
        dataArray.push(temp)
    })    
    function drawSkillChart() {
        var data = google.visualization.arrayToDataTable(dataArray);
        var options = {
            title: 'Skills'
        } ;
        var chart = new google.visualization.PieChart(document.getElementById('skillsPieChart'));

        chart.draw(data, options);
    }        
   
    //Job Title Bar Chart
    google.charts.load('current', {'packages':['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawJobTitleStuff);

    jobTitleResult = resumes.reduce(function (r, a) {
        r[a.resume.professionalExperience[0].jobTitle.text] = r[a.resume.professionalExperience[0].jobTitle.text] || [];
        r[a.resume.professionalExperience[0].jobTitle.text].push(a);
        return r;
    }, Object.create(null));
    console.log(jobTitleResult);
    
    function drawJobTitleStuff() {
        var dataArray = [['jobTitle', 'count']];  
        Object.keys(jobTitleResult).forEach(x => {
            let temp = [];
            temp.push(x);
            temp.push(jobTitleResult[x].length)
            dataArray.push(temp)
        })
        var data = new google.visualization.arrayToDataTable(dataArray);

        var options = {
          title: 'Job Title',
          width: 500,
          legend: { position: 'none' },
          chart: { title: 'Job Title' },
          bars: 'vertical', // Required for Material Bar Charts.
          axes: {
            x: {
              0: { side: 'left', label: 'Percentage'} // Top x-axis.
            }
          },
          bar: { groupWidth: "10%" }
        };

        var chart = new google.charts.Bar(document.getElementById('barChart'));
        chart.draw(data, options);
      };
}

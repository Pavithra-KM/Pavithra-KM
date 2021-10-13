var resumeDetails = [];
var resumeId;
var selectedId;

//Get updated resume from db based on id
$(document).ready(function(){
    getResume()
})

function getResume() {
    $.ajax({
        url: "/getUpdatedResumeBasedOnId?resumeId="+id,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            console.log(data);
            resumeDetails = data;
            fillValuesInEditForm(data._id)
            resumeId = data._id
        },
        error: function(err){
            console.log(err)
        }
    });    
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var queryString = 'resumeId',
id = getUrlParameter(queryString);

function fillValuesInEditForm(rid){
    let resume = resumeDetails
    selectedId = rid
    
    //Profile Edit
    $('#firstName').val(resume.resume.profile.firstName)
    $('#middleName').val(resume.resume.profile.middleName)
    $('#lastName').val(resume.resume.profile.lastName)
    for(let i=0;i<resumeDetails.resume.profile.emails.length;i++){
        if(i>0){
            $('#addEmail').click()
        }
        $('#emails'+i).val(resume.resume.profile.emails[i].text)
    }
    for(let i=0;i<(resumeDetails.resume.profile.phones).length;i++){
        if(i>0){
            $('#addNumber').click()
        }
        $('#numbers'+i).val(resume.resume.profile.phones[i].text)
    }
    $('#location').val(resume.resume.profile.locations.text)

    //Objective Edit
    $('#objectiveInput').val(resume.resume.professionalSummary.objective)

    //Summary Edit
    $('#summaryInput').val(resume.resume.professionalSummary.summary)

    //Skills Edit
    let mainSkills = resume.resume.professionalQualification.skills.map(x=>x.text)
    mainSkills.forEach(x=>$('#mainSkills0').tagEditor('addTag', x))
    
    //Education Edit
    for(let i=0;i<resumeDetails.resume.professionalQualification.education.length;i++){
        if(i>0){
            $('#educationAddIcon').click()
        }
        $('#degreeInput'+i).val(resume.resume.professionalQualification.education[i].degree.text)
        let majorTags = resumeDetails.resume.professionalQualification.education[i].major.map(x=>x.text)
        $('#majorInput'+i).tagEditor('destroy');
        $('#majorInput'+i).val(majorTags.join(','))
        $('#majorInput'+i).tagEditor()
        $('#campusInput'+i).val(resume.resume.professionalQualification.education[i].campus.text)
        $('#universityInput'+i).val(resume.resume.professionalQualification.education[i].university.text)
        $('#locationInput'+i).val(resume.resume.professionalQualification.education[i].location.text)
        $('#marksInput'+i).val(resume.resume.professionalQualification.education[i].merit.percentage)
        $('#startDate'+i).val(resume.resume.professionalQualification.education[i].startDate.text)
        $('#endDate'+i).val(resume.resume.professionalQualification.education[i].endDate.text)
    }

    //Experience Edit
    for(let i=0;i<(resumeDetails.resume.professionalExperience).length;i++){
        if(i>0){
            $('#experienceAddIcon').click()
        }
        $('#companyInput'+i).val(resume.resume.professionalExperience[i].company.text)
        $('#jobInput'+i).val(resume.resume.professionalExperience[i].jobTitle.text)
        $('#locationsInput'+i).val(resume.resume.professionalExperience[i].location.text)
        $('#start-dateInput'+i).val(resume.resume.professionalExperience[i].startDate.text)
        $('#end-dateInput'+i).val(resume.resume.professionalExperience[i].endDate.text)
        $('#descriptionInput'+i).val(resume.resume.professionalExperience[i].description)
        let experienceSkill = resumeDetails.resume.professionalExperience[i].skills.map(x=>x.text)
        $('#experienceSkills'+i).tagEditor('destroy');
        $('#experienceSkills'+i).val(experienceSkill.join(','))
        $('#experienceSkills'+i).tagEditor()
    }

    //Edit Certificates
    for(let i=0;i<(resumeDetails.resume.professionalQualification.certifications).length;i++){
        if(i>0){
            $('#certificateAddIcon').click()
        }
        $('#courseInput'+i).val(resume.resume.professionalQualification.certifications[i].course.text)
        $('#campusinput'+i).val(resume.resume.professionalQualification.certifications[i].campus.text)
        $('#marksinput'+i).val(resume.resume.professionalQualification.certifications[i].merit.percentage)
        $('#locationinput'+i).val(resume.resume.professionalQualification.certifications[i].location.text)
        $('#startdate'+i).val(resume.resume.professionalQualification.certifications[i].startDate.text)
        $('#enddate'+i).val(resume.resume.professionalQualification.certifications[i].endDate.text)
        $('#expiredate'+i).val(resume.resume.professionalQualification.certifications[i].expiryDate.text)
    }

    //Edit Licences
    for(let i=0;i<(resumeDetails.resume.professionalQualification.licences).length;i++){
        if(i>0){
            $('#licenceAddIcon').click()
        }
        $('#nameInput'+i).val(resume.resume.professionalQualification.licences[i].text)
        $('#issuedByInput'+i).val(resume.resume.professionalQualification.licences[i].issuedBy)
        $('#issuedOnInput'+i).val(resume.resume.professionalQualification.licences[i].issuedOn.text)
        $('#expireDateInput'+i).val(resume.resume.professionalQualification.licences[i].expiryDate.text)
    }
    
}

function updateResume(){

    //Update Name
    resumeDetails.resume.profile.firstName= $('#firstName').val(),
    resumeDetails.resume.profile.middleName= $('#middleName').val(),
    resumeDetails.resume.profile.lastName = $('#lastName').val(),
    resumeDetails.resume.profile.fullName = $('#firstName').val() +" "+$('#middleName').val() +" "+ $('#lastName').val()
    

    //Update Emails
    let emailsLength = $('.email').length;
    for(var i=0;i<emailsLength;i++){
        if($('#emails'+i).val()){
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            resumeDetails.resume.profile.emails[i].text = $('#emails'+i).val();
            resumeDetails.resume.profile.emails[i].email = $('#emails'+i).val();
        }
    }

    //Update Numbers
    let phonesLength = $('.number').length;
    for(var i=0;i<phonesLength;i++){
        if($('#numbers'+i).val()){
            var re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
            resumeDetails.resume.profile.phones[i].text = $('#numbers'+i).val();
            resumeDetails.resume.profile.phones[i].phoneNumberOnly = $('#numbers'+i).val();
        }
    } 
    
    //Update Location
    for(var i in resumeDetails.resume.profile.locations){
        resumeDetails.resume.profile.locations.text = $('#location').val();
    }

    //Update Objective
    resumeDetails.resume.professionalSummary.objective = $('#objectiveInput').val();

    //Update Summary
    resumeDetails.resume.professionalSummary.summary = $('#summaryInput').val();

    //Update Skills
    let skillsLength = $('.mainSkills').length
        for(var i=0;i<skillsLength;i++){
            resumeDetails.resume.professionalQualification.skills.push(jQuery.extend(true, {}, resumeMainSchema.schema.listSchema.skills));
            if($('#mainSkills0').val()){
                let skill = $('#mainSkills0').val();
                let splitSkills = skill.split(',');
                resumeDetails.resume.professionalQualification.skills[i].text = splitSkills
            } 
        } 

    //Update Education
    let educationLength = $('.educationClass').length;
        for(var i=0;i<educationLength;i++){
            if($('#degreeInput'+i).val()){
                resumeDetails.resume.professionalQualification.education[i].degree.text = $('#degreeInput'+i).val();
            }
            if($('#majorInput'+i).val()){
                let skill = $('#majorInput'+i).val();
                let splitSkills = skill.split(',');
                for(var j=0;j<splitSkills.length;j++){
                    resumeDetails.resume.professionalQualification.education[i].major.push(jQuery.extend(true, {}, resumeMainSchema.schema.listSchema.educationMajor)); 
                    resumeDetails.resume.professionalQualification.education[i].major[j].text = splitSkills[j];
                }
                // let majorTags = resumeDetails.resume.professionalQualification.education[i].major.map(x=>x.text)
                //     console.log(majorTags);
                $('#majorInput'+i).tagEditor('destroy');
                $('#majorInput'+i).val(skill.join(','))
                $('#majorInput'+i).tagEditor()
            }
            if($('#campusInput'+i).val()){
                resumeDetails.resume.professionalQualification.education[i].campus.text = $('#campusInput'+i).val();
            }
            if($('#universityInput' +i).val()){
                resumeDetails.resume.professionalQualification.education[i].university.text = $('#universityInput'+i).val();
            }
            if($('#locationInput' +i).val()){
                resumeDetails.resume.professionalQualification.education[i].location.text = $('#locationInput' +i).val();
            }
            if($('#marksInput'+i).val()){
                resumeDetails.resume.professionalQualification.education[i].merit.percentage = $('#marksInput'+i).val();
                resumeDetails.resume.professionalQualification.education[i].merit.GPA = $('#marksInput'+i).val();
            }
            if($('#startDate'+i).val()){
                resumeDetails.resume.professionalQualification.education[i].startDate.text = $('#startDate'+i).val();
                resumeDetails.resume.professionalQualification.education[i].startDate.standard = $('#startDate'+i).val();
            }
            if($('#endDate'+i).val()){
                resumeDetails.resume.professionalQualification.education[i].endDate.text = $('#endDate'+i).val();
                resumeDetails.resume.professionalQualification.education[i].endDate.standard = $('#endDate'+i).val();
            }
        }

        //Update Experience
        let experienceLength = $('.experienceClass').length;
        for(var i=0;i<experienceLength;i++){
            resumeDetails.resume.professionalExperience.push(jQuery.extend(true, {}, resumeMainSchema.schema.listSchema.professionalExperience));
            if($('#companyInput'+i).val()){
                resumeDetails.resume.professionalExperience[i].company.text = $('#companyInput'+i).val();
            }
            if($('#jobInput'+i).val()){
                resumeDetails.resume.professionalExperience[i].jobTitle.text = $('#jobInput'+i).val();
            }
            if($('#locationsInput'+i).val()){
                resumeDetails.resume.professionalExperience[i].location.text = $('#locationsInput'+i).val();
            }
            if($('#start-dateInput'+i).val()){
                resumeDetails.resume.professionalExperience[i].startDate.text = $('#start-dateInput'+i).val();
                resumeDetails.resume.professionalExperience[i].startDate.standard = $('#start-dateInput' +i).val();
            }
            if($('#end-dateInput'+i).val()){
                resumeDetails.resume.professionalExperience[i].endDate.text = $('#end-dateInput'+i).val();
                resumeDetails.resume.professionalExperience[i].endDate.standard = $('#end-dateInput'+i).val();
            }
            if($('#descriptionInput'+i).val()){
                resumeDetails.resume.professionalExperience[i].description = $('#descriptionInput'+i).val();
            }
            if($('#experienceSkills'+i).val()){
                let skill = $('#experienceSkills'+i).val();
                let splitSkills = skill.split(',');
                for(var j=0;j<splitSkills.length;j++){
                    resumeDetails.resume.professionalExperience[i].skills[j].text = splitSkills[j];
                }
            }
            
        }

        //Update Certificates
        let certificatesLength = $('.certificatesClass').length;
        for(var i = 0;i < certificatesLength; i++){
            if($('#courseInput'+i).val()){
                resumeDetails.resume.professionalQualification.certifications[i].course.text = $('#courseInput'+i).val();
            }
            if($('#campusinput'+i).val()){
                resumeDetails.resume.professionalQualification.certifications[i].campus.text = $('#campusinput'+i).val();
            }
            if($('#marksinput'+i).val()){
                resumeDetails.resume.professionalQualification.certifications[i].merit.GPA = $('#marksinput'+i).val()/10;
                resumeDetails.resume.professionalQualification.certifications[i].merit.percentage = $('#marksinput'+i).val();
            }
            if($('#locationinput'+i).val()){
                resumeDetails.resume.professionalQualification.certifications[i].location.text = $('#locationinput'+i).val();
            }
            if($('#startdate'+i).val()){
                resumeDetails.resume.professionalQualification.certifications[i].startDate.text = $('#startdate'+i).val();
                resumeDetails.resume.professionalQualification.certifications[i].startDate.standard = $('#startdate'+i).val();
            }
            if($('#enddate'+i).val()){
                resumeDetails.resume.professionalQualification.certifications[i].endDate.text = $('#enddate'+i).val();
                resumeDetails.resume.professionalQualification.certifications[i].endDate.standard = $('#enddate'+i).val();
            }
            if($('#expiredate'+i).val()){
                resumeDetails.resume.professionalQualification.certifications[i].expiryDate.text = $('#expiredate'+i).val();
                resumeDetails.resume.professionalQualification.certifications[i].expiryDate.standard = $('#expiredate'+i).val();
            }
        }

        //Update Licences
        let licenceLength = $('.licenceClass').length;
        for(var i=0;i<licenceLength;i++){
            if($('#nameInput'+i).val()){
                resumeDetails.resume.professionalQualification.licences[i].text = $('#nameInput'+i).val()
            }
            if($('#issuedByInput'+i).val()){
                resumeDetails.resume.professionalQualification.licences[i].issuedBy = $('#issuedByInput'+i).val();
            }
            if($('#issuedOnInput'+i).val()){
                resumeDetails.resume.professionalQualification.licences[i].issuedOn.text = $('#issuedOnInput'+i).val();
                resumeDetails.resume.professionalQualification.licences[i].issuedOn.standard = $('#issuedOnInput'+i).val();
            }
            if($('#expireDateInput'+i).val()){
                resumeDetails.resume.professionalQualification.licences[i].expiryDate.text = $('#expireDateInput'+i).val();
                resumeDetails.resume.professionalQualification.licences[i].expiryDate.standard =  $('#expireDateInput'+i).val();
            }
        }
    
        let obj = {
            id : selectedId,
            resume : resumeDetails.resume
        }    
        $.ajax({
            url: '/updateResumeDetails',
            type: 'post',
            contentType : 'application/json',
            data: JSON.stringify(obj),
            dataType: 'json', 
            success: function(response) {
                console.log(response);
                getResume()
            },
            error: function(err){
                console.log(err);
            }
        })
}

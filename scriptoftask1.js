let btnSubmit = document.querySelector('button');
let table = document.querySelector('#tbl');

let fnameInput = document.querySelector('#fname');
let lnameInput = document.querySelector('#lname');
let phoneInput = document.querySelector('#phno');
let emailInput = document.querySelector('#eid');
let addrInput = document.querySelector('#addr');

btnSubmit.addEventListener('click',() => {
        let fname = fnameInput.value;
        let lname = lnameInput.value;
        let phone = phoneInput.value;
        let email = emailInput.value;
        let address = addrInput.value;

        let template = `<tr>
                         <td>${fname}</td>
                         <td>${lname}</td>
                         <td>${phone}</td>
                         <td>${email}</td>
                         <td>${address}</td>
                        </tr>`;
        table.innerHTML +=template;
});

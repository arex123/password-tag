

//call this function on submit
function isValidation(e) {
    console.log("inside isvalidation on submitting the form")
    let valid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    let psd = document.getElementById('reg_Password').value;
    console.log("hi " + psd + " " + valid.test(psd));
    if (!valid.test(psd)) {
        e.preventDefault()
        let passwordTagClass = new Passwordtag();
        passwordTagClass.passwordValidate();
        console.log('not ok,prevented from submitting');
    } else {
        console.log('ok for submition');
    }
}


class Passwordtag extends HTMLElement{
    constructor(){
        super();
        this.innerHTML=`
        <style>        
        #pasmessagewarning {     
        text-align: left;         
        color: #000;         
        position: relative;        
        padding-left: 0px;        
        } 
                  
        
        #pasmessagewarning p {        
        font-size: 12px;         
        margin: 0px 0px 0px;         
        } 
        
        
        .valid:before {         
        position: relative;        
        left: 0px;         
        content: "✔   ";         
        } 
           
        .invalid:before {        
        position: relative;         
        left: 0px;         
        content: "✖   ";         
        } 
        
        #StrengthDisp{         
        display: none;        
        padding-left: 0px;        
        } 
        
        p{        
        margin: 0px 0px 0px;        
        } 

    </style>

    <div id="form_psd_ele" class="form_div_t password">
        <input type="password" name="password" id="reg_Password" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$&]).{8,50}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required placeholder=" Password" />        
        <p id="StrengthDisp"></p>    
    </div>
    
        `
    }

    hide() {
        let msgdiv = document.getElementById('pasmessagewarning')
        let sttag = document.getElementById('StrengthDisp')
        sttag.style.display = "none"
        msgdiv.style.display = "none"
    }
    
    passwordValidate(){

        this.checkStrength();




         
        //getting all attributes of password-valid-tag
        let psdTagInDocument = document.querySelector('password-valid-tag');
        // console.log("password  tag in document: ",psdTagInDocument);
        let reqUpperCase = psdTagInDocument.getAttribute('U')==null?1:psdTagInDocument.getAttribute('U');
        let reqLowerCase = psdTagInDocument.getAttribute('L')==null?1:psdTagInDocument.getAttribute('L');
        let reqSpecial = psdTagInDocument.getAttribute('S')==null?1:psdTagInDocument.getAttribute('S');
        let reqNumbers = psdTagInDocument.getAttribute('N')==null?1:psdTagInDocument.getAttribute('N');

        let reqMin = psdTagInDocument.getAttribute('Min')==null?4:psdTagInDocument.getAttribute('Min')
        let reqMax = psdTagInDocument.getAttribute('Max')==null?50:psdTagInDocument.getAttribute('Max')




        let check = document.getElementById('pasmessagewarning')
        if (!check) {
            let messagediv = document.createElement('div')
            messagediv.id = 'pasmessagewarning'
            let msgHeading = document.createElement('p')
            msgHeading.innerHTML = "<b>Password should contain:<b>"
            messagediv.appendChild(msgHeading)
            //line break between the tags 
            let linebreak = document.createElement('br');
            messagediv.appendChild(linebreak);
            let p1 = document.createElement('p')
            p1.id = 'upper';
            p1.className = 'invalid'
            p1.innerHTML = '<b>'+reqUpperCase+' uppercase</b> letter'
            messagediv.appendChild(p1)
            let linebreak1 = document.createElement('br');
            messagediv.appendChild(linebreak1);
            let p2 = document.createElement('p')
            p2.id = 'lower';
            p2.className = 'invalid'
            p2.innerHTML = '<b>'+reqLowerCase+' lowercase</b> letter'
            messagediv.appendChild(p2)
            let linebreak3 = document.createElement('br');
            messagediv.appendChild(linebreak3);
            let p3 = document.createElement('p')
            p3.id = 'special';
            p3.className = 'invalid'
            p3.innerHTML = '<b>'+reqSpecial+' Special characters</b> '
            messagediv.appendChild(p3)
            let linebreak4 = document.createElement('br');
            messagediv.appendChild(linebreak4);
            let p4 = document.createElement('p')
            p4.id = 'numberpsdcheck';
            p4.className = 'invalid'
            p4.innerHTML ='<b>'+ reqNumbers+' number</b>'
            messagediv.appendChild(p4)
            let linebreak5 = document.createElement('br');
            messagediv.appendChild(linebreak5);
            let p5 = document.createElement('p')
            p5.id = 'length';
            p5.className = 'invalid'
            p5.innerHTML = 'Minimum <b>'+reqMin+' characters</b> and Maximum <b>'+reqMax+'<b>'
            messagediv.appendChild(p5)
            let parentPsdElement = document.getElementById('form_psd_ele')
            parentPsdElement.appendChild(messagediv)
        } else {
            let msgCont = document.getElementById('pasmessagewarning')
            msgCont.style.display = 'block'
            let sttag = document.getElementById('StrengthDisp')
            sttag.style.display = "block"
        }
    
        let passwordt = document.getElementById("reg_Password");//for finding attribute values
        //refer: https://www.w3schools.com/jsref/met_element_getattribute.asp

        let password = passwordt.value;
                
        let numOfUpperCase = (password.match(/[A-Z]/g) || []).length
        let numOdLowerCase = (password.match(/[a-z]/g) || []).length
        let numOfSpecial = (password.match(/[@#$*&]/g) || []).length
        let numOfNumbers = (password.match(/\d/g) || []).length

        

        let containsUpper = /[A-Z]/.test(password)
        if (!containsUpper || numOfUpperCase<reqUpperCase) {
            let upper = document.getElementById('upper')
            upper.classList.remove("valid")
            upper.classList.add("invalid")            
        } else {
            let upper = document.getElementById('upper')
            upper.classList.remove("invalid")
            upper.classList.add("valid")
        }
    
        let containsLower = /[a-z]/.test(password)
        if (!containsLower || numOdLowerCase<reqLowerCase) {
            let lower = document.getElementById('lower')
            lower.classList.remove("valid")
            lower.classList.add("invalid")
        } else {
            let lower = document.getElementById('lower')
            lower.classList.remove("invalid")
            lower.classList.add("valid")
        }
    
        let containsSpecial = containsSpecialChars(password);
        function containsSpecialChars(str) {
            const specialChars = /[@#$&*]/;
            return specialChars.test(str)
        }
    
        if (!containsSpecial || numOfSpecial<reqSpecial) {
            let special = document.getElementById('special')
            special.classList.remove("valid")
            special.classList.add("invalid")
        } else {
            let special = document.getElementById('special')
            special.classList.remove("invalid")
            special.classList.add("valid")
        }
    
        let containsNumber = /[0-9]/.test(password);
        if (!containsNumber || numOfNumbers<reqNumbers) {
            let number = document.getElementById('numberpsdcheck')
            number.classList.remove("valid")
            number.classList.add("invalid")
        } else {
            let number = document.getElementById('numberpsdcheck')
            number.classList.remove("invalid")
            number.classList.add("valid")
        }
    
        if (password.length < reqMin || password.length > reqMax) {
            let length = document.getElementById('length')
            length.classList.remove("valid")
            length.classList.add("invalid")
        } else {
            let length = document.getElementById('length')
            length.classList.remove("invalid")
            length.classList.add("valid")
        }
    

    }

    checkStrength() {
    let password = document.getElementById('reg_Password').value;
    let strengthBadge = document.getElementById('StrengthDisp')
    var matchedCase = new Array();
    matchedCase.push("[$@$!%*#?&]"); // Special Charector 
    matchedCase.push("[A-Z]"); // Uppercase Alpabates 
    matchedCase.push("[0-9]"); // Numbers 
    matchedCase.push("[a-z]"); // Lowercase Alphabates 
    // Check the conditions 

    var ctr = 0;
    for (var i = 0; i < matchedCase.length; i++) {
        if (new RegExp(matchedCase[i]).test(password)) {
            ctr++;
        }
    }
    // Display it 
    var strength = "";
    switch (ctr) {
        case 0:
        case 1:
        case 2:
            strength = 'Password strength is <b style="color:red">weak<b>';
            break;
        case 3:
            strength = 'Password strength is <b style="color:green">Medium<b>';
            break;
        case 4:
            strength = 'Password strength is <b style="color:blue">Strong<b>';
            break;
    }
    strengthBadge.style.display = 'block'
    strengthBadge.innerHTML = strength;
    } 

    connectedCallback(){
        document.querySelector('#reg_Password').addEventListener('input',()=>this.passwordValidate())
        document.querySelector('#reg_Password').addEventListener('blur',()=>this.hide())
    }
    
    disconnectedCallback(){
        // console.log('disconnected');
        // document.querySelector('#reg_Password').removeEventListener('input',()=>this.passwordValidate())
        // document.querySelector('#reg_Password').removeEventListener('blur',()=>this.hide())
    }



}

customElements.define('password-valid-tag',Passwordtag);
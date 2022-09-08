const template = document.createElement('template')
template.innerHTML=`
    <style> 
        #message {     
        text-align: left;         
        color: #000;         
        position: relative;        
        padding-left: 10px;        
        } 
                  
        
        #message p {        
        font-size: 13px;         
        margin: 0px 0px 0px;         
        } 
        
        
        .valid:before {         
        position: relative;        
        left: -10px;         
        content: "✔";         
        } 
           
        .invalid:before {        
        position: relative;         
        left: -10px;         
        content: "✖";         
        } 
        
        #StrengthDisp{         
        display: none;        
        padding-left: 10px;        
        } 
        
        p{        
        margin: 0px 0px 0px;        
        } 

        /*ADD CSS*/


        #reg_Password{
            height:20px;
            width:150px;
        }

    </style>


    <div id="form_psd_ele" class="form_div_t password">
        <input type="password" name="password" id="reg_Password" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required placeholder=" Password" />        
        <p id="StrengthDisp"></p>    
    </div>
    
`

class Password extends HTMLElement{
    
    constructor(){
        super();
        console.log('constructor called')
        
        this.attachShadow({mode:'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        
    }
    
    hide() {
        let msgdiv = this.shadowRoot.getElementById('message')
        let sttag = this.shadowRoot.getElementById('StrengthDisp')
        sttag.style.display = "none"
        msgdiv.style.display = "none"
    }




    isValidation(e) {
        console.log("inside isvalidation on submitting the form")
        let valid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
        let psd = this.shadowRoot.getElementById('reg_Password').value;
        console.log("hi " + psd + " " + valid.test(psd));
        if (!valid.test(psd)) {
            e.preventDefault()
            passwordValidate();
            console.log('prevented from submitting');
        } else {
            console.log('submiteed ');
        }
    }

    
    passwordValidate(){

        this.checkStrength();

        let value = this.shadowRoot.getElementById('reg_Password').value
        // console.log(value);

        // let elem = document.createElement('p')
        // elem.innerHTML = value;

        // let inputtag = this.shadowRoot.getElementById('form_psd_ele')
        // inputtag.appendChild(elem)



         
        //getting all attributes of password-valid-tag
        let psdTagInDocument = document.querySelector('password-valid-tag');
        // console.log("password  tag in document: ",psdTagInDocument);
        let reqUpperCase = psdTagInDocument.getAttribute('U')==null?1:psdTagInDocument.getAttribute('U');
        let reqLowerCase = psdTagInDocument.getAttribute('L')==null?1:psdTagInDocument.getAttribute('L');
        let reqSpecial = psdTagInDocument.getAttribute('S')==null?1:psdTagInDocument.getAttribute('S');
        let reqNumbers = psdTagInDocument.getAttribute('N')==null?1:psdTagInDocument.getAttribute('N');

        let reqMin = psdTagInDocument.getAttribute('Min')==null?4:psdTagInDocument.getAttribute('Min')
        let reqMax = psdTagInDocument.getAttribute('Max')==null?50:psdTagInDocument.getAttribute('Max')


       
        // console.log('request upper: '+reqUpperCase);
        // console.log('requested lower: '+reqLowerCase);
      



        let check = this.shadowRoot.getElementById('message')
        if (!check) {
            let messagediv = document.createElement('div')
            messagediv.id = 'message'
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
            p4.id = 'number';
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
            let parentPsdElement = this.shadowRoot.getElementById('form_psd_ele')
            parentPsdElement.appendChild(messagediv)
        } else {
            let msgCont = this.shadowRoot.getElementById('message')
            msgCont.style.display = 'block'
            let sttag = this.shadowRoot.getElementById('StrengthDisp')
            sttag.style.display = "block"
        }
    

        let password = this.shadowRoot.getElementById("reg_Password").value;
        
        let numOfUpperCase = (password.match(/[A-Z]/g) || []).length
        let numOdLowerCase = (password.match(/[a-z]/g) || []).length
        let numOfSpecial = (password.match(/[@#$*&]/g) || []).length
        let numOfNumbers = (password.match(/\d/g) || []).length
        
        // console.log('upper :',numOfUpperCase);
        // console.log('lower :',numOdLowerCase);
        // console.log('special :',numOfSpecial);
        // console.log('numbers :',numOfNumbers);


        let containsUpper = /[A-Z]/.test(password)
        if (containsUpper && numOfUpperCase>=reqUpperCase) {
            let upper = this.shadowRoot.getElementById('upper')
            upper.classList.remove("invalid")
            upper.classList.add("valid")
        } else {
            let upper = this.shadowRoot.getElementById('upper')
            upper.classList.remove("valid")
            upper.classList.add("invalid")            
        }
    
        let containsLower = /[a-z]/.test(password)
        if (containsLower && numOdLowerCase>=reqLowerCase) {
            let lower = this.shadowRoot.getElementById('lower')
            lower.classList.remove("invalid")
            lower.classList.add("valid")
        } else {
            let lower = this.shadowRoot.getElementById('lower')
            lower.classList.remove("valid")
            lower.classList.add("invalid")
        }
    
        let containsSpecial = containsSpecialChars(password);
        function containsSpecialChars(str) {
            const specialChars = /[@#$%&*]/;
            return specialChars.test(str)
        }
    
        if (containsSpecial && numOfSpecial>=reqSpecial) {
            let special = this.shadowRoot.getElementById('special')
            special.classList.remove("invalid")
            special.classList.add("valid")
        } else {
            let special = this.shadowRoot.getElementById('special')
            special.classList.remove("valid")
            special.classList.add("invalid")
        }
    
        let containsNumber = /\d/.test(password);
        if (containsNumber && numOfNumbers>=reqNumbers) {
            let number = this.shadowRoot.getElementById('number')
            number.classList.remove("invalid")
            number.classList.add("valid")
        } else {
            let number = this.shadowRoot.getElementById('number')
            number.classList.remove("valid")
            number.classList.add("invalid")
        }
    
        if (password.length >=reqMin && password.length < reqMax) {
            let length = this.shadowRoot.getElementById('length')
            length.classList.remove("invalid")
            length.classList.add("valid")
        } else {
            let length = this.shadowRoot.getElementById('length')
            length.classList.remove("valid")
            length.classList.add("invalid")
        }
    

    }



 checkStrength() {
    let password = this.shadowRoot.getElementById('reg_Password').value;
    let strengthBadge = this.shadowRoot.getElementById('StrengthDisp')
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
            strength = 'Password strength is <p style="color:red"><b>weak</b>';
            break;
        case 3:
            strength = 'Password strength is <p style="color:green"><b>Medium</b></p>';
            break;
        case 4:
            strength = 'Password strength is <p style="color:blue"><b>Strong</b></p>';
            break;
    }
    strengthBadge.style.display = 'block'
    strengthBadge.innerHTML = strength;
} 

    connectedCallback(){
        this.shadowRoot.querySelector('#reg_Password').addEventListener('input',()=>this.passwordValidate())
        this.shadowRoot.querySelector('#reg_Password').addEventListener('blur',()=>this.hide())
    }
}

customElements.define('password-valid-tag',Password);
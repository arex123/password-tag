# password-tag

  ## How to use password-valid-tag

- Add the tag in your code
- by default it takes 1 uppercase, 1 lowercase, 1 special, 1 number, mininimum 6 char and max 50 
- if you need to ask multiple of these char use attributes mentioned below
- Simply styles can be added in component's js page as well as in different styles page, **note** reg_Password is the name of inputs id 
- if using password-component.js(for independent css), css inside this template
- if using password-component-d.js(dependent css, add css in your code 

## Attributes

* upperCase: U
* lowerCase: L
* special: S
* numbers: N
* min-length: Min
* max-length: Max

#### Ex:
        <password-valid-tag U="2" L="3"> </password-valid-tag>  // this tag will take two uppercase and three lowercase characters

**Note:** In some case, in form while submitting add onSubmit attribute for calling isValidation(this) for 
confirming the validation, this case will arise when this tag will be added in html dynamically(from javascript code).


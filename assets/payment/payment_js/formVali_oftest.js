function start(){
    renderNameLogin();
    renderTextLogout();
}
start();
// Đối tượng `Validator`
function Validator(options) {
    var selectorRule = {};
    function getParent(element, selector) {
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }   
    }
    // Hàm thực hiện Validate
    function Validate(inputElement,rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;
        //Lấy ra các rule của selector 
        var elementRule = selectorRule[rule.selector];
        // Lặp qua từng rule của selectot mà ta onblur
        // nếu thỏa dk thì thoát 
        for(let i=0; i< elementRule.length;++i){
            switch(inputElement.type){
                case 'checkbox':
                case 'radio':
                    errorMessage = elementRule[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                    default:
                        errorMessage = elementRule[i](inputElement.value);
            }
            if(errorMessage)
                break;
        }
        if(errorMessage){
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        }
        else{
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        }
        return errorMessage;
    }
    // Lấy element Form cần Validate
    var formElement = document.querySelector(options.form);
    if(formElement){
        formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormValid = true;
        // Khi submit lặp qua từng rule và Validate
            options.rules.forEach(function(rule){
                var inputElement = document.querySelector(rule.selector)
                var isValid = Validate(inputElement, rule);
                if(isValid)
                isFormValid = false;
            })
            if(isFormValid){
                // Trường hợp submit với hành vi JS để callback API
                if(typeof options.onSubmit === 'function'){
                    var enableInput = formElement.querySelectorAll('[name]');
                    var formValue = Array.from(enableInput).reduce(function(values, input){
                        switch (input.type){
                            case 'radio':
                                if(input.matches(':checked')) 
                                    values[input.name]= input.value;
                                    break;
                            case 'checkbox':
                                if (!Array.isArray(values[input.name])) values[input.name] = []
                                if (input.matches(':checked')) values[input.name].push(input.value)
                                    break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default: 
                                values[input.name]= input.value;
                        }
                        return values;
                    },{})
                    options.onSubmit(formValue);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }
        // Lặp qua mỗi rule và xử lí (lắng nghe, blur, onsubmit,...)
        options.rules.forEach(function(rule){
            // Lưu lại các rules cho mỗi input
            if(Array.isArray(selectorRule[rule.selector])){
                selectorRule[rule.selector].push(rule.test)
            }
            else {
                selectorRule[rule.selector] = [rule.test];
            } 
            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function(inputElement){
                if(inputElement){
                    // Xử lí trường hợp blur khỏi input
                    inputElement.onblur = function(){
                        Validate(inputElement, rule);
                    }
                    // Xử lí trường hợp mỗi khi nhập
                    inputElement.oninput = function(){
                        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                        errorElement.innerText = '';
                        getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                    }
                }
            });
        });
    }
       
}

// Định nghĩa các rules
// Nguyên tắc chung khi return test
// Khi không có lỗi thì trả ra undefined còn không thì ngược lại
Validator.isRequired = function(selector,message) {
    return {
        selector: selector,
        test: function(value){
            return value ? undefined : message || 'Vui lòng nhập trường này!'
        }
    };
}   
Validator.isEmail = function(selector,message) {
    return {
        selector: selector,
        test: function(value){
            var regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
            return regex.test(value) ? undefined : message ||'Dữ liệu vừa nhập không phải là email'
        }
    };
}   
Validator.minLength  = function(selector, min,message) {
    return {
        selector: selector,
        test: function(value){
           return value.length >= 6 ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}   
Validator.checkPhone  = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value){
            var regex = /^[0-9\-\+]{9,15}$/;
            return regex.test(value) ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự và đúng số điện thoại`;
        }
    };
}   
Validator.isConfirm = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : message || 'Dữ liệu nhập vào không chính xác';
        }
    };
}   
// -----------Form 1---------------
document.querySelector('.form-validator #form-1').style.display = 'none';
Validator({
    form: '#form-1',
    formGroupSelector : ".form-group",
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#fullname','Vui lòng nhập tên đăng nhập của bạn'),
        Validator.isRequired("#email"),
        Validator.isEmail("#email"),
        Validator.isRequired('#phone','Vui lòng nhập số điện thoại của bạn'),
        Validator.checkPhone('#phone',10),
        // Validator.isRequired('#phone','Vui lòng nhập số điện thoại của bạn'),
        // Validator.checkPhone("#phone",10),
        // Validator.minLength("#password", 6),
        // Validator.isRequired("#password_confirm"),
        // Validator.isConfirm("#password_confirm", function(){
            //     return document.querySelector('#form-1 #password').value;
            // },'Mật khẩu nhập lại không chính xác')
        // Validator.isRequired('input[name="gender"]', 'Vui lòng chọn giới tính'),
        // Validator.isRequired('#province', 'Vui lòng chọn Tỉnh/TP của bạn'),
    ],
    onSubmit: function(data){
        // console.log(data);
        alert('Sign up successfully')
        document.querySelector('.form-validator #form-1').style.display = 'none';
        document.querySelector('.form-validator #form-2').style.display = 'block';
        inputFocusForm.forEach(function(input,index){
            inputFocusForm[0].focus();
            input.value = '';
        })
    }
});

// Form 2
Validator({
    form: '#form-2',
    formGroupSelector : ".form-group",
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#fullname1','Vui lòng nhập tên đăng nhập của bạn'),
        // Validator.isRequired("#email"),
        // Validator.isEmail("#email"),
        // Validator.isRequired('#phone','Vui lòng nhập số điện thoại của bạn'),
        // Validator.checkPhone('#phone',10),
        Validator.minLength("#password1", 6),
            // Validator.isRequired("#password_confirm1",'Vui lòng xác nhận mật khẩu'),
            // Validator.isConfirm("#password_confirm1", function(){
            //         return document.querySelector('#form-2 #password1').value;
            //     },'Mật khẩu nhập lại không chính xác')
        // Validator.isRequired('input[name="gender"]', 'Vui lòng chọn giới tính'),
        // Validator.isRequired('#province', 'Vui lòng chọn Tỉnh/TP của bạn'),
    ],
    onSubmit: function(data){
        // console.log(data);
        var inputFocusForm = document.querySelectorAll('.input-focus-form');
        var inputName = document.querySelector('#form-2 .input-focus-form').value;
        // var myAccountName = document.querySelector('.text-name-login');
        // var myAccountNameMobile = document.querySelector('.header-login-text');
        var logoutText = document.querySelector('.text-logout');
        var nameLoginString = localStorage.getItem('namelogin') ? JSON.parse(localStorage.getItem('namelogin')) : new Array();
        nameLoginString.push(inputName);
        localStorage.setItem('namelogin', JSON.stringify(nameLoginString));
        // localStorage.setItem('logout', JSON.stringify(logout));
        // myAccountName.innerHTML = inputName;
        // myAccountNameMobile.innerHTML = inputName;
        renderNameLogin();
        renderTextLogout();
        var nameLogoutPC = localStorage.getItem('namelogoutPC') ? JSON.parse(localStorage.getItem('namelogoutPC')) : new Array();
        nameLogoutPC.push('Logout');
        localStorage.setItem('namelogoutPC', JSON.stringify(nameLogoutPC));
        inputFocusForm.forEach(function(input,index){
            inputFocusForm[0].focus();
            input.value = '';
        })
        alert('Logged in successfully');
        document.querySelector('#modal').classList.add('none-form');
        document.querySelector('#modal').classList.remove('flex');
        location.reload();
    }
});
// renDER lOGIN NAME
function renderNameLogin(){
    var nameLoginString = localStorage.getItem('namelogin') ? JSON.parse(localStorage.getItem('namelogin')) : 'My Account';
    var myAccountName = document.querySelector('.text-name-login');
    var myAccountNameMobile = document.querySelector('.header-login-text');
    // var logoutText = document.querySelector('.text-logout');
    myAccountName.innerHTML = nameLoginString;
    myAccountNameMobile.innerHTML = nameLoginString;
    // logoutText.innerHTML = 'Logout'
};
function renderTextLogout(){
    var nameLogoutPC = localStorage.getItem('namelogoutPC') ? JSON.parse(localStorage.getItem('namelogoutPC')) : 'Login';
    var individualText = document.querySelector('.text-logout');
    individualText.innerHTML = nameLogoutPC;
    // logoutText.innerHTML = 'Logout'
}
// onlick text none form 
// document.querySelector('#form-1').classList.toggle('none');
var formSubmitText = document.querySelectorAll('.form-submit-body')
formSubmitText.forEach(function(formTextItem, index){
    formTextItem.onclick = function(e){
        if(index == 0){
            document.querySelector('.form-validator #form-1').style.display = 'none';
            document.querySelector('.form-validator #form-2').style.display = 'block';
        }
        else{
            document.querySelector('.form-validator #form-1').style.display = 'block';
            document.querySelector('.form-validator #form-2').style.display = 'none';
        }
    }
})

var windown = window.matchMedia("(max-width: 1024px)")
    if(windown.matches){
        const formExit = document.querySelectorAll('.form-exit');
        const individualLogin = document.querySelector('.login-option');
        const formValidator = document.querySelector('.form-validator');
        const modalForm = document.querySelector('#modal');
        const btnExitMobile = document.querySelectorAll('.form-exiit-moblie');
        function closeForm(){
            const modalForm = document.querySelector('#modal');
            modalForm.classList.add('none-form');
            modalForm.classList.remove('flex');
        }
        function openForm(){
            const modalForm = document.querySelector('#modal');
            modalForm.classList.remove('none-form');
            modalForm.classList.add('flex');
        }
        modalForm.classList.add('none-form');
        formExit[0].addEventListener('click', closeForm);
        formExit[1].addEventListener('click', closeForm);
        modalForm.addEventListener('click', closeForm);
        // individualLogin.addEventListener('click', openForm);
        btnExitMobile[0].addEventListener('click', closeForm);
        btnExitMobile[1].addEventListener('click', closeForm);
        formValidator.onclick = function(e) {
            e.stopPropagation();
        };
        const headerLoginText = document.querySelector('.header-login-text').innerText;
        var loginMBTL = document.querySelector('.header-login');
        var textLogOutMbtl = document.querySelector('.header-login-logout');
        loginMBTL.onclick = function(e){
            if(headerLoginText == 'My Account'){
                openForm();
            }
            else{
                textLogOutMbtl.classList.toggle('block');
            }
        }
        textLogOutMbtl.onclick = function(e){
            if(confirm('Want to sign out?')== true){
                localStorage.clear();
                location.reload();
            }
            else{
                alert('Sign out failed');
            }
        }
    }
    else{
        const formExit = document.querySelectorAll('.form-exit');
        const individualLogin = document.querySelector('.login-option');
        const formValidator = document.querySelector('.form-validator');
        const modalForm = document.querySelector('#modal');
        const btnExitMobile = document.querySelector('.form-exiit-moblie');
        function closeForm(){
            const modalForm = document.querySelector('#modal');
            modalForm.classList.add('none-form');
            modalForm.classList.remove('flex');
        }
        function openForm(){
            const modalForm = document.querySelector('#modal');
            modalForm.classList.remove('none-form');
            modalForm.classList.add('flex');
        }
        formExit[0].addEventListener('click', closeForm);
        formExit[1].addEventListener('click', closeForm);
        modalForm.addEventListener('click', closeForm);
        // individualLogin.addEventListener('click', openForm);
        btnExitMobile.  addEventListener('click', closeForm);
        formValidator.onclick = function(e) {
            e.stopPropagation();
        };
        window.onkeydown = function(e) { 
            if(e.keyCode === 27){
                modalForm.classList.add('none-form');
            }
        };
        var inputName = document.querySelector('.header__individual-option-text').innerText;
        var logoutText = document.querySelector('.text-logout');
        individualLogin.onclick = function(e){
            if(inputName == 'My Account'){
                openForm();
            }
            else{
                if(confirm('you want to sign out?') == true){     
                    localStorage.clear();
                    document.querySelector('.header__individual-option-text').innerHTML = 'My Account';
                    logoutText.innerHTML = 'Login';
                    location.reload();
                }
                else{
                    alert('Sign out failed');
                    location.reload();
                }
            }
        }
    }

// individualLoginTablet.addEventListener('click', openForm);

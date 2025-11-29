let validEmail="admin@gmail.com";
        let validPassword="admin1234";

        document.getElementById("loginform").addEventListener("submit",function(e){
            e.preventDefault();
        
         
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;

        if(email === validEmail && password===validPassword){
            alert("Login Success");
            window.location.href="admin.html";
        }else{
            alert("Wrong email or password")
        }
        });
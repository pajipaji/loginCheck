function checkUserName(username){
		//var username = document.getElementById("username");
		var um = document.getElementById("um");
		var len = username.value.length;
		if(len<3||len>6){
			//alert("用户名长度必须为3--6位");//校验1.0
			um.innerText = "用户名长度必须为3--6位";//校验2.0
		}else{
			um.innerText = "";
		}
	}
	function checkEmail(email){
		//var emailValue = document.getElementById("email").value;
		var emailValue = email.value;
		var em = document.getElementById("em");
		var p = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if(!p.test(emailValue)){
			//alert("邮箱格式不正确");//校验1.0
			em.innerText = "邮箱格式不正确";//校验2.0
			//isPass = false;
		}else{
			em.innerText = "";
		}
	}
	function checkPassword(password){
		//var password = document.getElementById("password");
		var pm = document.getElementById("pm");
		if(password.value.length<6 || password.value.length>10){
			//alert("密码必须在6--10位之间");//校验1.0
			pm.innerText = "密码必须在6--10位之间";//校验2.0
			//isPass = false;
		}else{
			pm.innerText = "";
		}
	}
	
	function checkRepassword(repassword){
		var password = document.getElementById("password");
		//var repassword = document.getElementById("repassword");
		var rpm = document.getElementById("rpm");
		if(password.value != repassword.value){
			//alert("两次输入密码不一致");//校验1.0
			rpm.innerText = "两次输入密码不一致";//校验2.0
			//isPass = false;
		}else{
			rpm.innerText = "";
		}
	}
window.userData = null;
window.currentIndex = null;

$(".theme-login-tab").click(function(){
	$('.js-registration-form').hide();
	$('.js-login-form').show();
	$('.theme-login-tab').addClass('active');
	$('.theme-registration-tab').removeClass('active');
});

$(".theme-registration-tab").click(function(){
	$('.js-login-form').hide();
	$('.js-registration-form').show();
	$('.theme-login-tab').removeClass('active');
	$('.theme-registration-tab').addClass('active');
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showValidationError(message) {
	$('.validation-error').html(message).show();
	setTimeout(function(){
		$('.validation-error').hide();
	}, 5000);

}

function validateLoginForm(this_form) {
	var username=$('.js-input-user-name input').val();
	var password=$('.js-input-user-passwors input').val();
	if(username==null || username=="" || !validateEmail(username)) {
		showValidationError("Please enter your username");
		return false;
	}
	if(password==null || password=="") {
		showValidationError("Please enter your password");
		return false;
	}
	return true;
}

$('.theme-login-btn').click(function(){
	if(validateLoginForm()) {
		$.ajax({
			url : "/dologin?username=" + $('.js-input-user-name input').val() + "&passwors=" + $('.js-input-user-passwors input').val(),
			success : function(resp) {
				debugger;
				
				window.location.href = window.origin + "/details";
			},
			error : function(resp) {
				$('.login-error').show();
				setTimeout(function(){
					$('.login-error').hide();
				}, 5000);
			}
		});
	}
});

function validateRegistrationForm(this_form) {

	    var id= $('.js-std-id input').val();
		var username=$('.js-std-name input').val();
		var email= $('.js-std-email input').val();
		var password= $('.js-std-password input').val();
		var className= $('.js-std-class input').val();
		var enrNo= $('.js-std-enr-no input').val();
		var city= $('.js-std-city input').val();
		var country= $('.js-std-country input').val();

		if(id==null || id==""){
			showValidationError("please enter your ID");
			return false;
		}
		if(username==null || username=="") {
			showValidationError("Please enter your name");
			return false;
		}
		if(email==null || email=="" || !validateEmail(email)) {
			showValidationError("Please enter your Email");
			return false;
		}
		if(password==null || password==""){
			showValidationError("please enter password ");
			return false;
		}
		if(className==null || className==""){
			showValidationError("please enter your class Name");
			return false;
		}
		if(enrNo==null || enrNo==""){
			showValidationError("please enter Year No ");
			return false;
		}
		if(city==null || city==""){
			showValidationError("please enter City ");
			return false;
		}
		if(country==null || country==""){
			showValidationError("please enter Country ");
			return false;
		}
		return true;
	}

$('.theme-create-user').click(function() {
	if(validateRegistrationForm()) {
		var url = "/createUser?pid=" + Math.floor(Math.random() * 20) + 
					"&id=" + $('.js-std-id input').val() + 
					"&name=" + $('.js-std-name input').val() +
					"&email=" + $('.js-std-email input').val() +
					"&className=" + $('.js-std-class input').val() +
					"&enrNo=" + $('.js-std-enr-no input').val() +
					"&city=" + $('.js-std-city input').val() +
					"&country=" + $('.js-std-country input').val() +
					"&password=" + $('.js-std-password input').val();
						
			$.ajax({
			url : url,
			success : function(resp) {
				window.currentIndex = null;
				window.location.href = window.origin + "/login";
			},
			error : function(resp) {
				$('.details-error').show();
				setTimeout(function(){
					$('.details-error').hide();
				}, 5000);
			}
			});
	}
});

window.showResults = function() {
	$.ajax({
		url : "/userDetails",
		success : function(resp) {
			window.userData = resp;
			var html = '';
			for(var i=0;i<resp.length;i++) {
				var data = resp[i];
				var recordHTML = '<div class="row"><div class="col-12"><span class="id id_data">' + data.student_id + '</span>' +
						 		 '<span class="name">' + data.student_name + '</span>' + 
						 		'<span class="email">' + data.student_email + '</span>' + 
						 		'<span class="class">' + data.student_class + '</span>' + 
						 		'<span class="year">' + data.student_enrolment_year + '</span>' + 
						 		'<span class="city">' + data.student_city + '</span>' + 
						 		'<span class="country">' + data.student_country + '</span>' + 
						 		'<span class="edit" onClick="showEditForm(' + i + ')">Edit</span>' +
						 		'<span class="delete" onClick="deleteUser(' + i + ')">Delete</span></div></div>';
				
				html = html + recordHTML;
			}
			$('.js-details-container').html(html);
		},
		error : function(resp) {}
	});
};

window.showEditForm = function(index) {
	var data = window.userData[index];
	window.currentIndex = index;
	$('.theme-edit-details-container').show();
	$('.js-std-id input').val(data.student_id);
	$('.js-std-name input').val(data.student_name);
	$('.js-std-email input').val(data.student_email);
	$('.js-std-class input').val(data.student_class);
	$('.js-std-enr-no input').val(data.student_enrolment_year);
	$('.js-std-city input').val(data.student_city);
	$('.js-std-country input').val(data.student_country);
};

$('.theme-details-update').click(function() {
	var url = "/updateDetails?pid=" + window.userData[window.currentIndex].id + 
			  "&id=" + $('.js-std-id input').val() + 
			  "&name=" + $('.js-std-name input').val() +
			  "&email=" + $('.js-std-email input').val() +
			  "&className=" + $('.js-std-class input').val() +
			  "&enrNo=" + $('.js-std-enr-no input').val() +
			  "&city=" + $('.js-std-city input').val() +
			  "&country=" + $('.js-std-country input').val();

	$.ajax({
		url : url,
		success : function(resp) {
			window.currentIndex = null;
			window.location.href = window.origin + "/details";
		},
		error : function(resp) {
			$('.details-error').show();
			setTimeout(function(){
				$('.details-error').hide();
			}, 5000);
		}
	});
});

$('.theme-details-clear').click(function() {
	window.currentIndex = null;
	$('.theme-edit-details-container').hide();
	$('.js-std-id input').val("");
	$('.js-std-name input').val("");
	$('.js-std-email input').val("");
	$('.js-std-class input').val("");
	$('.js-std-enr-no input').val("");
	$('.js-std-city input').val("");
	$('.js-std-country input').val("");
});

window.deleteUser = function(index) {
	window.currentIndex = null;
	$.ajax({
		url : "/deleteUser?pid=" + window.userData[index].id,
		success : function(resp) {
			window.currentIndex = null;
			window.location.href = window.origin + "/details";
		},
		error : function(resp) {
			$('.details-error').show();
			setTimeout(function(){
				$('.details-error').hide();
			}, 5000);
		}
	});
};
<%--
  Created by IntelliJ IDEA.
  User: ZQ
  Date: 2019/8/7
  Time: 21:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover">
    <title>Sign up - ZQ's WEB</title>

    <!-- Fix chrome language detection -->
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="Content-Language" content="en"/>

    <!-- Styles -->
    <link href="static/dist/css/style.css?v=515" rel="stylesheet">

    <!--[if lt IE 9]>
    <script src="static/dist/js/selectivizr-min.js"></script>
    <script src="static/dist/js/html5shiv.min.js"></script>
    <script src="static/dist/js/respond.min.js"></script>
    <![endif]-->
</head>
<body class="">

<div class="site site--full">
    <header class="site-banner banner--shape banner banner--fullpage">
        <div class="container">
            <div class="banner__brand">
                <a href="/" data-logo-video></a>
            </div>
            <div class="banner__content  animation-element " data-animation data-animation-options="type:fadeInTop;">
                <div class="m-w-xs m-h-a">
                    <div class="box box--auth">
                        <div class="box__content">
                            <h1 class="box__title h2">Create Account</h1>
                            <div class="box__desc">
                                You have now entered ZQ's personal website, please Sign Up first.
                            </div>

                            <div id="error-email-overlap" style="color: red; font-size: 16px" hidden>
                                <span>
                                    <svg style="width: 16px; height: 16px" t="1565263619974" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1998" width="200" height="200"><path d="M512 0C229.229714 0 0 229.229714 0 512c0 282.770286 229.229714 512 512 512s512-229.229714 512-512C1024 229.229714 794.770286 0 512 0zM731.428571 668.672 668.672 731.428571 512 574.683429 355.254857 731.428571 292.571429 668.672 449.243429 512 292.571429 355.254857 355.254857 292.571429 512 449.316571 668.672 292.571429 731.428571 355.254857 574.683429 512 731.428571 668.672z" p-id="1999" fill="#d81e06"></path></svg>
                                </span>
                            <b>Your email has overlapped with other's.</b></div>

                            <div id="error-email-format" style="color: red; font-size: 16px" hidden>
                                <span>
                                    <svg style="width: 16px; height: 16px" t="1565263619974" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1998" width="200" height="200"><path d="M512 0C229.229714 0 0 229.229714 0 512c0 282.770286 229.229714 512 512 512s512-229.229714 512-512C1024 229.229714 794.770286 0 512 0zM731.428571 668.672 668.672 731.428571 512 574.683429 355.254857 731.428571 292.571429 668.672 449.243429 512 292.571429 355.254857 355.254857 292.571429 512 449.316571 668.672 292.571429 731.428571 355.254857 574.683429 512 731.428571 668.672z" p-id="1999" fill="#d81e06"></path></svg>
                                </span>
                                <b>Your email format is not correct.</b></div>

                            <form action="SubmitAudit" method="post" class="form" id="register-form" data-ps-strength>
                                <div class="form-group input-group" id="email-input">
                                    <span class="input-group__icon">
                                        <svg class="icon-ui icon-ui--24" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24">
                                            <path class="stroke" d="M2,4h20v16H2V4z"/>
                                            <path class="stroke" d="M2,8l10,5l10-5"/>
                                        </svg>
                                    </span>
                                    <input id="email" name="email" value="${email}" class="form-control" type="text" placeholder="Email Address" >
                                </div>

                                <div class="form-group input-group input-group--password-strength">
                                    <span class="input-group__icon m-l-2x">
                                        <svg class="icon-ui icon-ui--24" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24">
                                            <path class="fill" d="M19,8V7c0-3.9-3.1-7-7-7S5,3.1,5,7v1h2V7c0-2.8,2.2-5,5-5s5,2.2,5,5v1H19"/>
                                            <path class="stroke" d="M3,9h18v14H3V9z"/>
                                            <circle class="fill" cx="8" cy="16" r="1"/>
                                            <circle class="fill" cx="12" cy="16" r="1"/>
                                            <circle class="fill" cx="16" cy="16" r="1"/>
                                        </svg>
                                    </span>

                                    <input id="password" name="password" class="form-control" type="password" placeholder="Password" required data-ps-strength-input/>

                                    <div class="input-group__password-addon">
                                        <div class="password-strength" data-ps-strength-progress>
                                            <span class="password-strength__value"></span>
                                        </div>
                                        <div class="input-tooltip input-tooltip--password-strength"
                                             data-ps-strength-tooltip>
                                            <div class="input-tooltip__content">
                                                <p>Use at least:</p>
                                                <ul class="input-tooltip__list">
                                                    <li class="input-tooltip__list-item" data-ps-uppercase><span>1 uppercase character</span>
                                                    </li>
                                                    <li class="input-tooltip__list-item" data-ps-lowercase><span>1 lowercase character</span>
                                                    </li>
                                                    <li class="input-tooltip__list-item" data-ps-number>
                                                        <span>1 number</span></li>
                                                    <li class="input-tooltip__list-item" data-ps-min-characters><span>10 characters</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group input-group input-group--password-strength"
                                     style="width: 35%;float:left; display:inline">
                                    <select id="countryCode" name="countrycode" class="form-control" style="width: 100%">
                                        <option name="volvo" value="+ 86">+ 86</option>
                                        <option name="saab" value="+ 31">+ 31</option>
                                        <option name="opel" value="+ 64">+ 64</option>
                                        <option name="audi" value="+ 32">+ 32</option>
                                    </select>
                                </div>

                                <div class="form-group input-group input-group--password-strength"
                                     style="width: 60%; float:right; display:inline">
                                    <input value="${phonum}" type="text" class="form-control" name="phonenumber" placeholder="Phone Number" id="phone">
                                </div>
                                <div hidden id="vc">
                                <div class="form-group input-group input-group--password-strength"
                                     style="width: 35%; float:left; display:inline">
                                    <input value="${sms}" type="text" class="form-control" name="verifycode" placeholder="Verify Code" id="verifyCode">
                                </div>

                                <div class="form-group input-group input-group--password-strength"
                                     style="width: 60%; float:right; display:inline">
                                    <button type="button" id="button-for-verify"
                                            class="btn btn--primary btn--block"><span
                                            class="btn__text">Get VerifyCode</span></button>
                                </div>
                                </div>
                                Please enter the characters you see:
                                <div class="captcha_container">
                                    <span>
                                    <img  form-control  id="vercod" src="getVerifyCode" style="width: 45%; float:left; display:inline">
                                    </span>
                                    <input id="securityCode" class="form-control" type="text" name="captcha" style="width: 50%; float:right; display:inline">
                                </div>
                                <br>
                                <div style="clear: both"></div>
                                <div class="form__actions">
                                    <button  type="submit" id="submit"
                                            class="btn btn--primary btn--block"><span
                                            class="btn__text">Create Account</span></button>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div class="p-3 text-center m-b-0">Already a member ? <a href="#">Log In</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="banner__background">
            <div class="banner__illustration illustration illustration--wide" data-animation
                 data-animation-options="type:mainIllustration;">
                <div class="illustration__left-element">
                    <svg class="svg-illustration svg-illustration--ssd animation-element" data-animation-ssd
                         version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         viewBox="0 0 182 130">
                        <path class="gradient-1"
                              d="M0,53.4h182v25.2c0,2.8-1.9,5.6-5.6,7.7l-36,20.5l-36,20.5c-8.5,4.2-18.5,4.2-27,0l-4.5-2.6L10.1,88.8l-4.5-2.6C1.9,84.1,0,81.3,0,78.6V53.4z"/>
                        <path class="fill-dark-blue-1 opacity-3"
                              d="M13.3,75.6c-1.9-1.1-3.4-0.2-3.4,1.9v10.8l63.3,36.3v-10.8c-0.1-2.4-1.4-4.5-3.4-5.8L13.3,75.6z"/>
                        <path class="gradient-2"
                              d="M176.4,60.1c3.7-2.1,5.6-5,5.6-7.8s-1.9-5.6-5.6-7.8l-36-20.7l-36-20.7c-8.5-4.3-18.5-4.3-27,0l-36,20.7l-36,20.7c-3.7,2.1-5.6,5-5.6,7.8s1.9,5.6,5.6,7.8l36,20.7l36,20.7c8.5,4.3,18.5,4.3,27,0l36-20.7	L176.4,60.1z"/>
                        <linearGradient id="gradient-ssd-1" gradientUnits="userSpaceOnUse" x1="0" y1="91.8999"
                                        x2="181.98" y2="91.8999">
                            <stop offset="0" style="stop-color:#1D53DA"/>
                            <stop offset="1" style="stop-color:#3F75FC"/>
                        </linearGradient>
                        <linearGradient id="gradient-ssd-2" gradientUnits="userSpaceOnUse" x1="0" y1="52.3752"
                                        x2="181.98" y2="52.3752">
                            <stop offset="0" style="stop-color:#0397F6"/>
                            <stop offset="1" style="stop-color:#00BAFF"/>
                        </linearGradient>
                    </svg>

                    <div class="illustration__light animation-element" data-animation-light>
                        <svg class="svg-illustration svg-illustration-light" xmlns="http://www.w3.org/2000/svg" x="0px"
                             y="0px" viewBox="0 0 182 274">
                            <g class="svg-light">
                                <path class="svg-light__1"
                                      d="M181.9,181.5c-0.3,2.6-2.1,5.1-5.5,7l-35.9,20.6l-35.9,20.6c-8.5,4.3-18.5,4.3-26.9,0l-35.9-20.6L5.9,188.5c-3.1-1.8-4.9-4.1-5.4-6.4H0V34h182l0,147.4L181.9,181.5L181.9,181.5z"/>
                                <path class="svg-light__2"
                                      d="M181.9,180.2c0,0.2,0,0.4,0,0.6c0,2.8-1.9,5.6-5.6,7.7l-71.8,41.2c-8.5,4.3-18.5,4.3-26.9,0L5.9,188.5c-3.5-2-5.4-4.6-5.5-7.3H0.3L0,0h182L181.9,180.2z"/>
                                <path class="svg-light__reflect"
                                      d="M0,274v-93.2c0,2.8,1.9,5.6,5.6,7.7l35.9,20.6l35.9,20.6c8.5,4.3,18.5,4.3,26.9,0l35.9-20.6l35.9-20.6c3.7-2.1,5.6-4.9,5.6-7.7c0-0.5-0.1-0.9-0.2-1.4h0.6v94L0,274z M0,180.8v-1.4h0.2C0.1,179.8,0,180.3,0,180.8z"/>
                            </g>
                            <defs>
                                <linearGradient id="svg-gradient__light-1" gradientUnits="userSpaceOnUse" x1="91.005"
                                                y1="232.879" x2="91.005" y2="34.043">
                                    <stop offset="0" style="stop-color:#17BDFF"/>
                                    <stop offset="0.8" style="stop-color:#17BDFF;stop-opacity:0"/>
                                </linearGradient>
                                <linearGradient id="svg-gradient__light-2" gradientUnits="userSpaceOnUse" x1="91"
                                                y1="232.876" x2="91" y2="-9.094947e-13">
                                    <stop offset="0" style="stop-color:#51B9FF"/>
                                    <stop offset="0.7" style="stop-color:#2389F0;stop-opacity:0.7"/>
                                    <stop offset="1" style="stop-color:#2389F0;stop-opacity:0"/>
                                </linearGradient>
                                <linearGradient id="svg-gradient__light-reflect" gradientUnits="userSpaceOnUse"
                                                x1="91.005" y1="179.391" x2="91.005" y2="274.009">
                                    <stop offset="0" style="stop-color:#17BDFF"/>
                                    <stop offset="0.8" style="stop-color:#17BDFF;stop-opacity:0"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                <div class="illustration__right-element">
                    <svg class="svg-illustration svg-illustration--ssd animation-element" data-animation-ssd
                         version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         viewBox="0 0 182 130">
                        <path class="gradient-1"
                              d="M0,53.4h182v25.2c0,2.8-1.9,5.6-5.6,7.7l-36,20.5l-36,20.5c-8.5,4.2-18.5,4.2-27,0l-4.5-2.6L10.1,88.8l-4.5-2.6C1.9,84.1,0,81.3,0,78.6V53.4z"/>
                        <path class="fill-dark-blue-1 opacity-3"
                              d="M13.3,75.6c-1.9-1.1-3.4-0.2-3.4,1.9v10.8l63.3,36.3v-10.8c-0.1-2.4-1.4-4.5-3.4-5.8L13.3,75.6z"/>
                        <path class="gradient-2"
                              d="M176.4,60.1c3.7-2.1,5.6-5,5.6-7.8s-1.9-5.6-5.6-7.8l-36-20.7l-36-20.7c-8.5-4.3-18.5-4.3-27,0l-36,20.7l-36,20.7c-3.7,2.1-5.6,5-5.6,7.8s1.9,5.6,5.6,7.8l36,20.7l36,20.7c8.5,4.3,18.5,4.3,27,0l36-20.7	L176.4,60.1z"/>
                        <linearGradient id="gradient-ssd-1" gradientUnits="userSpaceOnUse" x1="0" y1="91.8999"
                                        x2="181.98" y2="91.8999">
                            <stop offset="0" style="stop-color:#1D53DA"/>
                            <stop offset="1" style="stop-color:#3F75FC"/>
                        </linearGradient>
                        <linearGradient id="gradient-ssd-2" gradientUnits="userSpaceOnUse" x1="0" y1="52.3752"
                                        x2="181.98" y2="52.3752">
                            <stop offset="0" style="stop-color:#0397F6"/>
                            <stop offset="1" style="stop-color:#00BAFF"/>
                        </linearGradient>
                    </svg>

                    <div class="illustration__light animation-element" data-animation-light>
                        <svg class="svg-illustration svg-illustration-light" xmlns="http://www.w3.org/2000/svg" x="0px"
                             y="0px" viewBox="0 0 182 274">
                            <g class="svg-light">
                                <path class="svg-light__1"
                                      d="M181.9,181.5c-0.3,2.6-2.1,5.1-5.5,7l-35.9,20.6l-35.9,20.6c-8.5,4.3-18.5,4.3-26.9,0l-35.9-20.6L5.9,188.5c-3.1-1.8-4.9-4.1-5.4-6.4H0V34h182l0,147.4L181.9,181.5L181.9,181.5z"/>
                                <path class="svg-light__2"
                                      d="M181.9,180.2c0,0.2,0,0.4,0,0.6c0,2.8-1.9,5.6-5.6,7.7l-71.8,41.2c-8.5,4.3-18.5,4.3-26.9,0L5.9,188.5c-3.5-2-5.4-4.6-5.5-7.3H0.3L0,0h182L181.9,180.2z"/>
                                <path class="svg-light__reflect"
                                      d="M0,274v-93.2c0,2.8,1.9,5.6,5.6,7.7l35.9,20.6l35.9,20.6c8.5,4.3,18.5,4.3,26.9,0l35.9-20.6l35.9-20.6c3.7-2.1,5.6-4.9,5.6-7.7c0-0.5-0.1-0.9-0.2-1.4h0.6v94L0,274z M0,180.8v-1.4h0.2C0.1,179.8,0,180.3,0,180.8z"/>
                            </g>
                            <defs>
                                <linearGradient id="svg-gradient__light-1" gradientUnits="userSpaceOnUse" x1="91.005"
                                                y1="232.879" x2="91.005" y2="34.043">
                                    <stop offset="0" style="stop-color:#17BDFF"/>
                                    <stop offset="0.8" style="stop-color:#17BDFF;stop-opacity:0"/>
                                </linearGradient>
                                <linearGradient id="svg-gradient__light-2" gradientUnits="userSpaceOnUse" x1="91"
                                                y1="232.876" x2="91" y2="-9.094947e-13">
                                    <stop offset="0" style="stop-color:#51B9FF"/>
                                    <stop offset="0.7" style="stop-color:#2389F0;stop-opacity:0.7"/>
                                    <stop offset="1" style="stop-color:#2389F0;stop-opacity:0"/>
                                </linearGradient>
                                <linearGradient id="svg-gradient__light-reflect" gradientUnits="userSpaceOnUse"
                                                x1="91.005" y1="179.391" x2="91.005" y2="274.009">
                                    <stop offset="0" style="stop-color:#17BDFF"/>
                                    <stop offset="0.8" style="stop-color:#17BDFF;stop-opacity:0"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1903 556">
                <path class="svg-banner-shape" d="M753.1,434.2c110.6,63.7,277.7,70.6,373.4,15.4L1905,0v555.9H0V0.2L753.1,434.2z"/>
            </svg>
        </div>
    </header>
</div>
<script src="static/dist/js/jquery-3.4.1.min.js?v=515"></script>
<script src="static/dist/js/vendor.js?v=515"></script>
<script src="static/dist/js/main.js?v=515"></script>
<script src="static/dist/js/lazyload.min.js?v=515"></script>
<script src="static/dist/js/logo-animation.js?v=515"></script>
<script>
    var isPhoneValid
    var isEmailValid
    var isVerifyCodeValid
    var isSecurtyCodeValid
    var isReturn = ${isReturn}
    $(function () {
        if(0 == ${state}) {
            alert("手机验证码错误")
        } else if (1 == ${state}) {
            alert("安全码错误")
        } else {

        }

        $("#phone").click(function () {
            $("#vc").removeAttr("hidden");
        })

        $("#email").blur(function () {
            var date = $("#email").val();
            var isEmail = isEmailAvailable(date)
            if(isEmail) {
                $("#email-input").css("border","");
                $("#error-email-format").attr("hidden", "hidden");

                htmlobj = $.ajax({
                    url: "isEmailRepeated",
                    type: "GET",
                    dataType: "text",
                    data: {email: date},
                    success: callback,
                    error: function () {
                        alert("用户名验证时出现异常，请稍后再试")
                    }
                });
            } else {
                $("#email-input").css("border","red solid 1px");
                $("#error-email-format").removeAttr("hidden");
                $("#email-input").css("border","");
                $("#error-email-overlap").attr("hidden", "hidden");
            }

            function callback(data) {
                if (data=="1") {
                    $("#email-input").css("border","red solid 1px");
                    $("#error-email-overlap").removeAttr("hidden");
                    isEmailValid=false
                } else {
                    $("#email-input").css("border","");
                    $("#error-email-overlap").attr("hidden", "hidden");
                    isEmailValid=true
                }
            }
        })

        $("#button-for-verify").click(function(){
            var countryCode = $("#countryCode").val();
            var phoneNum = $("#phone").val();
            var isPhone = isPoneAvailable(phoneNum)
            if(isPhone){
                htmlobj=$.ajax({
                    url:"isPhoneRepeated",
                    type:"GET",
                    dataType:"json",
                    data:{countryCode:countryCode,phoneNum:phoneNum},
                    success:callback,
                    error:function () {
                        alert("手机号验证时出现异常，请稍后再试")
                    }
                });
            } else {
                alert("手机号格式错误")
                isPhoneValid=false
            }

            function callback(data) {
                if (data["isOk"] == "1") {
                    alert("手机号重复，请更换其他手机号注册")
                    isPhoneValid = false
                }
                else if(data["isOk"] == "3") {
                    alert("暂不支持非中国手机号")
                    isPhoneValid = false
                } else {
                    switchMSG(60, $("#button-for-verify"), "Get VerifyCode")
                    isPhoneValid=true;
                }
            }
        });
        
        $("#vercod").click(function () {
            var src = "getVerifyCode?"+new Date().getTime(); //加时间戳，防止浏览器利用缓存
            $("#vercod").attr("src",src);
        })

        function isPoneAvailable(str) {
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(str)) {
                return false;
            } else {
                return true;
            }
        }

        function isEmailAvailable(str){
            var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
            if(myReg.test(str)){
                return true;
            }else{
                return false;0
            }
        }

        function switchMSG(times, ele, txt) {
            ele.prop('disabled', true)
            var idT = setInterval(function() {
                if(times < 1) {
                    ele.text(txt)
                    ele.prop('disabled', false)
                    clearInterval(idT)
                } else {
                    ele.text("Send Again (" + times + ")");
                    times--
                }
            }, 1000)
        }

        $("#submit").attr("disabled", true)
        wait()
    })
    function wait() {
        if((isPhoneValid && isEmailValid) || isReturn) {
            console.log("1111111")
            $("#submit").attr("disabled", false)
        } else {
            setTimeout(wait, 500)
        }

    }
</script>
</body>
</html>

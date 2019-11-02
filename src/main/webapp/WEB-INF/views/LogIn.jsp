<%--
  Created by IntelliJ IDEA.
  User: ZQ
  Date: 2019/7/8
  Time: 22:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover">
    <title>Log In - ZQ's WEB</title>

    <!-- Fix chrome language detection -->
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="Content-Language" content="en"/>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="static/css/AdminLTE.css">
    <link rel="stylesheet" href="static/css/bootstrap.css">
    <link rel="stylesheet" href="static/css/bootstrap-theme.css">
    <link rel="stylesheet" href="static/css/mycss/logincss.css">

    <script src="static/jquery.js"></script>
    <script src="static/js/adminlte.js"></script>
    <script src="static/js/bootstrap.js"></script>
    <script src="static/js/demo.js"></script>
    <script src="static/js/myjs/myjs.js"></script>

</head>
<body>
<div class="container">
    <div>
        <img id="logo-img" src="static/img/fly.svg" height="128px">
    </div>
    <div class="input-container">
        <div class="headline-container">
            <h1 id="headline"><b>Welcome Back</b></h1>
        </div>
        <form name="f" action="LogIn" method="post">
            <div style="margin-top: 30px">
                <span><img id="mailbox-img" src="static/img/mailbox.svg" alt="" width= 40px></span>
                <input name="email" id="input-email" type="text" placeholder="&nbsp;&nbsp;Email Address">
            </div>

            <div style="margin-top: 30px">
                <span><img id="password-img" src="static/img/password.svg" alt="" width= 40px></span>
                <input name="password" id="input-password" type="password"  placeholder="&nbsp;&nbsp;Password">
            </div>
            <div style="margin-top: 10px; color: #cccccc">
                <p align="right"><a href="#">Forget password?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></p>
            </div>

            <button  id="input-button" class="waves ts-btn" >Log In</button>
        </form>
    </div>

</div>
</body>
</html>

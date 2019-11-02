<%--
  Created by IntelliJ IDEA.
  User: ZQ
  Date: 2019/8/27
  Time: 18:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Success</title>
    <script src="/static/jquery.js"></script>
</head>
<script type="text/javascript">
    function closewin(){
        if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
            window.location.href="about:blank";
            window.close();
        } else {
            window.opener = null;
            window.open("", "_self");
            window.close();
        }

    }
    var mymessage = confirm("注册成功，是否进入登录页");
    if(mymessage==true)
    {
        window.location.href = "LogIn"
    }
    else if(mymessage==false)
    {
        closewin()
    }
</script>
</body>
</html>

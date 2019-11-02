package com.zq.controller;

import com.google.gson.JsonObject;
import com.zq.configration.DaoConfig;
import com.zq.entiey.Phone;
import com.zq.mapper.UsersDao;
import com.zq.tools.SendSms;
import com.zq.tools.VerifyCode;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;


@Controller
public class SignUpController {
    ApplicationContext context = new AnnotationConfigApplicationContext(DaoConfig.class);
    SqlSessionFactory factory = context.getBean(SqlSessionFactory.class);
    SqlSession session = factory.openSession();
    UsersDao dao = session.getMapper(UsersDao.class);

    @RequestMapping(value = "/SignUp", method = RequestMethod.GET)
    private String verify(Model model) {
        model.addAttribute("isReturn", false);
        model.addAttribute("state", "-1");
        return "SignUp";
    }

    @RequestMapping(value = "/SubmitAudit", method = RequestMethod.POST)
    private String audit(@RequestParam("email") String email,
                         @RequestParam("password") String password,
                         @RequestParam("phonenumber") String phoneNumber,
                         @RequestParam("verifycode") String verifyCode,
                         @RequestParam("captcha") String securityCode,
                         HttpServletRequest request,
                         Model module) {
        HttpSession httpSession = request.getSession();
        String sms = (String) httpSession.getAttribute("sms");
        String securityCode1 = (String)httpSession.getAttribute("securityCode");


        if(securityCode.toLowerCase().equals(securityCode1.toLowerCase())) {
            if(sms.equals(verifyCode)) {
                System.out.println(password);
                System.out.println(phoneNumber);
                System.out.println(email);
                System.out.println(new Date());
                dao.insertUser(password, "+ 86", phoneNumber, email, new Date(), 0);
                dao.insertRelation(dao.getIdByEmail(email));
                session.commit();
                return "successBuffer";
            } else {
                System.out.println("验证码错误");
                module.addAttribute("state", "0");
            }
        } else {
            System.out.println("安全码错误");
            module.addAttribute("state", "1");
            module.addAttribute("sms", sms);
        }
        module.addAttribute("email", email);
        module.addAttribute("phonum", phoneNumber);
        module.addAttribute("isReturn", true);
        return "SignUp";
    }

    @RequestMapping(value = "/isPhoneRepeated", method = RequestMethod.GET)
    private void audit(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String countryCode = request.getParameter("countryCode");
        String phoneNumber = request.getParameter("phoneNum");
        Phone phone = dao.getPhone(countryCode, phoneNumber);
        JsonObject json = new JsonObject();
        if (phone != null) {
            json.addProperty("isOk", "1");
        } else {
            if(countryCode.equals("+ 86")) {
                String message = String.valueOf((int)((Math.random() * 9 + 1) * 100000));
                System.out.println(message);
                json.addProperty("isOk", "2");
                json.addProperty("verifyCode", message);
                request.getSession().setAttribute("sms", message);
            SendSms.test(phoneNumber, message);
            } else {
                json.addProperty("isOk", "3");
            }
        }
        response.getWriter().write(json.toString());
    }

    @RequestMapping(value = "/isEmailRepeated", method = RequestMethod.GET)
    private void isEmailRepeated(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String s = request.getParameter("email");
        String a = dao.getEmail(s);
        if(a != null) {
            response.getWriter().write("1");
        } else {
            response.getWriter().write("");
        }
    }

    @RequestMapping(value = "/getVerifyCode")
    private void getVerificationCode(HttpServletResponse response,HttpServletRequest request) {
        try {
            int width=200;
            int height=69;
            BufferedImage verifyImg=new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB); //生成对应宽高的初始图片
            String randomText = VerifyCode.drawRandomText(width,height,verifyImg);  //单独的一个类方法，出于代码复用考虑，进行了封装。
            // 功能是生成验证码字符并加上噪点，干扰线，返回值为验证码字符
            request.getSession().setAttribute("securityCode", randomText);
            response.setContentType("image/png");//必须设置响应内容类型为图片，否则前台不识别
            OutputStream os = response.getOutputStream(); //获取文件输出流
            ImageIO.write(verifyImg,"png",os);//输出图片流
            os.flush();
            os.close();//关闭流
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}

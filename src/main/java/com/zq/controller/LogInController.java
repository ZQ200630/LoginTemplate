package com.zq.controller;

import com.zq.configration.DaoConfig;
import com.zq.entiey.User;
import com.zq.mapper.UsersDao;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class LogInController {

    @RequestMapping("/LogIn")
    private String login() {
        return "LogIn";
    }
}

package com.zq.test;

import com.zq.configration.WebConfig;
import com.zq.entiey.User;
import com.zq.mapper.UsersDao;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class mainTest {
    public static void main(String[] args) throws IOException {
//        InputStream stream = Resources.getResourceAsStream("mybatis-config.xml");
//        SqlSessionFactoryBuilder factoryBuilder = new SqlSessionFactoryBuilder();
//        SqlSessionFactory factory = factoryBuilder.build(stream);
//        SqlSession session = factory.openSession();
//        UsersDao dao = session.getMapper(UsersDao.class);
//        System.out.println(dao.deleteUserById(3));
//        User user = dao.findById(2);
//        session.commit();
//        List<User> list = dao.findAll();
//        for (User u : list) {
//            System.out.println(u);
//        }
//        System.out.println(user);
        ApplicationContext context = new AnnotationConfigWebApplicationContext();

        SqlSessionFactory factory = context.getBean(SqlSessionFactory.class);
        SqlSession session = factory.openSession();
        UsersDao dao = session.getMapper(UsersDao.class);
        dao.findAll();
    }
}

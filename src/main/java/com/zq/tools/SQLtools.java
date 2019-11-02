//package com.zq.tools;
//
//import com.zq.entiey.User;
//import com.zq.mapper.UsersDao;
//import org.apache.ibatis.session.SqlSession;
//
//import java.io.IOException;
//import java.util.List;
//
//public class SQLtools {
//    public static boolean isContain(String email, String password) throws IOException {
//        SqlSession session = MySessionFactory.getSqlSession();
//        UsersDao dao = session.getMapper(UsersDao.class);
//        List<User> users = dao.findAll();
//        for (User user : users) {
//            if(user.getEmail().equals(email)) {
//                if(user.getPassword().equals(password)) {
//                    return true;
//                }
//            }
//        }
//        return false;
//    }
//}

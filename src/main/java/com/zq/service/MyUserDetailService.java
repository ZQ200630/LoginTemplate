package com.zq.service;

import com.zq.configration.DaoConfig;
import com.zq.entiey.GrantedAuthorityString;
import com.zq.entiey.UserForVerify;
import com.zq.mapper.UsersDao;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Service
public class MyUserDetailService implements UserDetailsService {
    ApplicationContext context = new AnnotationConfigApplicationContext(DaoConfig.class);
    SqlSessionFactory factory = context.getBean(SqlSessionFactory.class);
    SqlSession session = factory.openSession();
    UsersDao dao = session.getMapper(UsersDao.class);

    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        UserDetails userdetails = null;
        UserForVerify verifyUser = dao.getVerifyUser(s);
        Collection<GrantedAuthority> authList = getAuthorities(s);
        userdetails = new User(verifyUser.getUserName(), verifyUser.getPassword(), authList);
        return userdetails;
    }


    private Collection<GrantedAuthority> getAuthorities(String userName) {
        List<GrantedAuthorityString> gl = dao.getGrantedAuthority(userName);
        List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
        for (GrantedAuthorityString string: gl) {
            authList.add(new SimpleGrantedAuthority(string.getGrantedAuthorityString()));
        }
        return authList;
    }
}

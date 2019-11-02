package com.zq.configration;

import com.zq.service.MyUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    MyUserDetailService service;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin()
                .loginPage("/LogIn")
                .usernameParameter("email")
                .and()
                .authorizeRequests()
                .antMatchers("/SignUp")
                .permitAll()
                .antMatchers("/LogIn")
                .permitAll()
                .antMatchers("/static/**")
                .permitAll()
                .antMatchers("/SubmitAudit")
                .permitAll()
                .antMatchers("/druid/**")
                .hasRole("ADMIN")
                .antMatchers("/isEmailRepeated")
                .permitAll()
                .antMatchers("/isPhoneRepeated")
                .permitAll()
                .antMatchers("/getVerifyCode")
                .permitAll()
                .anyRequest()
                .hasRole("USER")
                .and().csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(service);
    }
}

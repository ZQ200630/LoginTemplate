package com.zq.mapper;

import com.zq.entiey.GrantedAuthorityString;
import com.zq.entiey.User;
import com.zq.entiey.UserForVerify;
import com.zq.entiey.Phone;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface UsersDao {
    @Select("SELECT ID AS id,EMAIL AS email, LOGIN_PASSWORD AS password FROM USERS WHERE ID = #{id}")
    public User findById(int id);

    @Select("SELECT ID AS id,EMAIL AS email, LOGIN_PASSWORD AS password FROM USERS")
    public List<User> findAll();

    @Insert("INSERT INTO users(LOGIN_PASSWORD, COUNTRY_CODE, PHONE_NUMBER, EMAIL, GEN_TIME, LOGIN_COUNT) VALUES(#{password}, #{countryCode}, #{phoneNumber}, #{email}, #{createDate}, #{loginCount});")
    public void insertUser(@Param("password") String password, @Param("countryCode") String countryCode, @Param("phoneNumber") String phoneNumber, @Param("email") String email, @Param("createDate") Date createDate, @Param("loginCount") int loginCount);

    @Select("select ID from users where EMAIL=#{email}")
    public int getIdByEmail(String email);

    @Insert("INSERT INTO relation values(#{id}, 1)")
    public void insertRelation(int id);

    @Delete("delete from RELATION where USER_ID = #{id};delete from USERS where id = #{id}")
    public int deleteUserById(int id);

    @Select("select EMAIL as userName, LOGIN_PASSWORD as password from users where EMAIL = #{username}")
    public UserForVerify getVerifyUser(String username);

    @Select("select ROLE_NAME as GrantedAuthorityString from roles where ID in (select ROLE_ID from relation where USER_ID in (select ID from users where EMAIL = #{username}))")
    public List<GrantedAuthorityString> getGrantedAuthority(String username);

    @Select("select EMAIL from users where EMAIL=#{email}")
    public String getEmail(String email);

    @Select("select COUNTRY_CODE as countryCode, PHONE_NUMBER as phoneNumber from users where PHONE_NUMBER= #{phoneNumber} and COUNTRY_CODE = #{countryCode}")
    public Phone getPhone(@Param("countryCode") String countryCode, @Param("phoneNumber")  String phoneNum);
}

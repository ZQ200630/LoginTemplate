package com.zq.entiey;

import java.io.Serializable;

/**
 * This is the entity of user
 */
public class User implements Serializable {
    private int id;
    private String email;
    private String password;

    /**
     * Empty constructor
     */
    public User() {}

    /**
     * Three param constructor
     * @param id
     * @param email
     * @param password
     */
    public User(int id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}

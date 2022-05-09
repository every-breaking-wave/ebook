package com.wave.backend.model.domain.response;

import com.wave.backend.constant.UserServiceStatus;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserLoginResponse implements Serializable {

    private UserServiceStatus status;

    private String userAccount;

    private Long id;

    private int role;

}

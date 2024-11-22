package com.shweta.smart.user;

import com.shweta.smart.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private static User user = new User();

    public User getLoggedInUser(String userId) {
        return user;
    }
}

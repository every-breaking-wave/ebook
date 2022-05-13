package com.wave.backend.model.domain.response;

import com.wave.backend.model.domain.BookInCar;
import lombok.Data;

import javax.servlet.http.Cookie;
import java.util.List;


@Data
public class CarListResponse {
    List <BookInCar> bookInCarList;
}

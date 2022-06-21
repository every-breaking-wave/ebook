package com.wave.backend.model.domain.response;

import com.wave.backend.model.domain.CarItem;
import lombok.Data;

import javax.servlet.http.Cookie;
import java.util.List;


@Data
public class CarListResponse {
    List <CarItem> bookInCarList;
}

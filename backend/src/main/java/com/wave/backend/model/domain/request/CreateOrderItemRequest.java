package com.wave.backend.model.domain.request;

import com.wave.backend.model.domain.Book;
import com.wave.backend.model.domain.BookInCar;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class CreateOrderItemRequest implements Serializable {

    private static final long serialVersionUID = -6937919124813537741L;
    private Long id;

    private List<BookInCar> bookList;

    private Long orderId;

}

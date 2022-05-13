package com.wave.backend.model.domain.request;

import com.wave.backend.model.domain.Book;
import lombok.Data;

import java.io.Serializable;
@Data
public class AddCartRequest implements Serializable {

    private static final long serialVersionUID = -2472450424831582877L;

    private String bookId;

    private Integer count;
}

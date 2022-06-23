package com.wave.backend.model.response;

import com.wave.backend.model.Book;
import lombok.Data;

@Data
public class GetBookResponse {
    Book book;
}

package com.wave.backend.model.domain.response;

import com.wave.backend.model.domain.Book;
import lombok.Data;

@Data
public class GetBookResponse {
    Book book;
}

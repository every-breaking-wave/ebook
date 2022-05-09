package com.wave.backend.model.domain.response;

import com.wave.backend.model.domain.Book;
import lombok.Data;

import java.util.List;

@Data
public class SearchBookResponse {
    private List<Book> bookList;
}

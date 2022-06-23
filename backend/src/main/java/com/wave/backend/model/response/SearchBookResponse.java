package com.wave.backend.model.response;

import com.wave.backend.model.Book;
import lombok.Data;

import java.util.List;

@Data
public class SearchBookResponse {
    private List<Book> bookList;
}
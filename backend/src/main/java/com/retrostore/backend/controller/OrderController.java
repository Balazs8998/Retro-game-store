package com.retrostore.backend.controller;

import com.retrostore.backend.dto.request.PurchaseRequest;
import com.retrostore.backend.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

private final OrderService orderService;


    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Void> purchase(@Valid @RequestBody PurchaseRequest request){
        orderService.purchase(request);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

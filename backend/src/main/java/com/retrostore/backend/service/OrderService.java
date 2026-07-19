package com.retrostore.backend.service;

import com.retrostore.backend.domain.entity.Game;
import com.retrostore.backend.domain.entity.Order;
import com.retrostore.backend.domain.entity.OrderItem;
import com.retrostore.backend.domain.enums.OrderStatus;
import com.retrostore.backend.dto.request.PurchaseItemRequest;
import com.retrostore.backend.dto.request.PurchaseRequest;
import com.retrostore.backend.repository.GameRepository;
import com.retrostore.backend.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final GameRepository gameRepository;

    public OrderService(OrderRepository orderRepository, GameRepository gameRepository) {
        this.orderRepository = orderRepository;

        this.gameRepository = gameRepository;
    }

    public void cancelOrder(Long orderId) {
        Order order = findOrder(orderId);

        if (order.getStatus() != OrderStatus.CREATED) {
            throw new IllegalStateException("Only created orders can be cancelled");
        }
        order.setStatus(OrderStatus.CANCELLED);
        order.setUpdatedAt(LocalDateTime.now());

        List<OrderItem> items = order.getItems();
        for (OrderItem item : items) {
            restoreStock(item);
        }
    }


    private Order findOrder(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(() ->
                new EntityNotFoundException("Order with this id: " + orderId + " not found"));
    }

    private void restoreStock(OrderItem item) {
        Game game = item.getGame();
        int quantity = item.getQuantity();
        int stockQuantity = game.getStockQuantity();

        game.setStockQuantity(stockQuantity + quantity);
        gameRepository.save(game);
    }


    public void purchase(PurchaseRequest request) {

        Order newOrder = createNewOrder();
        List<OrderItem> orderItems = new ArrayList<>();

        for (PurchaseItemRequest item : request.items()) {
            int orderedQuantity = item.quantity();

            Game game = findAndValidateGame(item.gameId(), orderedQuantity);
            OrderItem orderItem = createOrderItem(orderedQuantity, newOrder, game);

            orderItems.add(orderItem);

            decreaseStockQuantity(orderedQuantity, game);
            updateTotalPrice(game.getPrice(), orderedQuantity, newOrder);
        }
        newOrder.setItems(orderItems);

        orderRepository.save(newOrder);
    }

    private Order createNewOrder() {
        Order newOrder = new Order();
        newOrder.setCreatedAt(LocalDateTime.now());
        newOrder.setStatus(OrderStatus.CREATED);
        newOrder.setTotalPrice(BigDecimal.ZERO);
        return newOrder;
    }

    private Game findAndValidateGame(Long gameId, int orderedQuantity) {
        Game game = this.gameRepository.findById(gameId).orElseThrow(() ->
                new EntityNotFoundException("Game with id: " + gameId + " not found"));

        int stockQuantity = game.getStockQuantity();

        if (stockQuantity < orderedQuantity) {
            throw new IllegalStateException(
                    "Not enough stock for game: " + game.getTitle());
        }
        return game;
    }

    private OrderItem createOrderItem(int quantity, Order newOrder, Game game) {
        OrderItem orderItem = new OrderItem();
        orderItem.setQuantity(quantity);
        orderItem.setUnitPrice(game.getPrice());
        orderItem.setOrder(newOrder);
        orderItem.setGame(game);
        return orderItem;
    }

    private void decreaseStockQuantity(int orderedQuantity, Game game) {
        int stockQuantity = game.getStockQuantity();

        game.setStockQuantity(stockQuantity - orderedQuantity);
    }

    private void updateTotalPrice(BigDecimal price, int quantity, Order newOrder) {
        BigDecimal calculatedPrice =
                price.multiply(BigDecimal.valueOf(quantity));

        newOrder.setTotalPrice(
                newOrder.getTotalPrice().add(calculatedPrice)
        );
    }


}

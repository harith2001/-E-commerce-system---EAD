package com.example.markethub.screens.cart

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.markethub.LocalNavController
import com.example.markethub.R
import com.example.markethub.screens.PreviewWrapper
import com.example.markethub.ui.theme.Primary

data class CartItem(
    val id: Int,
    val name: String,
    val imageRes: Int,
    var quantity: Int,
    val price: Double
)

@Composable
fun CartScreen(
    cartItems: List<CartItem> = sampleCartItems(),
) {
    var cartItemsState by remember { mutableStateOf(cartItems) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(16.dp)
    ) {
        val navController = LocalNavController.current
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Start
        ) {
            IconButton(onClick = { navController.popBackStack() }) {
                Icon(imageVector = Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = Primary)
            }
            Text(text = "Your Cart", fontWeight = FontWeight.Bold, fontSize = 20.sp, modifier = Modifier.padding(start = 8.dp))
        }

        Spacer(modifier = Modifier.height(16.dp))

        LazyColumn(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            items(cartItemsState.size) { index ->
                CartItemCard(
                    cartItem = cartItemsState[index],
                    onQuantityChange = { newQuantity ->
                        cartItemsState = cartItemsState.toMutableList().apply {
                            this[index] = this[index].copy(quantity = newQuantity)
                        }
                    },
                    onRemoveItem = {
                        cartItemsState = cartItemsState.toMutableList().apply { removeAt(index) }
                    }
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        val totalPrice = cartItemsState.sumOf { it.price * it.quantity }
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(text = "Total", fontSize = 16.sp, color = Color.Gray)
                Text(
                    text = "$${"%.2f".format(totalPrice)}",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = Primary
                )
            }
            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(containerColor = Primary),
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .height(50.dp)
                    .width(150.dp)
            ) {
                Text(text = "Checkout", fontSize = 16.sp, color = Color.White)
            }
        }
    }
}

@Composable
fun sampleCartItems(): List<CartItem> {
    return listOf(
        CartItem(id = 1, name = "Essentials Men's Short-Sleeve T-Shirt", imageRes = R.drawable.ic_placeholder, quantity = 1, price = 18.0),
        CartItem(id = 2, name = "Comfort Fit Denim Jeans", imageRes = R.drawable.ic_placeholder, quantity = 2, price = 25.0)
    )
}

@Preview
@Composable
fun CartScreenPreview() {
    PreviewWrapper {
        CartScreen()
    }
}

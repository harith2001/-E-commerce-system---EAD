package com.example.markethub.screens.product

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Shop
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.compose.rememberNavController
import com.example.markethub.LocalNavController
import com.example.markethub.R
import com.example.markethub.screens.PreviewWrapper

@Composable
fun ProductDetailScreen() {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(bottom = 70.dp)
        ) {
            // Header Section
            ProductDetailsHeaderSection()

            // Image Section
            ImageSection()

            // Product Details Section
            ProductDetailsSection(
                vendorName = "Temptu",
                productName = "All in One Makeup Kit",
                rating = "4.5",
                reviews = "1.5k",
                sold = "1.2k",
                inStock = true,
                description = "The TEMPTU Air and Airpod Pro Kit is the perfect kit for any makeup artist or enthusiast. The TEMPTU Air is the first cordless airbrush makeup device for instant, effortless skin perfection. The TEMPTU Airpod Pro is a reusable and disposable single action, top-feed, patented airbrush cartridge that gives artists the power to mix and customize makeup without the need to break down and clean an airbrush gun ever again."
            )
        }

        BottomPriceSection(
            price = "$18.00",
            onAddToCartClick = { /* Handle Add to Cart */ },
            modifier = Modifier.align(Alignment.BottomCenter)
        )
    }
}

@Preview
@Composable
fun ProductDetailScreenPreview() {
    PreviewWrapper {
        ProductDetailScreen()
    }
}

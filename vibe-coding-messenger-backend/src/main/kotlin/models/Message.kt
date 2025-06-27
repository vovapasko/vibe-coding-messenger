package com.example.com.models

import kotlinx.serialization.Serializable

@Serializable
data class Message(val content: String, val user: String, val timestamp: Long)
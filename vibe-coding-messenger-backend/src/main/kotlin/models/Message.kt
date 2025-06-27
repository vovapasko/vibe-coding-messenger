package com.example.com.models

import kotlinx.serialization.Serializable

@Serializable
data class Message(val text: String, val user: String)
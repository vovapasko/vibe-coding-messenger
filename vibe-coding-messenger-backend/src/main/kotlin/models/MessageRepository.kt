package com.example.com.models

object MessageRepository {
    private val messages = mutableListOf<Message>()

    fun addMessage(message: Message) {
        messages.add(message)
    }

    fun getAllMessages(): List<Message> {
        return messages
    }

}
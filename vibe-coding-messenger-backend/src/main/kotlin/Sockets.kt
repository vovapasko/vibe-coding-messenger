package com.example.com

import com.example.com.models.Message
import com.example.com.models.MessageRepository
import io.ktor.serialization.kotlinx.KotlinxWebsocketSerializationConverter
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import kotlinx.coroutines.delay
import kotlinx.serialization.json.Json
import java.util.Collections
import kotlin.time.Duration.Companion.seconds


fun Application.configureSockets() {
    install(WebSockets) {
        contentConverter = KotlinxWebsocketSerializationConverter(Json)
        pingPeriod = 15.seconds
        timeout = 15.seconds
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }
    routing {
        val sessions = Collections.synchronizedList(arrayListOf<WebSocketServerSession>())

        webSocket("/chat") { // websocketSession
            sessions.add(this)
            sendAllMessages()

            while (true) {
                val newMessage = receiveDeserialized<Message>()
                MessageRepository.addMessage(newMessage)
                for (session in sessions) {
                    session.sendSerialized(newMessage)
                }
            }
        }
    }
}

private suspend fun DefaultWebSocketServerSession.sendAllMessages() {
    for (message in MessageRepository.getAllMessages()) {
        sendSerialized(message)
        delay(1000)
    }
}
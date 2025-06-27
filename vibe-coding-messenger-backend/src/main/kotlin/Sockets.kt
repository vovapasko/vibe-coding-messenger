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
        contentConverter = KotlinxWebsocketSerializationConverter(Json{ ignoreUnknownKeys = true})
        pingPeriod = 15.seconds
        timeout = 15.seconds
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }
    routing {
        val sessions = Collections.synchronizedList(arrayListOf<WebSocketServerSession>())

        webSocket("/chat") { // websocketSession
            sessions.add(this)
            try {
                sendAllMessages()
                while (true) {
                    val newMessage = receiveDeserialized<Message>()
                    MessageRepository.addMessage(newMessage)
                    // Send the message to all open sessions
                    val it = sessions.iterator()
                    while (it.hasNext()) {
                        val session = it.next()
                        try {
                            session.sendSerialized(newMessage)
                        } catch (e: Exception) {
                            println(e.printStackTrace())
                            it.remove()
                        }
                    }
                }
            } catch (e: Exception) {
                // handle/log if needed
                println(e.printStackTrace())
            } finally {
                // Ensure removal of the session when done
                sessions.remove(this)
            }

        }
    }
}

private suspend fun DefaultWebSocketServerSession.sendAllMessages() {
    for (message in MessageRepository.getAllMessages()) {
        sendSerialized(message)
    }
}
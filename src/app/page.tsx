"use client"

import { useChat } from "ai/react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ChatBox() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await handleSubmit(e)
    setIsLoading(false)
  }

  useEffect(() => {
console.log("messages", messages)

  },[messages]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Chat Bot</h1>
          <div className="space-y-4 mb-4 h-[400px] overflow-y-auto">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-2 rounded-lg ${m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about the ..."
              className="flex-grow"
            />
            <Button variant='default' type="submit" disabled={isLoading} className="bg-blue-500 text-white">
              {isLoading ? "Thinking..." : "Send"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

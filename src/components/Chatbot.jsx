import React, { useState, useRef, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { MessageSquare, X, Send, Bot, Loader } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
    import { useToast } from '@/components/ui/use-toast';

    const Chatbot = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [messages, setMessages] = useState([]);
      const [input, setInput] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const { toast } = useToast();
      const messagesEndRef = useRef(null);

      const edgarAvatar = "https://horizons-cdn.hostinger.com/674a6674-41a2-46a4-b258-bcdcbf54612b/6e34a7e5bd1a5f9087291ce75ded0713.png";

      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

      const toggleChat = () => {
        setIsOpen((prev) => !prev);
      };

      const handleSend = () => {
        if (input.trim() === '') return;

        const newMessages = [...messages, { id: Date.now(), text: input, sender: 'user' }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        setTimeout(() => {
          setIsLoading(false);
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: "Désolé, je suis encore en formation et je ne peux pas encore répondre. Veuillez contacter notre support pour plus d'informations.",
            sender: 'bot'
          }]);
          toast({
              title: "🚧 Edgar est en formation !",
              description: "Cette fonctionnalité de réponse n'est pas encore implémentée. Demandez-la dans votre prochain projet 😉",
          });
        }, 1500);
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim() !== '') {
          handleSend();
        }
      };

      const quickReplies = [
        "Qu'est-ce que l'ACC ?",
        "Comment rejoindre un projet ?",
        "Quels sont vos projets ?",
        "Comment est calculée ma facture ?"
      ];

      useEffect(scrollToBottom, [messages]);
      
      useEffect(() => {
        if (isOpen) {
            setMessages([
                {
                    id: 1,
                    text: "Bonjour ! Je suis Edgar 🤖. Comment puis-je vous aider aujourd'hui ?",
                    sender: 'bot'
                }
            ]);
        }
      }, [isOpen]);

      return (
        <>
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              size="lg"
              className="rounded-full h-14 w-14 shadow-lg"
              onClick={toggleChat}
              aria-label={isOpen ? "Fermer le chatbot" : "Ouvrir le chatbot"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
            </Button>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="chat-window"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl border"
              >
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={edgarAvatar} alt="Edgar, assistant" />
                      <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <div className="font-medium">Edgar</div>
                      <div className="text-xs text-muted-foreground">Assistant Ma part de soleil</div>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={toggleChat} aria-label="Fermer">
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="p-3 space-y-3 max-h-[50vh] overflow-y-auto">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                        <div className="px-3 py-2 rounded-lg bg-muted text-foreground">
                            <Loader className="h-5 w-5 animate-spin" />
                        </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="px-3 pb-2 flex flex-wrap gap-2">
                  {quickReplies.map((q) => (
                    <Button
                      key={q}
                      variant="secondary"
                      size="sm"
                      onClick={() => setInput(q)}
                      className="rounded-full"
                    >
                      {q}
                    </Button>
                  ))}
                </div>

                <footer className="border-t p-3">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Écrivez votre message…"
                      className="flex-1"
                    />
                    <Button onClick={handleSend} size="icon" disabled={!input.trim() || isLoading}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </footer>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      );
    };

    export default Chatbot;
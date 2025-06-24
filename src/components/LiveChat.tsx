
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
  profiles: {
    full_name: string | null;
    role: string;
  };
}

interface LiveChatProps {
  auctionId: string;
}

const LiveChat: React.FC<LiveChatProps> = ({ auctionId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    fetchMessages();
    subscribeToMessages();
  }, [auctionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setCurrentUser(profile);
    }
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        profiles (
          full_name,
          role
        )
      `)
      .eq('auction_id', auctionId)
      .order('created_at', { ascending: true })
      .limit(50);

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    setMessages(data || []);
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `auction_id=eq.${auctionId}`
        },
        async (payload) => {
          // Fetch the new message with profile data
          const { data } = await supabase
            .from('chat_messages')
            .select(`
              *,
              profiles (
                full_name,
                role
              )
            `)
            .eq('id', payload.new.id)
            .single();

          if (data) {
            setMessages(prev => [...prev, data]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !currentUser) {
      toast({
        title: "Error",
        description: "Please log in to send messages",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase
      .from('chat_messages')
      .insert({
        auction_id: auctionId,
        user_id: currentUser.id,
        message: newMessage.trim()
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } else {
      setNewMessage('');
    }

    setIsLoading(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'seller': return 'bg-blue-500';
      case 'administrator': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <MessageCircle className="h-5 w-5 mr-2" />
        Live Chat
        <Badge variant="outline" className="ml-2">
          {messages.length} messages
        </Badge>
      </h3>

      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto border rounded p-3 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="text-sm">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold text-primary">
                    {message.profiles?.full_name || 'Anonymous'}
                  </span>
                  {message.profiles?.role !== 'buyer' && (
                    <Badge 
                      className={`text-xs ${getRoleBadgeColor(message.profiles?.role)} text-white`}
                    >
                      {message.profiles?.role}
                    </Badge>
                  )}
                </div>
                <span className="text-gray-400 text-xs">
                  {formatTime(message.created_at)}
                </span>
              </div>
              <p className="text-gray-700 ml-6">{message.message}</p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex space-x-2">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
          disabled={!currentUser || isLoading}
        />
        <Button 
          type="submit" 
          size="sm" 
          disabled={!newMessage.trim() || !currentUser || isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>

      {!currentUser && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Please log in to participate in the chat
        </p>
      )}
    </div>
  );
};

export default LiveChat;

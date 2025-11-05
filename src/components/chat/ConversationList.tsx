import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Conversation {
  id: string;
  nutritionist_id: string;
  client_id: string;
  last_message_at: string | null;
  updated_at: string;
}

interface Profile {
  id: string;
  full_name: string | null;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  currentUserId: string;
}

const ConversationList = ({ 
  conversations, 
  selectedId, 
  onSelect, 
  currentUserId
}: ConversationListProps) => {
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchProfiles = async () => {
      const userIds = new Set<string>();
      conversations.forEach(conv => {
        userIds.add(conv.nutritionist_id);
        userIds.add(conv.client_id);
      });

      const { data } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', Array.from(userIds));

      if (data) {
        const profileMap: Record<string, Profile> = {};
        data.forEach(profile => {
          profileMap[profile.id] = profile;
        });
        setProfiles(profileMap);
      }
    };

    const fetchUnreadCounts = async () => {
      const counts: Record<string, number> = {};
      
      for (const conv of conversations) {
        const { count } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .eq('conversation_id', conv.id)
          .eq('is_read', false)
          .neq('sender_id', currentUserId);
        
        counts[conv.id] = count || 0;
      }
      
      setUnreadCounts(counts);
    };

    fetchProfiles();
    fetchUnreadCounts();
  }, [conversations, currentUserId]);

  const getOtherUserId = (conversation: Conversation) => {
    return conversation.nutritionist_id === currentUserId 
      ? conversation.client_id 
      : conversation.nutritionist_id;
  };

  const getOtherUserName = (conversation: Conversation) => {
    const otherUserId = getOtherUserId(conversation);
    return profiles[otherUserId]?.full_name || 'Usuario';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        {conversations.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No hay conversaciones
          </div>
        ) : (
          conversations.map(conversation => {
            const otherUserName = getOtherUserName(conversation);
            const unreadCount = unreadCounts[conversation.id] || 0;
            const isSelected = selectedId === conversation.id;

            return (
              <button
                key={conversation.id}
                onClick={() => onSelect(conversation.id)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  isSelected 
                    ? 'bg-primary/10 border-l-4 border-primary' 
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {getInitials(otherUserName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold truncate">{otherUserName}</p>
                      {unreadCount > 0 && (
                        <Badge variant="default" className="ml-2">
                          {unreadCount}
                        </Badge>
                      )}
                    </div>
                    {conversation.last_message_at && (
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(conversation.last_message_at), {
                          addSuffix: true,
                          locale: es
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </ScrollArea>
  );
};

export default ConversationList;
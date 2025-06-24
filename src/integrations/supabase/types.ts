export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      auction_items: {
        Row: {
          bid_count: number | null
          buy_now_price: number | null
          category: string
          created_at: string | null
          current_bid: number | null
          description: string | null
          end_time: string | null
          id: string
          images: string[] | null
          reserve_price: number | null
          seller_id: string
          start_time: string | null
          starting_bid: number | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          bid_count?: number | null
          buy_now_price?: number | null
          category: string
          created_at?: string | null
          current_bid?: number | null
          description?: string | null
          end_time?: string | null
          id?: string
          images?: string[] | null
          reserve_price?: number | null
          seller_id: string
          start_time?: string | null
          starting_bid?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          bid_count?: number | null
          buy_now_price?: number | null
          category?: string
          created_at?: string | null
          current_bid?: number | null
          description?: string | null
          end_time?: string | null
          id?: string
          images?: string[] | null
          reserve_price?: number | null
          seller_id?: string
          start_time?: string | null
          starting_bid?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auction_items_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bids: {
        Row: {
          amount: number
          auction_id: string
          bidder_id: string
          created_at: string | null
          id: string
        }
        Insert: {
          amount: number
          auction_id: string
          bidder_id: string
          created_at?: string | null
          id?: string
        }
        Update: {
          amount?: number
          auction_id?: string
          bidder_id?: string
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bids_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auction_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_bidder_id_fkey"
            columns: ["bidder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          auction_id: string
          created_at: string | null
          id: string
          message: string
          user_id: string
        }
        Insert: {
          auction_id: string
          created_at?: string | null
          id?: string
          message: string
          user_id: string
        }
        Update: {
          auction_id?: string
          created_at?: string | null
          id?: string
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auction_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_payouts: {
        Row: {
          created_at: string
          id: string
          payout_date: string | null
          payout_status: string
          seller_id: string
          total_earnings: number
        }
        Insert: {
          created_at?: string
          id?: string
          payout_date?: string | null
          payout_status?: string
          seller_id: string
          total_earnings: number
        }
        Update: {
          created_at?: string
          id?: string
          payout_date?: string | null
          payout_status?: string
          seller_id?: string
          total_earnings?: number
        }
        Relationships: []
      }
      membership_plans: {
        Row: {
          commission_rate: number
          created_at: string
          description: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          level: number
          monthly_item_limit: number
          name: string
          price: number
        }
        Insert: {
          commission_rate: number
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          level: number
          monthly_item_limit: number
          name: string
          price: number
        }
        Update: {
          commission_rate?: number
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          level?: number
          monthly_item_limit?: number
          name?: string
          price?: number
        }
        Relationships: []
      }
      offers: {
        Row: {
          amount: number
          auction_id: string
          buyer_id: string
          created_at: string | null
          id: string
          message: string | null
          seller_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          auction_id: string
          buyer_id: string
          created_at?: string | null
          id?: string
          message?: string | null
          seller_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          auction_id?: string
          buyer_id?: string
          created_at?: string | null
          id?: string
          message?: string | null
          seller_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offers_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auction_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      sales: {
        Row: {
          buyer_id: string | null
          commission_amount: number
          commission_rate: number
          created_at: string
          id: string
          item_title: string
          payment_status: string
          sale_amount: number
          seller_earnings: number
          seller_id: string
        }
        Insert: {
          buyer_id?: string | null
          commission_amount: number
          commission_rate: number
          created_at?: string
          id?: string
          item_title: string
          payment_status?: string
          sale_amount: number
          seller_earnings: number
          seller_id: string
        }
        Update: {
          buyer_id?: string | null
          commission_amount?: number
          commission_rate?: number
          created_at?: string
          id?: string
          item_title?: string
          payment_status?: string
          sale_amount?: number
          seller_earnings?: number
          seller_id?: string
        }
        Relationships: []
      }
      user_memberships: {
        Row: {
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          items_posted_this_month: number | null
          plan_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          items_posted_this_month?: number | null
          plan_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          items_posted_this_month?: number | null
          plan_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_memberships_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "membership_plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_user_post_item: {
        Args: { user_id: string }
        Returns: boolean
      }
      reset_monthly_item_counts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      user_role: "buyer" | "seller" | "administrator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["buyer", "seller", "administrator"],
    },
  },
} as const

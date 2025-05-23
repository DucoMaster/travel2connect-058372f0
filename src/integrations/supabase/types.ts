export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      event_package_booking: {
        Row: {
          created_at: string;
          event_package_id: string | null;
          id: number;
          user_id: string | null;
          booking_dates?: string | null;
        };
        Insert: {
          created_at?: string;
          event_package_id?: string | null;
          id?: number;
          user_id?: string | null;
          booking_dates?: string | null;
        };
        Update: {
          created_at?: string;
          event_package_id?: string | null;
          id?: number;
          user_id?: string | null;
          booking_dates?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "event_package_booking_event_package_id_fkey";
            columns: ["event_package_id"];
            isOneToOne: false;
            referencedRelation: "event_packages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_package_booking_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      event_package_visitors: {
        Row: {
          created_at: string;
          event_package_id: string | null;
          id: number;
          user_id: string | null;
        
        };
        Insert: {
          created_at?: string;
          event_package_id?: string | null;
          id?: number;
          user_id?: string | null;
          
        };
        Update: {
          created_at?: string;
          event_package_id?: string | null;
          id?: number;
          user_id?: string | null;
         
        };
        Relationships: [
          {
            foreignKeyName: "event_package_visitors_event_package_id_fkey";
            columns: ["event_package_id"];
            isOneToOne: false;
            referencedRelation: "event_packages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_package_visitors_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      event_packages: {
        Row: {
          capacity: number | null;
          category: Database["public"]["Enums"]["package_category"];
          created_at: string;
          creator_id: string | null;
          description: string;
          end_date: string | null;
          id: string;
          image_urls: string[] | null;
          is_open_for_planning: boolean | null;
          location: string;
          price: number;
          start_date: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          capacity?: number | null;
          category: Database["public"]["Enums"]["package_category"];
          created_at?: string;
          creator_id?: string | null;
          description: string;
          end_date?: string | null;
          id?: string;
          image_urls?: string[] | null;
          is_open_for_planning?: boolean | null;
          location: string;
          price: number;
          start_date: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          capacity?: number | null;
          category?: Database["public"]["Enums"]["package_category"];
          created_at?: string;
          creator_id?: string | null;
          description?: string;
          end_date?: string | null;
          id?: string;
          image_urls?: string[] | null;
          is_open_for_planning?: boolean | null;
          location?: string;
          price?: number;
          start_date?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_packages_creator_id_fkey";
            columns: ["creator_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          credits: number;
          description: string | null;
          email: string;
          id: string;
          location: string | null;
          name: string | null;
          profile_image: string | null;
          ranking: number;
          role: string;
          specialties: string[] | null;
        };
        Insert: {
          created_at?: string;
          credits?: number;
          description?: string | null;
          email: string;
          id: string;
          location?: string | null;
          name?: string | null;
          profile_image?: string | null;
          ranking?: number;
          role: string;
          specialties?: string[] | null;
        };
        Update: {
          created_at?: string;
          credits?: number;
          description?: string | null;
          email?: string;
          id?: string;
          location?: string | null;
          name?: string | null;
          profile_image?: string | null;
          ranking?: number;
          role?: string;
          specialties?: string[] | null;
        };
        Relationships: [];
      };
      user_payments: {
        Row: {
          created_at: string;
          credits: number | null;
          id: number;
          payment_intent: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          credits?: number | null;
          id?: number;
          payment_intent?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          credits?: number | null;
          id?: number;
          payment_intent?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_payments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      event_attendance: {
        Row: {
          created_at: string;
          id: number;
          user_id: string | null;
          event_id: string | null;
          event_start_date?: string | null;
          event_end_date?: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          user_id?: string | null;
          event_id?: string | null;
          event_start_date?: string | null;
          event_end_date?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          user_id?: string | null;
          event_id?: string | null;
          event_start_date?: string | null;
          event_end_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "attendance_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "event_packages";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "attendance_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_credits: {
        Args: { user_id: string; credit_increment: number };
        Returns: undefined;
      };
    };
    Enums: {
      package_category:
        | "travel"
        | "clubs"
        | "events"
        | "services"
        | "guide"
        | "rental"
        | "tours";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      package_category: [
        "travel",
        "clubs",
        "events",
        "services",
        "guide",
        "rental",
        "tours",
      ],
    },
  },
} as const;

import { Module } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Module({
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: (): SupabaseClient => {
        return createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_ANON_KEY,
        );
      },
    },
  ],
  exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule {}

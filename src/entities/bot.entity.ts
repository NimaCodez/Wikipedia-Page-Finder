import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bot_analytics' })
export class BotAnalytics {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ default: 0 })
  total_searches: number;
  @Column({ default: 0 })
  searches_today: number;
  @Column({ default: 0 })
  searches_week: number;
  @Column({ default: 0 })
  searches_month: number;
  @Column({ default: 0 })
  searches_year: number;
}

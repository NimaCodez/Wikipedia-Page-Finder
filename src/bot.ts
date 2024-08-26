import { configDotenv } from 'dotenv';
import { join } from 'path';
import { Telegraf } from 'telegraf';
import { searchWiki } from './modules/search-wiki';
import { AppDataSource } from './config/typeorm.config';
import { User } from './entities/user.entity';
import { connectToDb } from './config/connect-to-db.config';
import { BotAnalytics } from './entities/bot.entity';
configDotenv({ path: join(process.cwd(), '.env') });

const bot = new Telegraf(process.env.BOT_TOKEN);
connectToDb();

bot.command(/start|help/, async ctx => {
  const userRepository = AppDataSource.getRepository(User);
  let user = await userRepository.findOneBy({ user_id: ctx.from.id });
  if (!user) {
    user = userRepository.create({
      user_id: ctx.from.id,
      first_name: ctx.from.first_name || '',
      last_name: ctx.from.last_name || '',
      username: ctx.from.username || '',
    });

    await userRepository.save(user);
  }

  return await ctx.telegram.sendMessage(
    ctx.chat.id,
    "Hello, I'm Wikipedia Page Finder. I'm here to help you send the link you want faster without leaving Telegram. Query a topic in inline mode and I'll send you the link.",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Search', switch_inline_query_current_chat: '' }],
        ],
      },
    },
  );
});

bot.on('message', async ctx => {
  // TODO: handle searching via message
  return await ctx.telegram.sendMessage(
    ctx.chat.id,
    "Hello, I'm Wikipedia Page Finder. I'm here to help you send the link you want faster without leaving Telegram. Query a topic in inline mode and I'll send you the link.",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Search', switch_inline_query_current_chat: '' }],
        ],
      },
    },
  );
});

bot.on('inline_query', async ctx => {
  let query = ctx.inlineQuery.query;
  if (!query) return;
  const results = await searchWiki(query);
  await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, results);
});

bot.catch((err, ctx) => {
  console.log(err);
});

bot.launch(() => {
  console.log('Running');
});

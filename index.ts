 async function getGif(ctx: CommandContext, reaction: string) {
    const res = await ctx.fetch(`https://api.otakugifs.xyz/gif?reaction=${reaction}&format=gif`);
    return (await res.json()) as { url: string };
  } 
  
  async function sendInteraction(
    ctx: CommandContext,
    reaction: string,
    action: string,
    sender: UserRef,
    target: UserRef,
  ) {
    const gif = await getGif(ctx, reaction);
    await ctx.replyImage(gif.url, `${sender} ${action} ${target}`);
  }

  async function printBaseError(ctx: CommandContext) {
    await ctx.replyPrivately(`Usage: ${ctx.command} [user]`)
  }

  async function getTarget(ctx: CommandContext) {
    const target = ctx.args[0];
    if (!target) {
      await printBaseError(ctx);
      return undefined;
    } else return target;
  }
  
  export default {
    commands: {
      kiss: {
        description: "kiss someone",
        usage: "[user]",
        async run(ctx: CommandContext) {
          const target = await getTarget(ctx);
          if (!target) return;
          await sendInteraction(ctx, "kiss", "kisses", ctx.sender, target);
        },
      },
      hug: {
        description: "hug someone",
        usage: "[user]",
        async run(ctx: CommandContext) {
          const target = await getTarget(ctx);
          if (!target) return;
          await sendInteraction(ctx, "hug", "hugs", ctx.sender, target);
        }
      },
      bite: {
        description: "bite someone",
        usage: "[user]",
        async run(ctx: CommandContext) {
          const target = await getTarget(ctx);
          if (!target) return;
          await sendInteraction(ctx, "bite", "bites", ctx.sender, target);
        }
      },
      lick: {
        description: "lick someone",
        usage: "[user]",
        async run(ctx: CommandContext) {
          const target = await getTarget(ctx);
          if (!target) return;
          await sendInteraction(ctx, "lick", "licks", ctx.sender, target);
        }
      }
    },
  } satisfies Plugin;

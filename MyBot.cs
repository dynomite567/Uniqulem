using Discord;
using Discord.Commands;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Uniqulem
{
    class MyBot
    {
        DiscordClient discord;
        CommandService commands;

        Random random;

        string[] freshestmemes;
        string[] cutecats;
        string[] sweatydogs;
        string[] luckynumber;

        public MyBot()
        {
            random = new Random();

            sweatydogs = new string[]
            {
                "http://random.dog/24141-29115-27188.jpg",
                "http://random.dog/24178-5036-5513.jpg",
                "http://random.dog/32755-8324-28824.jpg",
                "http://random.dog/24578-1733-14537.jpg",
                "http://random.dog/16363-19653-13623.jpg",
                "http://random.dog/6843-7121-9258.jpg",
                "http://random.dog/19059-18910-199.jpg",
                "http://random.dog/1186-4923-20498.jpg",
                "http://random.dog/21149-31365-11062.jpg",
                "http://random.dog/15038-13875-14202.jpg",
                "http://random.dog/9826-9348-20028.jpg",
                "http://random.dog/32367-2062-4347.jpg",
                "http://random.dog/8536-28743-5665.jpg",
                "http://random.dog/21060-3302-20249.jpg",
            };

            cutecats = new string[]
            {
                "http://random.cat/i/87jfa.jpg",
                "http://random.cat/i/Jbw9v.gif",
                "http://random.cat/i/042_-_XJdYp3s.gif",
                "http://random.cat/i/dozTO.jpg",
                "http://random.cat/i/Z2nRg.jpg",
                "http://random.cat/i/img_8262.jpg",
                "http://random.cat/i/nNf0M.jpg",
                "http://random.cat/i/018_-_H2Qxvnc.gif",
                "http://random.cat/i/WxvnA.jpg",
                "http://random.cat/i/image1b.jpg",
                "http://random.cat/i/081_-_DWzDbUH.gif",
                "http://random.cat/i/bQi00.gif",
                "http://random.cat/i/U2Bp9.jpg",
                "http://random.cat/i/QXK5u.jpg",
            };

            freshestmemes = new string[]
            {
            "https://www.funnypica.com/wp-content/uploads/2015/05/Funny-Memes-23-570x641.jpg",
            "https://img.memesuper.com/e8e5636f28b576d3c3012a93196af1bc_-funny-fun-lol-random-memes-that-was-random-memes_550-403.png",
            "http://funnymeme.com/wp-content/uploads/2011/12/tumblr_lnb1yphx5C1qg3viio1_500.jpg",
            "http://cdn.acidcow.com/pics/20130117/appreciate_these_memes_27.jpg",
            "http://www.baconwrappedmedia.com/wp-content/uploads/2012/01/135178426285056350_QmHOypAC_c.jpg",
            "https://www.funnypica.com/wp-content/uploads/2015/05/Funny-Memes-3.jpg",
            "http://images.memes.com/meme/974346",
            "http://images.memes.com/meme/3191.jpg",
            "https://cdn.meme.am/cache/instances/folder672/500x/13649672.jpg",
            "http://images.memes.com/meme/2993.jpg",
            "http://images.memes.com/meme/2862.jpg",
            "http://images.memes.com/meme/4010.jpg",
            "https://scontent.cdninstagram.com/t51.2885-15/e35/16906916_1873862459525933_7123989540078878720_n.jpg",
            "https://scontent.cdninstagram.com/t51.2885-15/s1080x1080/e35/16789865_364267220633276_5225668837684281344_n.jpg",
            "https://scontent.cdninstagram.com/t51.2885-15/s1080x1080/e35/16908452_1872123676364727_4129485079418241024_n.jpg",
            "https://scontent.cdninstagram.com/t51.2885-15/s1080x1080/e35/16908325_653759214835334_1532041252827037696_n.jpg",
            "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/16789274_1894899914125201_1793383273984950272_n.jpg",
            };

            luckynumber = new string[]
            {
                "**1**",
                "**2**",
                "**3**",
                "**4**",
                "**5**",
                "**6**",
                "**7**",
                "**8**",
                "**9**",
                "**10**",
                "**11**",
                "**12**",
                "**13**",
                "**14**",
                "**15**",
                "**16**",
                "**17**",
                "**18**",
                "**19**",
                "**20**",
                "**21**",
                "**22**",
                "**23**",
                "**24**",
                "**25**",
                "**26**",
                "**27**",
                "**28**",
                "**29**",
                "**30**",
                "**31**",
                "**32**",
                "**33**",
                "**34**",
                "**35**",
                "**36**",
                "**37**",
                "**38**",
                "**39**",
                "**40**",
                "**41**",
                "**42**",
                "**43**",
                "**44**",
                "**45**",
                "**46**",
                "**47**",
                "**48**",
                "**49**",
                "**50**",
            };

            discord = new DiscordClient(input =>
            {
                input.LogLevel = LogSeverity.Info;
                input.LogHandler = Log;
            });

            discord.UsingCommands(x =>
            {
                x.PrefixChar = '.';
                x.AllowMentionPrefix = true;
            });

            commands = discord.GetService<CommandService>();

            RegisterMemeCommand();
            RegisterHelloCommand();
            RegisterInfoCommand();
            RegisterCatCommand();
            RegisterDogCommand();
            RegisterRollCommand();
            RegisterHelpCommand();
            RegisterPurgeCommand();

            discord.UserJoined += async (s, e) =>
            {
                var channel = e.Server.FindChannels("general").FirstOrDefault();
                var user = e.User;

                await channel.SendMessage(string.Format("{0} has joined the server! Welcome!", user.Name));
            };

            discord.UserLeft += async (s, e) =>
            {
                var channel = e.Server.FindChannels("general").FirstOrDefault();
                var user = e.User;

                await channel.SendMessage(string.Format("{0} has left the server! Godbye we will miss you! :smile:", user.Name));
            };


            discord.ExecuteAndWait(async () =>
            {
                await discord.Connect("INSERT TOKEN HERE", TokenType.Bot);
            });
        }

        private void RegisterMemeCommand()
        {
            commands.CreateCommand("meme")
                    .Do(async (e) =>
                    {
                        int randomMemeIndex = random.Next(freshestmemes.Length);
                        string memetopost = freshestmemes[randomMemeIndex];
                        await e.Channel.SendMessage("Here is your glorious meme!");
                        await e.Channel.SendMessage(memetopost);

                    });
        }

        private void RegisterDogCommand()
        {
            commands.CreateCommand("dog")
                    .Do(async (e) =>
                    {
                        int randomDogIndex = random.Next(sweatydogs.Length);
                        string adopteddog = sweatydogs[randomDogIndex];
                        await e.Channel.SendMessage("Here is your dog! It came with love! :heart:");
                        await e.Channel.SendMessage(adopteddog);

                    });
        }

        private void RegisterRollCommand()
        {
            commands.CreateCommand("roll")
                    .Do(async (e) =>
                    {
                        int randomRollIndex = random.Next(luckynumber.Length);
                        string number = luckynumber[randomRollIndex];
                        await e.Channel.SendMessage("Your number is:");
                        await e.Channel.SendMessage(number);

                    });
        }

        private void RegisterCatCommand()
        {
            commands.CreateCommand("cat")
                    .Do(async (e) =>
                    {
                        int randomCatIndex = random.Next(cutecats.Length);
                        string givencat = cutecats[randomCatIndex];
                        await e.Channel.SendMessage("Here is your cat! It came with love! :heart:");
                        await e.Channel.SendMessage(givencat);

                    });
        }

        private void RegisterPurgeCommand()
        {
            commands.CreateCommand("clear")
                    .Do(async (e) =>
                    {
                        Message[] messagestodelete;
                        messagestodelete = await e.Channel.DownloadMessages(100);

                        await e.Channel.DeleteMessages(messagestodelete);

                        await e.Channel.SendMessage("This is currently under development and can only erase 100 messages everytime. You will be able to put the number of messages you want gone in the near future");
                    });
        }

        private void RegisterHelloCommand()
        {
            commands.CreateCommand("hello")
                    .Do(async (e) =>
                    {
                        await e.Channel.SendMessage("Hello! I am a bot! *Beep Boop!* To find out more about me use .info!");

                    });
        }

        private void RegisterInfoCommand()
        {
            commands.CreateCommand("info")
                    .Do(async (e) =>
                    {
                        await e.Channel.SendMessage("I was made by @DynomiteCentral#4808 by hand to serve this and many more servers!");
                        await e.Channel.SendMessage("If you want a changelog, help devolop the bot, or even add the bot to your server, come to the official github site here: https://dynomite567.github.io/Uniqulem/");
                        await e.Channel.SendMessage("```Current Version: v1.0.2" +
                                                    "```");
                    });
        }

        private void RegisterHelpCommand()
        {
            commands.CreateCommand("help")
                    .Do(async (e) =>
                    {
                        await e.Channel.SendMessage("Commands:");
                        await e.Channel.SendMessage(".info .hello .dog .meme .cat .roll .clear .help");

                    });
        }

        private void Log(object sender, LogMessageEventArgs e)
        {
            Console.WriteLine(e.Message);
        }
    }
}

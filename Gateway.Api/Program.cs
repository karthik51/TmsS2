using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Provider.Consul;
using Ocelot.Provider.Polly;
using System;
using System.IO;

namespace TMS.Gateway
{
    public class Program
    {
        static string environment;
        static bool isProductionEnvironment;

        public static void Main(string[] args)
        {
            environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            isProductionEnvironment = environment == EnvironmentName.Production;

            CreateWebHostBuilder(args)
                .UseKestrel()
               .UseContentRoot(Directory.GetCurrentDirectory())
               .ConfigureAppConfiguration((hostingContext, config) =>
               {
                   config
                       .SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
                       .AddJsonFile("appsettings.json", true, true)
                       .AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true, true)
                       .AddJsonFile("ocelot.json", true, true)
                       .AddJsonFile($"ocelot.{hostingContext.HostingEnvironment.EnvironmentName}.json", true, true)
                       .AddEnvironmentVariables();
               })
               .ConfigureServices(s =>
               {
                   if (isProductionEnvironment)
                   {
                       s.AddOcelot().AddPolly().AddConsul().AddConfigStoredInConsul();
                   }
                   else
                   {
                       s.AddOcelot().AddPolly().AddConsul();
                   }
               })
               .ConfigureLogging((hostingContext, logging) =>
               {
                   //add your logging
               })
               .UseIIS()
               .Configure(app =>
               {
                   app.UseOcelot().Wait();
               })
               .Build()
               .Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}

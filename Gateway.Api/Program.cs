﻿using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
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
            new WebHostBuilder()
               .UseKestrel()
               .UseContentRoot(Directory.GetCurrentDirectory())
               .ConfigureAppConfiguration((hostingContext, config) =>
               {
                   config
                       .SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
                       .AddJsonFile("appsettings.json", true, true)
                       .AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true, true)
                       .AddJsonFile("ocelot.json")
                       .AddEnvironmentVariables();
               })
               .ConfigureServices(s => {
                   s.AddOcelot();
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
    }
}

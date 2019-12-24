#region snippet_UsingUsersApiModels
using Trip.Api.Helpers;
using Trip.Api.Models;
#endregion
#region using
using Trip.Api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;
using System.Collections.Generic;
#endregion

namespace Trip.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        #region snippet_ConfigureServices
        public void ConfigureServices(IServiceCollection services)
        {
            #region "Cors"
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .SetIsOriginAllowed((host) => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
            #endregion
            
            services.Configure<UserstoreDatabaseSettings>(
                Configuration.GetSection(nameof(UserstoreDatabaseSettings)));

            services.AddSingleton<IUserstoreDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<UserstoreDatabaseSettings>>().Value);

            services.AddSingleton<UserService>();

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            services.AddMvc()
                    .AddJsonOptions(options => options.UseMemberCasing())
                    .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Auth API v1", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = "Add \"Bearer\" before the token",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });
                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    { "Bearer", new string[] { } }
                });
            });
        }
        #endregion

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseSwagger();
            app.UseCors("CorsPolicy");
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Auth Api v1");
            });
            app.UseMvc();
        }
    }
}

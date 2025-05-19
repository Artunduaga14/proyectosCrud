using Microsoft.AspNetCore.Builder;

namespace Web.Extensions
{
    public static class AppExtensions
    {
        public static void RedirectRootToSwagger(this WebApplication app)
        {
            app.Use(async (context, next) =>
            {
                if (context.Request.Path == "/")
                {
                    context.Response.Redirect("/swagger");
                    return;
                }
                await next();
            });
        }
    }
}

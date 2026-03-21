using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=vacations.db"));

 builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
   

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("frontend");
app.UseHttpsRedirection();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();
}

app.MapGet("/api/vacationrequests", async (AppDbContext db) =>
    await db.VacationRequests.ToListAsync());

app.MapPost("/api/vacationrequests", async (VacationRequest request, AppDbContext db) =>
{
    db.VacationRequests.Add(request);
    await db.SaveChangesAsync();
    return Results.Created($"/api/vacationrequests/{request.Id}", request);
});

app.MapGet("/api/vacationrequests/{id}", async (int id, AppDbContext db) =>
{
    var request = await db.VacationRequests.FindAsync(id);
    if (request == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(request);
});


app.MapPost("/api/vacationrequests/{id}/delete", async (int id, AppDbContext db) => 
{
    var request = await db.VacationRequests.FindAsync(id);
    if (request == null)
    {
        return Results.NotFound();
    }
    db.VacationRequests.Remove(request);
    await db.SaveChangesAsync();
    return Results.NoContent();
});


app.MapPost("/api/vacationrequests/{id}/edit", async (int id, VacationRequest updatedRequest, AppDbContext db) =>
{
    var request = await db.VacationRequests.FindAsync(id);
    if (request == null)
    {
        return Results.NotFound();
    }
    request.StartDate = updatedRequest.StartDate;
    request.EndDate = updatedRequest.EndDate;
    request.Comment = updatedRequest.Comment;
    await db.SaveChangesAsync();
    return Results.Ok(request);
});


app.Run();

namespace Backend.Models;

public class VacationRequest
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public string? Comment { get; set; }
}

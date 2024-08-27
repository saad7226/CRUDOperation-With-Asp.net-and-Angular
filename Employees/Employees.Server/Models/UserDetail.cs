using System.ComponentModel.DataAnnotations.Schema;

namespace Employees.Server.Models
{
    public class UserDetail
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Destination { get; set; }

        [NotMapped]
        public string? UserMessage {  get; set; }
        [NotMapped]
        public string? AccessToken {  get; set; }
       
    }
}

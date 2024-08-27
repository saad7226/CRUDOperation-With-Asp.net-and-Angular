namespace Employees.Server.Models
{
    public class PaginationFilter
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public PaginationFilter()
        {
            this.PageNumber = 1;
            this.PageSize = 10;
        }

        public PaginationFilter(int pageNumber, int pageSize)
        {
            if (pageNumber < 1)
            {
                this.PageNumber = 1;

            }
            else
            {
                this.PageNumber = pageNumber;
            }
            if (pageSize < 1 || pageSize > 10)
            {
                this.PageSize = 10;
            }
            else
            {
                this.PageSize = pageSize;
            }

        }
    }
}

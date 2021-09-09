using System;
using System.Collections.Generic;
using System.Text;

using TodoApp.Common.Validation;

namespace TodoApp.Common.Exceptions
{
    public class ValidationException : Exception
    {
        public IEnumerable<ValidationMessage> ValidationMessages { get; set; }

        public ValidationException(IEnumerable<ValidationMessage> messages)
        {
            this.ValidationMessages = messages ?? new List<ValidationMessage>();
        }
    }

}

using System;
using System.Collections.Generic;
using System.Text;

using TodoApp.Common.Enums;

namespace TodoApp.Common.Validation
{
    public class ValidationMessage
    {
        public string Message { get; set; }
        public string PropertyName { get; set; } = "unknown";
        public ValidationMessageType Type { get; set; } = ValidationMessageType.Info;
    }
}

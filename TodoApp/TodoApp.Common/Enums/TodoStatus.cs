using System;
using System.Collections.Generic;
using System.Text;

namespace TodoApp.Common.Enums
{
    public enum TodoStatus : int
    {
        Planning = 0,
        ToDo = 1,
        InProgress = 2,
        Done = 3,
        Blocked = 4,
        WontDo = 4,
    }
}

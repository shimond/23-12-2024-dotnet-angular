namespace CatalogApi.Exceptions
{

    public enum ItemResultExceptionType
    {
        NotFound = 404,
        Conflict = 409
    }


    [Serializable]
    public class ItemResultException : Exception
    {
        public ItemResultExceptionType ExceptionType { get; private set; }
        
        public ItemResultException() { }

        public ItemResultException( ItemResultExceptionType exceptionType) {
            this.ExceptionType = exceptionType;
        }
        
        public ItemResultException(string message) : base(message) { }
        public ItemResultException(string message, Exception inner) : base(message, inner) { }
        protected ItemResultException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
    //public class ItemResultException : Exception
    //{
    //}
}

var person = new Person() { Name = "David", ID = 1, Description = "Achloa" };
Console.WriteLine(person.Name);
Do(person);
Console.WriteLine(person.Name);




void Do(Person p )
{
    // p.Name = "MOSHE";
}




public class Person
{
    public int ID { get; init; }
    public string Name { get; init; }
    public string Description { get; init; }
}


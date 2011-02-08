<Query Kind="Statements" />

"hello world"
	.Where(c => c != ' ')
	.GroupBy(c => c)
	.OrderByDescending(g => g.Count())
	.Select(g => new {Lettre = g.Key, Nombre = g.Count()})
	.Dump();

	
"Portez donc un whisky à ce vieux juge blond qui fume".Split()
	.GroupBy(word => word.Length)
	.OrderByDescending(g => g.Count())
	.Select(g => new {Longueur = g.Key, Nombre = g.Count()})
	.Dump();